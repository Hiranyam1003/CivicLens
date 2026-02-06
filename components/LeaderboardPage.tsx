import React from 'react';
import { UserProfile } from '../types';

interface LeaderboardPageProps {
  users: UserProfile[];
  currentUserEmail: string;
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ users, currentUserEmail }) => {
  // Take top 50 users
  const topUsers = users.slice(0, 50);
  
  if (topUsers.length === 0) return <div className="text-center p-10 text-slate-400">Loading Leaderboard...</div>;

  return (
    <div className="pb-32 animate-fade-in-up">
      <div className="text-center mb-8">
         <h2 className="text-2xl font-black text-slate-800 tracking-tight">Top Heroes</h2>
         <p className="text-slate-500 font-medium text-sm">Community Champions</p>
      </div>
      
      {/* Podium for Top 3 - Safe Rendering */}
      {topUsers.length >= 3 ? (
        <div className="flex justify-center items-end gap-3 mb-10 px-2">
          {/* 2nd Place */}
          <div className="flex flex-col items-center w-1/3">
            <img src={topUsers[1].avatarUrl} className="w-14 h-14 rounded-full border-4 border-slate-200 mb-2 shadow-lg bg-white" alt="2nd" />
            <p className="text-xs font-bold text-slate-700 truncate w-full text-center mb-1">{topUsers[1].name}</p>
            <div className="w-full bg-gradient-to-b from-slate-200 to-slate-300 h-28 rounded-t-[20px] flex flex-col items-center justify-start pt-3 shadow-inner relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-white opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]"></div>
               <span className="text-3xl font-black text-slate-400/50">2</span>
               <span className="text-xs font-bold text-slate-600 mt-auto mb-3">{topUsers[1].stats.points}</span>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center w-1/3 z-10">
            <div className="relative">
               <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl animate-bounce">👑</span>
               <img src={topUsers[0].avatarUrl} className="w-20 h-20 rounded-full border-4 border-yellow-300 mb-2 shadow-xl shadow-yellow-200 bg-white" alt="1st" />
            </div>
            <p className="text-sm font-black text-slate-800 truncate w-full text-center mb-1">{topUsers[0].name}</p>
            <div className="w-full bg-gradient-to-b from-yellow-300 to-yellow-500 h-36 rounded-t-[24px] flex flex-col items-center justify-start pt-4 shadow-xl shadow-yellow-500/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-20 h-20 bg-white blur-[30px] opacity-40"></div>
               <span className="text-4xl font-black text-yellow-700/30">1</span>
               <span className="text-sm font-black text-white mt-auto mb-4">{topUsers[0].stats.points} pts</span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center w-1/3">
            <img src={topUsers[2].avatarUrl} className="w-14 h-14 rounded-full border-4 border-orange-200 mb-2 shadow-lg bg-white" alt="3rd" />
            <p className="text-xs font-bold text-slate-700 truncate w-full text-center mb-1">{topUsers[2].name}</p>
            <div className="w-full bg-gradient-to-b from-orange-200 to-orange-300 h-20 rounded-t-[20px] flex flex-col items-center justify-start pt-3 shadow-inner relative overflow-hidden">
               <span className="text-3xl font-black text-orange-900/10">3</span>
               <span className="text-xs font-bold text-orange-800 mt-auto mb-2">{topUsers[2].stats.points}</span>
            </div>
          </div>
        </div>
      ) : (
        // Fallback for when there are fewer than 3 users
        <div className="mb-8 px-4 text-center">
          <div className="bg-indigo-50 rounded-2xl p-4">
             <p className="text-indigo-600 font-bold">Keep recruiting! We need more heroes to build the podium.</p>
          </div>
        </div>
      )}

      {/* List for rest (or all if < 3) */}
      <div className="glass rounded-[32px] p-2 space-y-1">
        {topUsers.slice(topUsers.length >= 3 ? 3 : 0).map((user, index) => {
          const isMe = user.emailOrPhone === currentUserEmail;
          // Calculate actual rank based on slice offset
          const rank = topUsers.length >= 3 ? index + 4 : index + 1;
          
          return (
            <div key={user.id} className={`flex items-center justify-between p-4 rounded-2xl transition-colors ${isMe ? 'bg-indigo-50 border border-indigo-100' : 'hover:bg-white/50'}`}>
              <div className="flex items-center gap-4">
                <span className={`font-black w-6 text-center text-lg ${rank <= 3 ? 'text-yellow-500' : 'text-slate-400'}`}>
                  {rank}
                </span>
                <img src={user.avatarUrl} className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100" alt={user.name} />
                <div>
                    <p className={`font-bold text-sm ${isMe ? 'text-indigo-700' : 'text-slate-800'}`}>
                      {user.name} {isMe && '(You)'}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{user.stats.rank}</p>
                </div>
              </div>
              <div className="bg-slate-100 px-3 py-1 rounded-full">
                <span className="font-bold text-xs text-slate-600">{user.stats.points} pts</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};