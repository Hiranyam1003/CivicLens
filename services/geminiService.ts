import { GoogleGenAI, Type, Schema } from "@google/genai";
import { CivicIssueData, SeverityLevel } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to convert file to Base64
export const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove data url part (e.g., "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const civicIssueSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    issue_type: {
      type: Type.STRING,
      description: "The category of the civic issue. Return 'Invalid' if no issue is detected.",
    },
    confidence: {
      type: Type.STRING,
      description: "Confidence level of the detection.",
    },
    severity: {
      type: Type.STRING,
      enum: ["low", "medium", "high", "critical"],
      description: "Severity of the issue.",
    },
    description: {
      type: Type.STRING,
      description: "Visual description of the problem.",
    },
    suggested_department: {
      type: Type.STRING,
      description: "Responsible municipal department.",
    },
    complaint_text: {
      type: Type.STRING,
      description: "Formal complaint letter.",
    },
    priority_level: {
      type: Type.STRING,
      enum: ["normal", "urgent"],
      description: "Urgency of the issue.",
    },
  },
  required: ["issue_type", "severity", "description", "suggested_department", "complaint_text", "priority_level"],
};

export const analyzeCivicIssue = async (base64Image: string, userLocation?: string): Promise<CivicIssueData> => {
  try {
    const locationContext = userLocation || "an Indian city";
    
    const prompt = `
      You are an AI civic assistant for Indian cities.
      
      Context: The user is reporting a problem in: ${locationContext}.

      Analyze the uploaded image and detect if it contains a civic issue.

      Possible issues:
      * pothole
      * garbage dump
      * broken streetlight
      * water leakage
      * road damage
      * illegal dumping
      * fallen tree
      * damaged signboard
      
      If the image does not contain a discernible civic issue (e.g., a selfie, a photo of a pet, or blurry non-civic scene), set "issue_type" to "Invalid".

      Return ONLY valid JSON:

      {
      "issue_type": "",
      "confidence": "",
      "severity": "low/medium/high",
      "description": "",
      "suggested_department": "",
      "complaint_text": "",
      "priority_level": "normal/urgent"
      }

      Write complaint_text as a formal complaint addressed to a municipal corporation in India.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: civicIssueSchema,
        temperature: 0.4,
      },
    });

    if (response.text) {
      const rawData = JSON.parse(response.text);
      
      // Helper to capitalize first letter for Enum matching (low -> Low)
      const capitalize = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : 'Medium';
      
      // Map raw Gemini response to domain model
      // Note: We handle the potential lowercase returns from the prompt instructions
      let severityEnum = capitalize(rawData.severity) as SeverityLevel;
      // Fallback if mapping fails or returns something unexpected
      if (!Object.values(SeverityLevel).includes(severityEnum)) {
        severityEnum = SeverityLevel.MEDIUM;
      }

      const isUrgent = rawData.priority_level === 'urgent' || rawData.severity === 'high' || rawData.severity === 'critical';

      return {
        issueType: rawData.issue_type,
        severity: severityEnum,
        department: rawData.suggested_department,
        description: rawData.description,
        complaintTitle: `Civic Complaint: ${rawData.issue_type}`,
        complaintBody: rawData.complaint_text,
        estimatedResolutionDays: isUrgent ? 2 : 7,
      };
    } else {
      throw new Error("No response text received from Gemini.");
    }
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};