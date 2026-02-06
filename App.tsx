import React, { useState, useEffect } from 'react';
import { HeroHeader } from './components/HeroHeader';
import { CameraInput } from './components/CameraInput';
import { AnalysisResult } from './components/AnalysisResult';
import { LoginPage } from './components/LoginPage';
import { BottomNav } from './components/BottomNav';
import { FeedPage } from './components/FeedPage';
import { LeaderboardPage } from './components/LeaderboardPage';
import { ProfilePage } from './components/ProfilePage';
import { ImpactPage } from './components/ImpactPage';
import { AppState, CivicIssueData, UserProfile, ReportSubmission, Coordinates } from './types';
import { analyzeCivicIssue, fileToGenerativePart } from './services/geminiService';
import { StorageService } from './services/storageService';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [activeTab, setActiveTab] = useState<'home' | 'impact' | 'leaderboard' | 'profile'>('home');
  
  // Data
  const [allReports, setAllReports] = useState<ReportSubmission[]>([]);
  const [leaderboardUsers, setLeaderboardUsers] = useState<UserProfile[]>([]);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<CivicIssueData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Location State
  const [locationName, setLocationName] = useState<string>("Locating...");
  const [coordinates, setCoordinates] = useState<Coordinates | undefined>(undefined);
  const [isLocating, setIsLocating] = useState(false);

  // Initialize App
  useEffect(() => {
    // 1. Check for active session
    const session = StorageService.getSession();
    if (session) {
      setUser(session);
    }

    // 2. Load global data
    refreshData();

    // 3. Start Geolocation
    refreshLocation();
  }, []);

  const refreshData = () => {
    const reports = StorageService.getReports();
    setAllReports(reports);
    const users = StorageService.getAllUsers();
    setLeaderboardUsers(users);
  };

  const refreshLocation = () => {
    if ('geolocation' in navigator) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
           const { latitude, longitude } = position.coords;
           setCoordinates({ lat: latitude, lng: longitude });
           
           try {
             const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
             const data = await response.json();
             const area = data.address.suburb || data.address.neighbourhood || data.address.road || "Unknown Area";
             const city = data.address.city || data.address.town || data.address.state_district;
             setLocationName(`${area}, ${city}`);
           } catch (error) {
             console.error("Reverse geocoding failed", error);
             setLocationName(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
           } finally {
             setIsLocating(false);
           }
        },
        (error) => {
          console.error("Loc error", error);
          setLocationName("Location unavailable");
          setIsLocating(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setLocationName("Loc not supported");
    }
  };