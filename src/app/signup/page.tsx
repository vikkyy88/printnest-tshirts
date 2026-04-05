'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail as MailIcon, Lock as LockIcon, User as UserIcon, Sparkles as SparkleIcon, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    const loading = toast.loading('Creating Nest Account...');
    setTimeout(() => {
      toast.dismiss(loading);
      toast.success('Account created! Join the Nest.');
      router.push('/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6 bg-black relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-neon-green/5 blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-white/5 blur-[100px] translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-12 space-y-10 relative z-10 shadow-2xl"
      >
        <div className="text-center space-y-2">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white">JOIN <br /> THE NEST</h1>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
               <SparkleIcon size={12} className="text-neon-green" /> START YOUR JOURNEY
            </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
              <input 
                type="text" 
                placeholder="FULL NAME" 
                required
                className="w-full bg-black border border-zinc-800 p-4 pl-12 text-xs font-bold text-white uppercase tracking-widest focus:border-neon-green outline-none"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="relative">
              <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                required
                className="w-full bg-black border border-zinc-800 p-4 pl-12 text-xs font-bold text-white uppercase tracking-widest focus:border-neon-green outline-none"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="relative">
              <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
              <input 
                type="password" 
                placeholder="CREATE PASSWORD" 
                required
                className="w-full bg-black border border-zinc-800 p-4 pl-12 text-xs font-bold text-white uppercase tracking-widest focus:border-neon-green outline-none"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <div className="relative">
              <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
              <input 
                type="password" 
                placeholder="CONFIRM PASSWORD" 
                required
                className="w-full bg-black border border-zinc-800 p-4 pl-12 text-xs font-bold text-white uppercase tracking-widest focus:border-neon-green outline-none"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
          </div>

          <button type="submit" className="w-full btn-primary h-14 flex items-center justify-center gap-2">
             Sign Up Now <ArrowRight size={18} />
          </button>
        </form>

        <div className="text-center pt-6 border-t border-zinc-800">
           <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Already a Member?</p>
           <Link href="/login" className="inline-block mt-4 text-sm font-black text-white hover:text-neon-green transition-colors uppercase tracking-widest border-b border-white hover:border-neon-green pb-1">
              Sign In
           </Link>
        </div>
      </motion.div>

      {/* Decorative Text */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-5 text-[30vw] font-black text-white pointer-events-none select-none tracking-tighter">
         JOIN
      </div>
    </div>
  );
}
