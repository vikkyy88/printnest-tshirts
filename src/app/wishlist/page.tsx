'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-8 px-6 text-center">
        <div className="p-8 bg-zinc-100 dark:bg-zinc-900 rounded-full">
           <Heart size={80} className="text-zinc-300 dark:text-zinc-700" />
        </div>
        <div className="space-y-4">
           <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">EMPTY <br /> WISHLIST</h1>
           <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm max-w-sm mx-auto">Save your favorites here to grab them before they drop out of stock.</p>
        </div>
        <Link href="/shop" className="btn-primary">Explore Collection</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 container mx-auto">
      <div className="space-y-12">
        <div className="space-y-4 border-b border-zinc-100 dark:border-zinc-800 pb-8">
           <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">YOUR <br /> FAVORITES</h1>
           <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">{wishlist.length} Items saved to your shortlist</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Suggestion */}
        <section className="mt-24 bg-neon-green p-12 text-center">
           <h2 className="text-black text-3xl font-black uppercase tracking-tighter mb-4">READY TO CART THEM?</h2>
           <p className="text-black/70 font-bold uppercase tracking-widest text-sm mb-8">Grab your favorites now and get free shipping on orders over ₹2000.</p>
           <Link href="/cart" className="bg-black text-white px-12 py-4 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors inline-block">
              Go to Cart
           </Link>
        </section>
      </div>
    </div>
  );
}
