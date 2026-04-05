'use client';

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/ProductCard';
import { Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const product = useMemo(() => products.find((p) => p.id === id), [id]);

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'Description' | 'Reviews' | 'Shipping'>('Description');

  if (!product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-300">Product Not Found</h1>
        <button onClick={() => router.push('/shop')} className="btn-primary">Back to Shop</button>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    router.push('/checkout');
  };

  return (
    <div className="pt-32 pb-24 px-6 container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* Gallery */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-[3/4] bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative group"
          >
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
            />
            {product.isTrending && (
                <span className="absolute top-6 left-6 bg-neon-green text-black text-xs font-black px-4 py-1 uppercase tracking-widest z-10">Trending Now</span>
            )}
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <div key={i} className="aspect-square bg-zinc-100 dark:bg-zinc-800 cursor-pointer border-2 border-transparent hover:border-black dark:hover:border-white transition-all">
                <img src={img} alt={`${product.name} ${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em]">{product.category}</p>
                <div className="flex items-center text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-black ml-1 text-black dark:text-white">{product.rating} ({product.reviewsCount} REVIEWS)</span>
                </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight">{product.name}</h1>
            <div className="flex items-center gap-4">
              {product.isSale && product.discountPrice ? (
                <>
                  <span className="text-4xl font-black text-neon-green">₹{product.discountPrice}</span>
                  <span className="text-2xl text-zinc-400 line-through font-bold">₹{product.price}</span>
                </>
              ) : (
                <span className="text-4xl font-black">₹{product.price}</span>
              )}
            </div>
          </div>

          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-lg">
            {product.description}
          </p>

          {/* Color Selection */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest">Color: <span className="text-zinc-400">{selectedColor}</span></h4>
            <div className="flex gap-3">
              {product.colors.map(color => (
                <button 
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 p-0.5 transition-all ${selectedColor === color ? 'border-black dark:border-white' : 'border-transparent'}`}
                >
                  <div className={`w-full h-full rounded-full ${color === 'Black' ? 'bg-black' : 'bg-white border'}`} title={color} />
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-black uppercase tracking-widest">Size: <span className="text-zinc-400">{selectedSize}</span></h4>
              <button className="text-[10px] font-black uppercase tracking-widest border-b border-black dark:border-white pb-0.5 hover:text-neon-green hover:border-neon-green transition-colors">Size Guide</button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.sizes.map(size => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border py-3 text-xs font-black uppercase transition-all ${selectedSize === size ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white' : 'border-zinc-200 text-zinc-400 hover:border-black dark:hover:border-white'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and CTA */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-zinc-200 dark:border-zinc-800 h-14">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-6 h-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-bold text-xl"
                >-</button>
                <span className="px-6 font-black text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-6 h-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-bold text-xl"
                >+</button>
              </div>
              <button 
                onClick={() => toggleWishlist(product)}
                className={`h-14 w-14 flex items-center justify-center border transition-all ${isInWishlist(product.id) ? 'bg-black text-white border-black dark:bg-white dark:text-black' : 'border-zinc-200 hover:border-black dark:border-zinc-800 dark:hover:border-white'}`}
              >
                <Heart size={24} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => addToCart(product, selectedSize, selectedColor, quantity)}
                className="flex-1 btn-primary h-14 flex items-center justify-center gap-3"
              >
                <ShoppingBag size={20} /> Add to Cart
              </button>
              <button 
                onClick={handleBuyNow}
                className="flex-1 btn-outline h-14 flex items-center justify-center dark:border-white dark:text-white"
              >
                Buy It Now
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Truck size={24} className="text-neon-green" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest">Free Shipping</p>
                <p className="text-[8px] text-zinc-500 font-bold uppercase">Orders over ₹2000</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw size={24} className="text-neon-green" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest">Easy Returns</p>
                <p className="text-[8px] text-zinc-500 font-bold uppercase">30-day guarantee</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck size={24} className="text-neon-green" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest">Secure Pay</p>
                <p className="text-[8px] text-zinc-500 font-bold uppercase">Encrypted checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs / Info */}
      <div className="mb-24">
        <div className="flex border-b border-zinc-100 dark:border-zinc-800 overflow-x-auto">
          {['Description', 'Reviews', 'Shipping'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-8 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === tab ? 'text-black dark:text-white' : 'text-zinc-400'}`}
            >
              {tab}
              {activeTab === tab && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-neon-green" />}
            </button>
          ))}
        </div>
        <div className="py-12 max-w-3xl">
          {activeTab === 'Description' && (
            <div className="space-y-6 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed uppercase font-bold">
              <p>Elevate your wardrobe with the {product.name}. This premium piece is crafted from our signature heavy-weight cotton blend, designed to hold its oversized shape wash after wash.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>100% Organic Premium Cotton (240 GSM)</li>
                <li>Sustainable low-impact dye process</li>
                <li>High-definition screen printed graphics</li>
                <li>Modern oversized fit for streetwear styling</li>
                <li>Reinforced neck ribbing and double-needle hems</li>
              </ul>
            </div>
          )}
          {activeTab === 'Reviews' && (
            <div className="space-y-8">
              <div className="flex items-center gap-12 mb-12">
                 <div className="text-center">
                    <p className="text-6xl font-black">{product.rating}</p>
                    <div className="flex text-yellow-500 mb-1">
                        {[1,2,3,4,5].map(i => <Star key={i} size={14} fill={i <= Math.floor(product.rating) ? "currentColor" : "none"} />)}
                    </div>
                    <p className="text-[10px] font-black uppercase text-zinc-400">Average Rating</p>
                 </div>
                 <button className="btn-primary">Write a Review</button>
              </div>
              <div className="space-y-8">
                {[1, 2].map((r) => (
                  <div key={r} className="border-b border-zinc-100 dark:border-zinc-800 pb-8 last:border-none">
                    <div className="flex justify-between items-center mb-4">
                      <div className="space-y-1">
                        <div className="flex text-yellow-500">
                          {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="currentColor" />)}
                        </div>
                        <p className="text-xs font-black uppercase">Verified Buyer</p>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-bold uppercase">2 weeks ago</span>
                    </div>
                    <p className="text-sm font-bold uppercase tracking-tight italic">"The quality is insane. The neon print really pops in person. Fits perfectly oversized."</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'Shipping' && (
            <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed uppercase font-bold space-y-4">
              <p>Worldwide shipping available from our London studio.</p>
              <div className="space-y-1">
                <p className="text-black dark:text-white">UK Standard: 2-3 Business Days (£4.99 or Free over £60)</p>
                <p className="text-black dark:text-white">UK Express: Next Business Day (£8.99)</p>
                <p className="text-black dark:text-white">International: 5-10 Business Days (Calculated at checkout)</p>
              </div>
              <p className="mt-4">All orders are shipped using carbon-neutral delivery services.</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="space-y-12">
        <h2 className="text-4xl font-black uppercase tracking-tighter">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
