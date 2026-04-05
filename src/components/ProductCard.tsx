'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      {/* Badge */}
      {(product.isNew || product.isTrending || product.isSale) && (
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-white text-black text-[10px] font-black px-2 py-1 uppercase tracking-tighter">New Arrival</span>
          )}
          {product.isTrending && (
            <span className="bg-neon-green text-black text-[10px] font-black px-2 py-1 uppercase tracking-tighter">Trending</span>
          )}
          {product.isSale && (
            <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 uppercase tracking-tighter">Sale</span>
          )}
        </div>
      )}

      {/* Wishlist Button */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product);
        }}
        className={`absolute top-4 right-4 z-10 p-2 glass-card rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 ${
          isInWishlist(product.id) ? 'text-neon-green bg-black/60 opacity-100' : 'text-white hover:text-neon-green'
        }`}
      >
        <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
      </button>

      {/* Image Wrapper */}
      <Link href={`/product/${product.id}`} className="block relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 aspect-[3/4]">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, product.sizes[0], product.colors[0]);
            }}
            className="w-full btn-primary flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
          >
            <ShoppingBag size={16} />
            Add to Cart
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="mt-4 space-y-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest">{product.category}</p>
            <Link href={`/product/${product.id}`} className="block font-black text-sm uppercase tracking-tighter group-hover:text-neon-green transition-colors leading-tight truncate w-full max-w-[200px]">
              {product.name}
            </Link>
          </div>
          <div className="text-right">
            {product.isSale && product.discountPrice ? (
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-400 line-through font-bold">₹{product.price}</span>
                <span className="text-sm font-black text-neon-green">₹{product.discountPrice}</span>
              </div>
            ) : (
              <span className="text-sm font-black">₹{product.price}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
