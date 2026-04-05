'use client';

import React from 'react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Users } from 'lucide-react';
import Link from 'next/link';

export default function CouplesPage() {
  const coupleProducts = products.filter(p => p.category === 'Couples');

  return (
    <div className="pt-32 pb-24">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black mb-24 px-6 text-center">
        <div className="absolute inset-0 opacity-40">
          <img src="/images/couples_tshirt_bundle_1_1775357215071.png" alt="Couples Hero" className="w-full h-full object-cover scale-110 blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        </div>
        <div className="relative z-10 space-y-6 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-neon-green text-black px-4 py-1 text-[10px] font-black uppercase tracking-widest"
          >
            <Users size={14} /> Ultimate Bundle Deals
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none"
          >
            MADE FOR <br /> <span className="text-neon-green italic">TWO</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 font-bold uppercase tracking-widest text-sm max-w-2xl mx-auto"
          >
            Save up to 30% when you buy matching sets. Express your connection with PrintNest limited bundles.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
             <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">BUNDLE DROPS</h2>
             <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Matching outfits for the main characters.</p>
          </div>
          <div className="flex items-center gap-4 bg-zinc-100 dark:bg-zinc-900 p-2 border border-zinc-200 dark:border-zinc-800">
             <Sparkles size={20} className="text-neon-green" />
             <span className="text-[10px] font-black uppercase tracking-widest">Limited Sets Only</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {coupleProducts.map((product) => (
            <div key={product.id} className="space-y-6">
              <ProductCard product={product} />
              <div className="bg-zinc-50 dark:bg-zinc-900 p-6 space-y-4 border-l-4 border-neon-green">
                <h4 className="font-black uppercase tracking-widest text-xs">Bundle Inclusions:</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-xs font-bold uppercase text-zinc-600 dark:text-zinc-400">
                    <div className="w-1.5 h-1.5 bg-neon-green rounded-full" />
                    2x Premium Heavyweight Tees
                  </li>
                  <li className="flex items-center gap-3 text-xs font-bold uppercase text-zinc-600 dark:text-zinc-400">
                    <div className="w-1.5 h-1.5 bg-neon-green rounded-full" />
                    Custom Gift Nest Box
                  </li>
                  <li className="flex items-center gap-3 text-xs font-bold uppercase text-zinc-600 dark:text-zinc-400">
                    <div className="w-1.5 h-1.5 bg-neon-green rounded-full" />
                    Exclusive Sticker Pack
                  </li>
                </ul>
                <div className="pt-2">
                   <p className="text-[10px] text-neon-green font-black uppercase tracking-widest mb-1 italic">Bundle Savings: $10.00 Off</p>
                   <Link href={`/product/${product.id}`} className="text-xs font-black uppercase tracking-widest border-b border-black dark:border-white pb-1 hover:text-neon-green hover:border-neon-green transition-all">Configure Bundle Sizes</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <section className="mt-32 bg-black py-24 px-12 text-center overflow-hidden relative">
           <div className="relative z-10 space-y-8">
              <h2 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight">CUSTOM <br /> COUPLE SETS</h2>
              <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm max-w-lg mx-auto">Want to mix and match different designs? We've got you covered. Build your own set and save.</p>
              <button className="btn-primary">Build Your Own Bundle</button>
           </div>
           <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-5 select-none pointer-events-none">
              <span className="text-[30vw] font-black italic">NEST</span>
           </div>
        </section>
      </div>
    </div>
  );
}
