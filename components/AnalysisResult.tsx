import React, { useState } from 'react';
import { CivicIssueData, SeverityLevel } from '../types';

interface AnalysisResultProps {
  data: CivicIssueData;
  imageUrl: string;
  onCancel: () => void;
  onSubmit: () => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ data, imageUrl, onCancel, onSubmit }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'letter'>('details');

  if (data.issueType === 'Invalid') {
    return (
      <div className="bg-white p-8 rounded-[32px] shadow-xl text-center animate-fade-in-up">
        <div className="mx-auto w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl">🤔</span>
        </div>
        <h3 className="text-xl font-black text-slate-800 mb-2">Not a Civic Issue?</h3>
        <p className="text-slate-500 font-medium mb-8">Our AI couldn't spot a problem. Try getting closer!</p>
        <button onClick={onCancel} className="w-full py-4 bg-slate-100 text-slate-800 font-bold rounded-2xl hover:bg-slate-200 transition-colors">Try Again</button>
      </div>
    );
  }

  const getSeverityColor = (level: SeverityLevel) => {
    switch (level) {
      case SeverityLevel.CRITICAL: return 'bg-red-500 text-white shadow-red-200';
      case SeverityLevel.HIGH: return 'bg-orange-500 text-white shadow-orange-200';
      case SeverityLevel.MEDIUM: return 'bg-yellow-500 text-white shadow-yellow-200';
      default: return 'bg-green-500 text-white shadow-green-200';
    }
  };

  return (
    <div className="bg-white rounded-[32px] shadow-2xl shadow-slate-200 overflow-hidden animate-fade-in-up border border-white">
      <div className="relative h-64 w-full">
        <img src={imageUrl} alt="Issue" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute top-4 right-4">
           <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wide shadow-lg ${getSeverityColor(data.severity)}`}>
             {data.severity} Priority
           </span>
        </div>
        <div className="absolute bottom-4 left-4">
           <h2 className="text-3xl font-black text-white leading-tight drop-shadow-md">{data.issueType}</h2>
        </div>
      </div>

      <div className="p-6">
        {/* Tabs */}
        <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
          <button 
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'details' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400'}`}
            onClick={() => setActiveTab('details')}
          >
            Overview
          </button>
          <button 
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'letter' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400'}`}
            onClick={() => setActiveTab('letter')}
          >
            Letter
          </button>
        </div>

        {activeTab === 'details' ? (
          <div className="space-y-4 animate-fade-in-up">
            <div className="flex p-4 bg-indigo-50/50 rounded-2xl border border-indigo-50">
              <div className="mr-4 mt-1 bg-indigo-100 p-2 rounded-lg text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-0.5">Assigned To</p>
                <p className="text-slate-800 font-bold text-lg leading-tight">{data.department}</p>
              </div>
            </div>

            <div>
              <p className="text-slate-700 font-medium leading-relaxed">{data.description}</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 p-3 rounded-xl font-medium">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               <span>Resolution Estimate: <strong className="text-slate-800">{data.estimatedResolutionDays} days</strong></span>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in-up">
             <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
               </div>
               <p className="text-xs text-slate-400 font-bold uppercase mb-2">Generated Draft</p>
               <h4 className="font-bold text-slate-900 mb-4 text-lg">{data.complaintTitle}</h4>
               <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed font-serif">{data.complaintBody}</p>
             </div>
          </div>
        )}

        <div className="mt-8 flex gap-3">
          <button 
            onClick={onCancel}
            className="flex-1 py-4 bg-white border-2 border-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onSubmit}
            className="flex-[2] py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl shadow-slate-300 hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95"
          >
            Submit Report 🚀
          </button>
        </div>
      </div>
    </div>
  );
};