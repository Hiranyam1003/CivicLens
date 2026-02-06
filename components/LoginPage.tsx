import React, { useState } from 'react';
import { UserProfile } from '../types';
import { StorageService } from '../services/storageService';

interface LoginPageProps {
  onLogin: (user: UserProfile) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (phoneNumber.length < 10) {
      setError("Enter valid 10-digit mobile");
      return;
    }

    const existingUser = StorageService.loginUser(phoneNumber);

    if (existingUser) {
      onLogin(existingUser);
    } else {
      setIsRegistering(true);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    const newUser: UserProfile = {
      id: Date.now().toString(),
      name: name,
      emailOrPhone: phoneNumber,
      avatarUrl: `https://api.dicebear.com/7.x/notionists/svg?seed=${name}&backgroundColor=b6e3f4`,
      stats: {
        points: 0,
        reportsSubmitted: 0,
        currentStreak: 1,
        rank: 'New Citizen',
        badges: []
      }
    };

    try {
      StorageService.registerUser(newUser);
      onLogin(newUser);
    } catch (err) {
      setError("User exists.");
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-end pb-10 px-6 overflow-hidden">
      {/* Dynamic background with gradients */}
      <div className="absolute inset-0 bg-slate-900 z-0">
        <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-float"></div>
        <div className="absolute top-[10%] right-[-20%] w-[400px] h-[400px] bg-indigo-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-pink-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="mb-8">
           <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-white to-slate-200 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.3)] transform rotate-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
           </div>
           <h1 className="text-5xl font-black text-white tracking-tighter mb-2 leading-none">Civic<br/>Lens.</h1>
           <p className="text-slate-300 text-lg font-medium max-w-[200px]">Fix your city, earn rewards, be a hero.</p>
        </div>

        <div className="glass-dark p-6 rounded-[32px] border border-white/10 shadow-2xl">
          <h2 className="text-white font-bold text-xl mb-6">
            {isRegistering ? "Claim your handle" : "Welcome back"}
          </h2>

          <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
            
            <div className="space-y-1">
              <div className="relative">
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  className="w-full py-4 px-5 bg-slate-800/50 border border-slate-600 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  disabled={isRegistering}
                />
                <span className="absolute right-4 top-4 text-slate-500 font-bold text-sm">IN +91</span>
              </div>
            </div>

            {isRegistering && (
               <div className="space-y-1 animate-fade-in-up">
                 <input
                   type="text"
                   placeholder="Your Name"
                   className="w-full py-4 px-5 bg-slate-800/50 border border-slate-600 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   autoFocus
                 />
               </div>
            )}

            {error && <p className="text-red-400 text-xs font-bold text-center bg-red-900/30 py-2 rounded-lg">{error}</p>}

            <button
              type="submit"
              className="w-full bg-white text-slate-900 font-black py-4 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] active:scale-95 transition-all mt-2 text-lg"
            >
              {isRegistering ? "Join Now 🚀" : "Let's Go ->"}
            </button>
            
            {isRegistering && (
              <button 
                type="button" 
                onClick={() => { setIsRegistering(false); setError(''); }}
                className="w-full text-xs text-slate-400 font-semibold hover:text-white mt-2"
              >
                Start over
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};