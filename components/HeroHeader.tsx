import React from 'react';
import { UserStats, UserProfile } from '../types';

interface HeroHeaderProps {
  stats: UserStats;
  user: UserProfile;
  onLogout: () => void;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({ stats, user, onLogout }) => {
  return (
    <header className="sticky top-0 z-50 pt-4 px-4 pb-2">
      <div className="glass rounded-full px-4 py-3 flex justify-between items-center shadow-lg shadow-black/5">
        <div className="flex items-center gap-3">
          {/* Brand */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
            CL
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-extrabold text-slate-800 tracking-tight leading-none">CIVIC LENS</h1>
            <p className="text-[10px] font-semibold text-slate-500">Hello, {user.name.split(' ')[0]} 👋</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Points Pill */}
          <div className="flex items-center gap-1.5 bg-slate-900 text-white px-3 py-1.5 rounded-full shadow-md border border-slate-700">
            <span className="text-yellow-400 text-xs">⚡</span>
            <span className="font-bold text-xs font-mono">{stats.points}</span>
          </div>
          
          <button 
            onClick={onLogout}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};