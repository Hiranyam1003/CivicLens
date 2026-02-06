import React from 'react';
import { ReportSubmission } from '../types';

interface FeedPageProps {
  reports: ReportSubmission[];
}

export const FeedPage: React.FC<FeedPageProps> = ({ reports }) => {
  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-fade-in-up">
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl shadow-indigo-100">
           <span className="text-4xl">🏙️</span>
        </div>
        <h3 className="text-2xl font-black text-slate-800 mb-2">It's quiet here.</h3>
        <p className="text-slate-500 font-medium">Be the first Hero to report an issue!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-32 animate-fade-in-up">
      <div className="flex items-center justify-between px-2">
         <h2 className="text-2xl font-black text-slate-800 tracking-tight">Community Feed</h2>
         <span className="text-xs font-bold bg-white px-3 py-1 rounded-full shadow-sm text-indigo-600">LIVE</span>
      </div>
      
      {reports.map((report, idx) => (
        <div key={report.id} className="bg-white rounded-[32px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white overflow-hidden transform transition-all hover:scale-[1.01]">
          {/* Header */}
          <div className="p-4 flex items-center justify-between bg-white/50 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="p-[2px] bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-full">
                <img src={report.userAvatar || 'https://via.placeholder.com/40'} alt="User" className="w-10 h-10 rounded-full bg-white border-2 border-white" />
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900 leading-tight">{report.userName}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{report.location.split(',')[0]}</p>
              </div>
            </div>
            
            <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
              report.status === 'Resolved' ? 'bg-green-100 text-green-700' : 
              report.status === 'In Progress' ? 'bg-indigo-100 text-indigo-700' : 'bg-orange-50 text-orange-600'
            }`}>
              {report.status}
            </span>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden group">
             <img src={report.image} alt={report.data.issueType} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
             
             {/* Overlay Gradient */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
             
             <div className="absolute bottom-4 left-4">
               <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 rounded-lg text-xs font-bold">
                 {report.data.issueType}
               </span>
             </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <p className="text-sm font-medium text-slate-600 leading-relaxed mb-4">{report.data.description}</p>
            
            <div className="flex items-center justify-between pt-2">
               <div className="flex items-center gap-4">
                 <button className="group flex items-center gap-2 text-slate-400 hover:text-pink-500 transition-colors">
                    <div className="p-2 rounded-full group-hover:bg-pink-50 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={report.isUpvoted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <span className="text-sm font-bold text-slate-700">{report.upvotes}</span>
                 </button>

                 <button className="group flex items-center gap-2 text-slate-400 hover:text-indigo-500 transition-colors">
                    <div className="p-2 rounded-full group-hover:bg-indigo-50 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                 </button>
               </div>

               <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
               </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};