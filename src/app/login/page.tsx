'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock, User, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Missing credentials');
      return;
    }
    const loading = toast.loading('Authenticating...');
    setTimeout(() => {
      toast.dismiss(loading);
      toast.success('Welcome back to the Nest!');
      router.push('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6 bg-black relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-neon-green/5 blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-white/5 blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-12 space-y-10 relative z-10"
      >
        <div className="text-center space-y-2">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white">LOGIN <br /> TO NEST</h1>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
               <Sparkles size={12} className="text-neon-green" /> ACCESS EXCLUSIVE DROPS
            </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                required
                className="w-full bg-black border border-zinc-800 p-4 pl-12 text-xs font-bold text-white uppercase tracking-widest focus:border-neon-green outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
              <input 
                type="password" 
                placeholder="PASSWORD" 
                required
                className="w-full bg-black border border-zinc-800 p-4 pl-12 text-xs font-bold text-white uppercase tracking-widest focus:border-neon-green outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
             <label className="flex items-center gap-2 cursor-pointer text-zinc-400">
                <input type="checkbox" className="accent-neon-green" /> Remember Me
             </label>
             <Link href="#" className="text-neon-green hover:underline">Forgot PWD?</Link>
          </div>

          <button type="submit" className="w-full btn-primary h-14 flex items-center justify-center gap-2">
             Sign In <ArrowRight size={18} />
          </button>
        </form>

        <div className="text-center pt-6 border-t border-zinc-800">
           <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">New to the Nest?</p>
           <Link href="/signup" className="inline-block mt-4 text-sm font-black text-white hover:text-neon-green transition-colors uppercase tracking-widest border-b border-white hover:border-neon-green pb-1">
              Create an Account
           </Link>
        </div>
      </motion.div>

      {/* Decorative Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-5 text-[30vw] font-black text-white pointer-events-none select-none tracking-tighter">
         AUTH
      </div>
    </div>
  );
}
