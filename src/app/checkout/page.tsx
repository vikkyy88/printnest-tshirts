'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, CreditCard, Truck, ChevronRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    country: 'United Kingdom',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate simple mock
    if (!formData.email || !formData.address || !formData.cardNumber) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Processing mock
    const loadingToast = toast.loading('Processing payment...');
    
    setTimeout(() => {
        toast.dismiss(loadingToast);
        setIsOrdered(true);
        clearCart();
        toast.success('Order placed successfully!');
    }, 2000);
  };

  if (isOrdered) {
    return (
      <div className="h-screen flex flex-col items-center justify-center px-6 text-center bg-black text-white">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8 p-4 bg-neon-green rounded-full text-black"
        >
           <CheckCircle2 size={80} />
        </motion.div>
        <div className="space-y-4 max-w-lg mx-auto">
           <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">ORDER <br /> CONFIRMED</h1>
           <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm">We've received your order and are preparing it for delivery. Your tracking link has been sent to {formData.email}.</p>
           <div className="pt-8">
              <Link href="/" className="btn-primary">Return to Nest</Link>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 container mx-auto">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Checkout Form */}
        <div className="flex-1 space-y-12">
          <div className="space-y-4">
             <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">SECURE <br /> CHECKOUT</h1>
             <div className="flex items-center gap-2 text-neon-green font-black uppercase tracking-widest text-[10px]">
                <Lock size={14} /> Encrypted Payment Gateway
             </div>
          </div>

          <form onSubmit={handlePlaceOrder} className="space-y-12">
            {/* Contact Information */}
            <section className="space-y-6">
                <h3 className="text-xl font-black uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-800 pb-4">01. CONTACT</h3>
                <div className="flex flex-col space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Email Address*</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="EMAIL@EXAMPLE.COM" 
                      className="bg-zinc-100 dark:bg-zinc-900 p-4 font-bold text-sm uppercase focus:ring-2 focus:ring-neon-green outline-none"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                </div>
            </section>

            {/* Shipping Information */}
            <section className="space-y-6">
                <h3 className="text-xl font-black uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-800 pb-4">02. SHIPPING</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">First Name*</label>
                        <input name="firstName" required className="bg-zinc-100 dark:bg-zinc-900 p-4 font-bold text-sm uppercase outline-none focus:ring-2 focus:ring-neon-green" value={formData.firstName} onChange={handleInputChange} />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Last Name*</label>
                        <input name="lastName" required className="bg-zinc-100 dark:bg-zinc-900 p-4 font-bold text-sm uppercase outline-none focus:ring-2 focus:ring-neon-green" value={formData.lastName} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Shipping Address*</label>
                    <input name="address" required className="bg-zinc-100 dark:bg-zinc-900 p-4 font-bold text-sm uppercase outline-none focus:ring-2 focus:ring-neon-green" value={formData.address} onChange={handleInputChange} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input name="city" required placeholder="CITY" className="bg-zinc-100 dark:bg-zinc-900 p-4 font-bold text-sm uppercase outline-none focus:ring-2 focus:ring-neon-green" value={formData.city} onChange={handleInputChange} />
                    <input name="zip" required placeholder="ZIP CODE" className="bg-zinc-100 dark:bg-zinc-900 p-4 font-bold text-sm uppercase outline-none focus:ring-2 focus:ring-neon-green" value={formData.zip} onChange={handleInputChange} />
                    <select name="country" className="bg-zinc-100 dark:bg-zinc-900 p-4 font-bold text-sm uppercase outline-none focus:ring-2 focus:ring-neon-green" value={formData.country} onChange={handleInputChange}>
                       <option>United Kingdom</option>
                       <option>United States</option>
                       <option>Germany</option>
                    </select>
                </div>
            </section>

            {/* Payment Information */}
            <section className="space-y-6">
                <h3 className="text-xl font-black uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-800 pb-4">03. PAYMENT</h3>
                <div className="p-6 bg-zinc-900 text-white rounded-none border border-zinc-800 space-y-6">
                    <div className="flex items-center justify-between">
                       <CreditCard size={32} className="text-neon-green" />
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 italic">PAYMENT SECURED</span>
                    </div>
                    <div className="space-y-4">
                       <div className="flex flex-col space-y-2">
                           <label className="text-[10px] font-black tracking-widest">CARD NUMBER</label>
                           <input 
                              type="text" 
                              name="cardNumber"
                              required
                              placeholder="0000 0000 0000 0000" 
                              className="bg-black border border-zinc-800 p-4 font-bold tracking-widest outline-none focus:border-neon-green"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                           />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                           <div className="flex flex-col space-y-2">
                               <label className="text-[10px] font-black tracking-widest">EXPIRY</label>
                               <input name="expiry" required placeholder="MM/YY" className="bg-black border border-zinc-800 p-4 font-bold tracking-widest outline-none focus:border-neon-green" value={formData.expiry} onChange={handleInputChange} />
                           </div>
                           <div className="flex flex-col space-y-2">
                               <label className="text-[10px] font-black tracking-widest">CVV</label>
                               <input name="cvv" required placeholder="000" className="bg-black border border-zinc-800 p-4 font-bold tracking-widest outline-none focus:border-neon-green" value={formData.cvv} onChange={handleInputChange} />
                           </div>
                       </div>
                    </div>
                </div>
            </section>

            <button type="submit" className="w-full btn-primary h-16 text-xl flex items-center justify-center gap-4">
               Place Your Order <ChevronRight size={24} />
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-96">
            <div className="bg-zinc-50 dark:bg-zinc-900 p-8 space-y-8 sticky top-32 border border-zinc-100 dark:border-zinc-800 shadow-xl">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-black uppercase tracking-tighter">YOUR NEST</h2>
                    <Link href="/cart" className="text-[10px] font-black uppercase tracking-widest border-b border-black pb-1 hover:text-neon-green hover:border-neon-green transition-all flex items-center gap-2">
                       <ArrowLeft size={12} /> Edit
                    </Link>
                </div>

                <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2">
                   {cart.map((item) => (
                      <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                         <div className="w-16 h-16 bg-white flex-shrink-0">
                            <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                         </div>
                         <div className="flex-1">
                            <h4 className="text-[10px] font-black uppercase tracking-tight leading-tight">{item.name}</h4>
                            <p className="text-[8px] font-bold text-zinc-500 uppercase mt-1">{item.selectedSize} / X{item.quantity}</p>
                            <p className="text-xs font-black mt-1">${((item.discountPrice || item.price) * item.quantity).toFixed(2)}</p>
                         </div>
                      </div>
                   ))}
                </div>

                <div className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-zinc-500">
                       <span>Subtotal</span>
                       <span className="text-black font-black dark:text-white">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-zinc-500">
                       <span>Shipping</span>
                       <span className="text-neon-green font-black">NEON EXPRESS (FREE)</span>
                    </div>
                    <div className="flex justify-between items-center text-xl font-black uppercase tracking-tighter pt-4 border-t border-zinc-100 dark:border-zinc-800">
                       <span>Total</span>
                       <span>${cartTotal.toFixed(2)}</span>
                    </div>
                </div>

                <div className="pt-8 space-y-4">
                   <div className="flex items-center gap-3 text-zinc-400">
                      <Truck size={18} />
                      <p className="text-[9px] font-bold uppercase tracking-widest leading-relaxed">Fast delivery expected by 10th-12th April.</p>
                   </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
