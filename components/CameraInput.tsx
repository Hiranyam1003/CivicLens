import React, { useRef } from 'react';

interface CameraInputProps {
  onImageSelected: (file: File) => void;
  disabled: boolean;
  hidden?: boolean;
  id?: string;
}

export const CameraInput: React.FC<CameraInputProps> = ({ onImageSelected, disabled, hidden, id }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onImageSelected(event.target.files[0]);
    }
  };

  // If used as a visible UI block (empty state)
  if (!hidden) {
    return (
        <div className="w-full flex flex-col items-center justify-center p-8 bg-white rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white text-center relative overflow-hidden group">
        
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-[50px] opacity-50 -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-100 rounded-full blur-[50px] opacity-50 -ml-10 -mb-10 group-hover:scale-110 transition-transform duration-700"></div>

        <div className="relative z-10 w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-200 rotate-3 group-hover:rotate-6 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        </div>
        
        <h2 className="relative z-10 text-2xl font-black text-slate-800 mb-2">Spot a Problem?</h2>
        <p className="relative z-10 text-slate-500 font-medium text-sm mb-8 max-w-xs leading-relaxed">
            Snap a photo of potholes, trash, or broken lights. AI will handle the paperwork.
        </p>

        <input
            type="file"
            accept="image/*"
            capture="environment"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            disabled={disabled}
        />

        <button
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            className="relative z-10 w-full bg-slate-900 text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-slate-200 active:scale-95 transition-all flex items-center justify-center gap-3 hover:bg-slate-800"
        >
            <span className="text-xl">📸</span>
            <span>Take Photo</span>
        </button>
        </div>
    );
  }

  // Hidden component just for functional logic
  return (
    <input
        id={id}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
    />
  );
};