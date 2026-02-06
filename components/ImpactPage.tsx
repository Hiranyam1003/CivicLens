import React from 'react';

export const ImpactPage: React.FC = () => {
  const cityGoals = [
    { title: 'Pothole-free Zone', current: 450, goal: 500, icon: '🕳️', color: 'bg-orange-500' },
    { title: 'Clean Parks', current: 120, goal: 200, icon: '🌳', color: 'bg-green-500' },
    { title: 'Safe Streets', current: 85, goal: 100, icon: '💡', color: 'bg-yellow-500' },
  ];

  return (
    <div className="pb-32 animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">City Impact</h2>
        <p className="text-slate-500 font-medium text-sm">Real change, together.</p>
      </div>

      {/* Global Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute -right-2 -top-2 w-16 h-16 bg-blue-50 rounded-full blur-2xl"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Fixed</p>
          <p className="text-3xl font-black text-slate-900">12,402</p>
          <div className="mt-2 text-[10px] font-bold text-green-500">+12% this week</div>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute -right-2 -top-2 w-16 h-16 bg-purple-50 rounded-full blur-2xl"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Heroes</p>
          <p className="text-3xl font-black text-slate-900">5,681</p>
          <div className="mt-2 text-[10px] font-bold text-indigo-500">Live now</div>
        </div>
      </div>

      {/* City Goals Section */}
      <div className="mb-8">
        <h3 className="text-lg font-black text-slate-800 mb-4 px-2">Community Goals</h3>
        <div className="space-y-4">
          {cityGoals.map((goal, i) => (
            <div key={i} className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{goal.icon}</span>
                  <span className="font-bold text-slate-800">{goal.title}</span>
                </div>
                <span className="text-xs font-bold text-slate-400">{Math.round((goal.current/goal.goal)*100)}%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${goal.color} rounded-full transition-all duration-1000`} 
                  style={{ width: `${(goal.current / goal.goal) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Preview Card */}
      <div className="bg-slate-900 rounded-[32px] p-6 text-white relative overflow-hidden shadow-xl shadow-indigo-900/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-[60px] opacity-40"></div>
        <h3 className="text-xl font-black mb-2 relative z-10">Issue Hotspots</h3>
        <p className="text-slate-400 text-sm mb-6 relative z-10">See where your help is needed most right now.</p>
        <button className="bg-white text-slate-900 font-bold px-6 py-3 rounded-2xl text-sm relative z-10 hover:scale-105 active:scale-95 transition-all">
          Open Live Map
        </button>
      </div>
    </div>
  );
};
