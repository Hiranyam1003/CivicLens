# Civic Lens

**Civic Lens** is an AI-powered platform that enables citizens to report urban issues instantly. By capturing a photo, the app uses the **Gemini API** to analyze the problem, generate a structured report, and route it to the appropriate authorities while maintaining a public feed for community awareness.

---

## Key Features

* **AI Vision Analysis:** Automatically identifies civic issues (potholes, debris, broken infrastructure) from images.
* **Auto-Report Generation:** Gemini generates a formal description and severity assessment.
* **Live Issue Feed:** A real-time dashboard of all reported issues to ensure transparency.
* **Authority Routing:** Logic to suggest or send reports to the relevant local department.

---

## Tech Stack

* **Frontend:** React (TypeScript)
* **Build Tool:** Vite
* **AI Integration:** Google Gemini API
* **State Management:** TypeScript interfaces defined in `types.ts`

---

## Project Structure

- `App.tsx`: Main application logic and UI shell.
- `components/`: Reusable UI elements for the feed and camera interface.
- `services/`: API integration logic, including Gemini prompt handling.
- `types.ts`: TypeScript definitions for Report and Issue objects.
- `vite.config.ts`: Project configuration.

---

## Local Setup

### Prerequisites
* [Node.js](https://nodejs.org/) installed.
* A Gemini API Key from [Google AI Studio](https://aistudio.google.com/).

### Installation
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Hiranyam1003/CivicLens.git](https://github.com/Hiranyam1003/CivicLens.git)
    cd CivicLens
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure API Key:**
    Create a `.env.local` file in the root and add your key:
    ```env
    VITE_GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

---

## Workflow

1.  **Snap:** User captures a photo of a civic grievance.
2.  **Analyze:** The `gemini-1.5-flash` model processes the image to extract details.
3.  **Log:** The issue is saved to the local state/database and displayed in the public feed.
4.  **Report:** A formal report is prepared for submission to municipal authorities.

---

##  Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

---

##  License
Distributed under the MIT License.