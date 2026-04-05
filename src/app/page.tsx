'use client';

import React from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { ArrowRight, Sparkles, Zap, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Background Image / Pattern */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
          <img 
            src="/images/men_streetwear_tshirt_1_1775357166967.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover scale-110 blur-sm" 
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-neon-green font-black uppercase tracking-[0.3em] mb-4 text-xs md:text-sm"
          >
            Spring Summer 2026 Collection
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-8"
          >
            STAY <span className="text-outline text-transparent border-t-zinc-800">BOLD</span> <br /> 
            LIVE <span className="text-neon-green italic">LOUD</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <Link href="/shop" className="btn-primary flex items-center justify-center gap-2 px-12 group">
              Shop Collection <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link href="/couples" className="btn-outline border-white text-white hover:bg-white hover:text-black">
              View Bundles
            </Link>
          </motion.div>
        </div>

        {/* Scrolling text */}
        <div className="absolute bottom-10 left-0 w-full overflow-hidden whitespace-nowrap opacity-20 pointer-events-none">
          <div className="flex animate-marquee text-white text-8xl font-black uppercase tracking-tighter">
            <span>PREMIUM TEES • STREETWEAR • GEN Z AESTHETIC • BOLD DESIGNS • PRE ORDER NOW • &nbsp;</span>
            <span>PREMIUM TEES • STREETWEAR • GEN Z AESTHETIC • BOLD DESIGNS • PRE ORDER NOW • &nbsp;</span>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-24 px-6 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Men's Collection", href: "/shop?category=Men", img: "/images/men_minimalist_tshirt_1_1775357238377.png" },
            { name: "Women's Trends", href: "/shop?category=Women", img: "/images/women_streetwear_tshirt_1_1775357191313.png" },
            { name: "Couples Bundle", href: "/couples", img: "/images/couples_tshirt_bundle_1_1775357215071.png" }
          ].map((cat, i) => (
            <motion.div 
              key={cat.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 group overflow-hidden"
            >
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8 text-white">
                <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">{cat.name}</h3>
                <Link href={cat.href} className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-neon-green transition-colors">
                  Shop Now <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="bg-black text-white py-24 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-4">
              <span className="text-neon-green font-black uppercase tracking-widest text-xs">Trending Right Now</span>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight">THE HOTTEST <br /> DROPS</h2>
            </div>
            <Link href="/shop" className="text-sm font-bold uppercase tracking-widest border-b-2 border-white pb-2 hover:text-neon-green hover:border-neon-green transition-all">
              See All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="bg-neon-green py-20 px-6 overflow-hidden relative">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-black text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
              COUPLES <br /> BUNDLE OFF
            </h2>
            <p className="text-black/80 font-bold uppercase tracking-widest text-lg">Use Code: LOVENEST</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-6 text-center md:text-right">
            <div className="text-black text-6xl md:text-9xl font-black italic">20%</div>
            <Link href="/couples" className="bg-black text-white px-12 py-4 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
              Claim Now
            </Link>
          </div>
        </div>
        {/* Animated Background Text */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-10 flex text-[20vw] font-black uppercase tracking-tighter leading-none pointer-events-none whitespace-nowrap">
           SALE SALE SALE SALE SALE SALE
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { icon: <Truck size={32} />, title: "Free Shipping", desc: "On orders over ₹2000" },
            { icon: <ShieldCheck size={32} />, title: "Secure Checkout", desc: "Encrypted payments" },
            { icon: <Sparkles size={32} />, title: "Premium Fit", desc: "Tailored for young adults" },
            { icon: <Zap size={32} />, title: "Fast Delivery", desc: "Door-to-door in 3 days" }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-zinc-100 dark:bg-zinc-900 text-neon-green rounded-full">{feature.icon}</div>
              <h4 className="font-black uppercase tracking-widest text-sm">{feature.title}</h4>
              <p className="text-zinc-500 text-xs font-bold uppercase">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
