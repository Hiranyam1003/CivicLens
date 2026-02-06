import React from 'react';

interface BottomNavProps {
  activeTab: 'home' | 'impact' | 'leaderboard' | 'profile';
  onTabChange: (tab: 'home' | 'impact' | 'leaderboard' | 'profile') => void;
  onCameraClick: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange, onCameraClick }) => {
  return (
    <div className="fixed bottom-6 left-0 w-full px-4 z-40 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <div className="glass rounded-[32px] p-2 flex justify-between items-center shadow-2xl shadow-indigo-900/10 border border-white/40">
          
          {/* Group Left */}
          <div className="flex flex-1 justify-around items-center">
            <button 
              onClick={() => onTabChange('home')}
              className={`flex-1 flex flex-col items-center justify-center h-12 rounded-2xl transition-all duration-300 ${activeTab === 'home' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={activeTab === 'home' ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>

            <button 
              onClick={() => onTabChange('impact')}
              className={`flex-1 flex flex-col items-center justify-center h-12 rounded-2xl transition-all duration-300 ${activeTab === 'impact' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={activeTab === 'impact' ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </button>
          </div>

          {/* Central Camera Button */}
          <div className="relative -top-10 mx-2">
            <button 
              onClick={onCameraClick}
              className="w-16 h-16 bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 rounded-[24px] flex items-center justify-center text-white shadow-xl shadow-indigo-500/40 active:scale-90 transition-all hover:-translate-y-1 border-4 border-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          {/* Group Right */}
          <div className="flex flex-1 justify-around items-center">
            <button 
              onClick={() => onTabChange('leaderboard')}
              className={`flex-1 flex flex-col items-center justify-center h-12 rounded-2xl transition-all duration-300 ${activeTab === 'leaderboard' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={activeTab === 'leaderboard' ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </button>

            <button 
              onClick={() => onTabChange('profile')}
              className={`flex-1 flex flex-col items-center justify-center h-12 rounded-2xl transition-all duration-300 ${activeTab === 'profile' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={activeTab === 'profile' ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};
