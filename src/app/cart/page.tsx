'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, ArrowRight, Trash2, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { cart, cartTotal, removeFromCart, updateQuantity, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-8 px-6 text-center">
        <div className="p-8 bg-zinc-100 dark:bg-zinc-900 rounded-full">
           <ShoppingBag size={80} className="text-zinc-300 dark:text-zinc-700" />
        </div>
        <div className="space-y-4">
           <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">YOUR NEST <br /> IS EMPTY</h1>
           <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm max-w-sm mx-auto">Looks like you haven't added any heat to your collection yet.</p>
        </div>
        <Link href="/shop" className="btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 container mx-auto">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Cart Items */}
        <div className="flex-1 space-y-12">
          <div className="space-y-4 border-b border-zinc-100 dark:border-zinc-800 pb-8">
             <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">SHOPPING <br /> CART</h1>
             <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">{cartCount} Items waiting for checkout</p>
          </div>

          <div className="space-y-8">
            {cart.map((item) => (
              <motion.div 
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                layout
                className="flex flex-col sm:flex-row items-center gap-8 border-b border-zinc-100 dark:border-zinc-800 pb-8 group"
              >
                <Link href={`/product/${item.id}`} className="w-full sm:w-40 aspect-[3/4] bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex-shrink-0">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </Link>
                
                <div className="flex-1 w-full space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{item.category}</p>
                      <h3 className="text-xl font-black uppercase tracking-tighter group-hover:text-neon-green transition-colors leading-tight">{item.name}</h3>
                      <p className="text-xs text-zinc-400 font-bold uppercase mt-1">Size: {item.selectedSize} / {item.selectedColor}</p>
                    </div>
                    <p className="text-xl font-black">₹{((item.discountPrice || item.price) * item.quantity).toFixed(2)}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-zinc-200 dark:border-zinc-800 h-10">
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                        className="px-4 h-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-bold"
                      >-</button>
                      <span className="px-4 font-black text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                        className="px-4 h-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-bold"
                      >+</button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                      className="text-red-500 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:underline"
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96">
          <div className="bg-zinc-50 dark:bg-zinc-900 p-8 space-y-8 sticky top-32 border border-zinc-100 dark:border-zinc-800 shadow-xl">
             <h2 className="text-2xl font-black uppercase tracking-tighter">ORDER SUMMARY</h2>
             
             <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-zinc-500">
                   <span>Subtotal</span>
                   <span className="text-black dark:text-white font-black">₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-zinc-500">
                   <span>Delivery</span>
                   <span className="text-neon-green font-black">FREE SHIPPING</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-zinc-500">
                   <span>Tax (Estimate)</span>
                   <span className="text-black dark:text-white font-black">₹0.00</span>
                </div>
             </div>

             <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-2xl font-black uppercase tracking-tighter mb-4">
                <span>Total</span>
                <span>₹{cartTotal.toFixed(2)}</span>
             </div>

             <div className="space-y-4">
                <Link href="/checkout" className="w-full btn-primary h-14 flex items-center justify-center gap-3">
                  Proceed to Checkout <ArrowRight size={20} />
                </Link>
                <div className="flex items-center justify-center gap-4 py-4 opacity-40">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4" />
                   <div className="h-4 w-px bg-zinc-400" />
                   <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
                   <div className="h-4 w-px bg-zinc-400" />
                   <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                </div>
             </div>

             {/* Policies */}
             <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 space-y-6">
                <div className="flex items-center gap-4">
                  <ShieldCheck size={20} className="text-zinc-400" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Safe and Secure SSL Checkout</p>
                </div>
                <div className="flex items-center gap-4">
                  <Truck size={20} className="text-zinc-400" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Carbon Neutral Express Delivery</p>
                </div>
                <div className="flex items-center gap-4">
                  <RotateCcw size={20} className="text-zinc-400" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">30-Day Money Back Guarantee</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
