import React, { useState } from 'react';
import { UserProfile, Badge, ReportSubmission } from '../types';

interface ProfilePageProps {
  user: UserProfile;
  badges: Badge[];
  myReports: ReportSubmission[];
  onUpdateProfile: (updatedUser: UserProfile) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, badges, myReports, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);

  const handleSave = () => {
    if (!editName.trim()) return;
    
    // Only update name here. Avatar has its own button.
    const updatedUser = {
      ...user,
      name: editName,
    };
    
    onUpdateProfile(updatedUser);
    setIsEditing(false);
  };

  const handleRegenerateAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    const newAvatar = `https://api.dicebear.com/7.x/notionists/svg?seed=${editName}-${randomSeed}&backgroundColor=b6e3f4`;
    const updatedUser = { ...user, avatarUrl: newAvatar };
    onUpdateProfile(updatedUser);
  };

  return (
    <div className="pb-32 animate-fade-in-up">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8 relative">
        <div className="relative mb-4 group">
           <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full blur opacity-50"></div>
           <img 
             src={user.avatarUrl || `https://api.dicebear.com/7.x/notionists/svg?seed=${user.name}`} 
             alt="Profile" 
             className="relative w-28 h-28 rounded-full border-4 border-white shadow-xl bg-white object-cover" 
           />
           {isEditing && (
             <button 
               onClick={handleRegenerateAvatar}
               className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full border-2 border-white shadow-lg hover:bg-indigo-700 active:scale-95 transition-all"
               title="New Avatar"
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
               </svg>
             </button>
           )}
           {!isEditing && (
            <div className="absolute bottom-1 right-1 bg-slate-900 text-yellow-400 p-2 rounded-full border-4 border-slate-50 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            </div>
           )}
        </div>
        
        {isEditing ? (
            <div className="flex flex-col items-center w-full max-w-xs animate-fade-in-up bg-white p-4 rounded-2xl shadow-xl shadow-slate-200 border border-white">
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 w-full text-left">Display Name</label>
                <input 
                    type="text" 
                    value={editName} 
                    onChange={(e) => setEditName(e.target.value)}
                    className="font-bold text-lg border-b-2 border-indigo-100 focus:border-indigo-500 outline-none bg-transparent mb-4 pb-2 text-slate-800 w-full transition-colors"
                    autoFocus
                />
                <div className="flex gap-2 w-full">
                    <button onClick={() => { setIsEditing(false); setEditName(user.name); }} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold text-slate-600 text-xs">Cancel</button>
                    <button onClick={handleSave} className="flex-1 py-3 bg-indigo-600 rounded-xl font-bold text-white text-xs shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors">Save Changes</button>
                </div>
            </div>
        ) : (
            <>
                <div className="flex items-center gap-2">
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">{user.name}</h2>
                    <button onClick={() => setIsEditing(true)} className="p-2 bg-slate-100 rounded-full text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button>
                </div>
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold mt-2 uppercase tracking-wide">{user.stats.rank}</span>
            </>
        )}
      </div>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-2 gap-3 mb-8">
         <div className="bg-white p-5 rounded-[24px] shadow-sm border border-slate-100 flex flex-col items-start justify-between h-32 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-400 rounded-full blur-[40px] opacity-20 -mr-6 -mt-6"></div>
             <span className="text-slate-400 font-bold text-xs uppercase tracking-wider z-10">Total Points</span>
             <span className="text-4xl font-black text-slate-900 z-10">{user.stats.points}</span>
         </div>
         <div className="bg-indigo-600 p-5 rounded-[24px] shadow-lg shadow-indigo-200 flex flex-col items-start justify-between h-32 relative overflow-hidden text-white">
             <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full blur-[40px] opacity-20"></div>
             <span className="text-indigo-200 font-bold text-xs uppercase tracking-wider z-10">Reports</span>
             <span className="text-4xl font-black z-10">{user.stats.reportsSubmitted}</span>
         </div>
      </div>

      {/* Badges */}
      <div className="mb-8">
        <h3 className="text-lg font-black text-slate-800 mb-4 px-2">Achievements</h3>
        <div className="flex overflow-x-auto pb-4 gap-4 px-2 -mx-2 hide-scrollbar">
           {badges.map((badge) => {
             const isEarned = user.stats.badges.find(b => b.id === badge.id);
             return (
               <div key={badge.id} className={`flex-shrink-0 w-24 h-32 flex flex-col items-center justify-center p-3 rounded-[24px] border-2 transition-all ${isEarned ? 'bg-white border-white shadow-lg shadow-slate-200' : 'bg-slate-50 border-transparent opacity-50 grayscale'}`}>
                  <span className="text-4xl mb-3 filter drop-shadow-sm">{badge.icon}</span>
                  <span className="text-[10px] font-bold text-center leading-tight text-slate-600">{badge.name}</span>
               </div>
             );
           })}
        </div>
      </div>

      {/* History */}
      <div>
        <h3 className="text-lg font-black text-slate-800 mb-4 px-2">History</h3>
        {myReports.length > 0 ? (
           <div className="space-y-4">
             {myReports.map(report => (
               <div key={report.id} className="bg-white p-2 pr-4 rounded-[20px] shadow-sm border border-slate-100 flex gap-4 items-center">
                  <img src={report.image} className="w-16 h-16 rounded-[16px] object-cover bg-slate-100" alt="thumbnail" />
                  <div className="flex-1 min-w-0 py-1">
                    <p className="font-bold text-slate-800 truncate">{report.data.issueType}</p>
                    <p className="text-xs font-medium text-slate-400">{new Date(report.timestamp).toLocaleDateString()}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    report.status === 'Resolved' ? 'bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]' : 
                    report.status === 'In Progress' ? 'bg-indigo-400' : 'bg-orange-400'
                  }`}></div>
               </div>
             ))}
           </div>
        ) : (
          <div className="bg-white/50 border border-white rounded-[24px] p-8 text-center">
            <p className="text-slate-400 font-medium">No history yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};