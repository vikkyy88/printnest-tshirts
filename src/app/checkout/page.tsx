'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { Lock, Truck, ChevronRight, CheckCircle2, ArrowLeft, Smartphone } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Script from 'next/script';
import { createOrder, verifyPayment } from '@/app/actions/razorpay';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    country: 'India',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.firstName || !formData.lastName) {
      toast.error('Please fill in your contact information');
      return false;
    }
    if (!formData.address || !formData.city || !formData.zip) {
      toast.error('Please fill in your shipping address');
      return false;
    }
    if (!formData.phone) {
      toast.error('Phone number is required for UPI payment');
      return false;
    }
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return false;
    }
    return true;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (!razorpayLoaded) {
      toast.error('Payment gateway is loading. Please wait...');
      return;
    }

    setIsProcessing(true);

    try {
      // Create order on server
      const orderResult = await createOrder(
        cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          discountPrice: item.discountPrice,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
        })),
        {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          zip: formData.zip,
          country: formData.country,
          phone: formData.phone,
        }
      );

      if (!orderResult.success) {
        toast.error(orderResult.error || 'Failed to create order');
        setIsProcessing(false);
        return;
      }

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: orderResult.amount!,
        currency: orderResult.currency!,
        name: 'PrintNest',
        description: 'T-shirt Purchase',
        order_id: orderResult.orderId!,
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          // Verify payment on server
          const verifyResult = await verifyPayment(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature
          );

          if (verifyResult.success) {
            setIsOrdered(true);
            clearCart();
            toast.success('Payment successful! Order confirmed.');
          } else {
            toast.error(verifyResult.error || 'Payment verification failed');
          }
          setIsProcessing(false);
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          address: `${formData.address}, ${formData.city}, ${formData.zip}`,
        },
        theme: {
          color: '#ADFF00',
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            toast.error('Payment cancelled');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Something went wrong. Please try again.');
      setIsProcessing(false);
    }
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
           <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm">{"We've received your order and are preparing it for delivery. Your tracking link has been sent to"} {formData.email}.</p>
           <div className="pt-8">
              <Link href="/" className="btn-primary">Return to Nest</Link>
           </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayLoaded(true)}
      />
      <div className="pt-32 pb-24 px-6 container mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Checkout Form */}
          <div className="flex-1 space-y-12">
            <div className="space-y-4">
               <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">SECURE <br /> CHECKOUT</h1>
               <div className="flex items-center gap-2 text-neon-green font-black uppercase tracking-widest text-[10px]">
                  <Lock size={14} /> Razorpay Secure Payment
               </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-12">
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
                  <div className="flex flex-col space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Phone Number (for UPI)*</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        placeholder="+91 9876543210" 
                        className="bg-zinc-100 dark:bg-zinc-900 p-4 font-bold text-sm uppercase focus:ring-2 focus:ring-neon-green outline-none"
                        value={formData.phone}
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
                      <input name="zip" required placeholder="PIN CODE" className="bg-zinc-100 dark:bg-zinc-900 p-4 font-bold text-sm uppercase outline-none focus:ring-2 focus:ring-neon-green" value={formData.zip} onChange={handleInputChange} />
                      <select name="country" className="bg-zinc-100 dark:bg-zinc-900 p-4 font-bold text-sm uppercase outline-none focus:ring-2 focus:ring-neon-green" value={formData.country} onChange={handleInputChange}>
                         <option>India</option>
                         <option>United States</option>
                         <option>United Kingdom</option>
                      </select>
                  </div>
              </section>

              {/* Payment Method Info */}
              <section className="space-y-6">
                  <h3 className="text-xl font-black uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-800 pb-4">03. PAYMENT</h3>
                  <div className="p-6 bg-zinc-900 text-white rounded-none border border-zinc-800 space-y-6">
                      <div className="flex items-center justify-between">
                         <Smartphone size={32} className="text-neon-green" />
                         <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 italic">RAZORPAY SECURE</span>
                      </div>
                      <div className="space-y-4">
                         <div className="flex items-center gap-4 p-4 bg-black border border-zinc-800">
                            <div className="w-12 h-12 bg-neon-green/10 flex items-center justify-center">
                               <span className="text-neon-green font-black text-lg">UPI</span>
                            </div>
                            <div>
                               <p className="font-black text-sm uppercase">UPI / Cards / Netbanking</p>
                               <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Pay via GPay, PhonePe, Paytm, Cards & more</p>
                            </div>
                         </div>
                         <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                            Click the button below to open Razorpay secure payment window. You can choose UPI, Credit/Debit Cards, or Netbanking.
                         </p>
                      </div>
                  </div>
              </section>

              <button 
                type="submit" 
                disabled={isProcessing || cart.length === 0}
                className="w-full btn-primary h-16 text-xl flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                 {isProcessing ? (
                   <>Processing...</>
                 ) : (
                   <>Pay ₹{cartTotal.toFixed(2)} <ChevronRight size={24} /></>
                 )}
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
                              <p className="text-xs font-black mt-1">₹{((item.discountPrice || item.price) * item.quantity).toFixed(2)}</p>
                           </div>
                        </div>
                     ))}
                  </div>

                  <div className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                      <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-zinc-500">
                         <span>Subtotal</span>
                         <span className="text-black font-black dark:text-white">₹{cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-zinc-500">
                         <span>Shipping</span>
                         <span className="text-neon-green font-black">NEON EXPRESS (FREE)</span>
                      </div>
                      <div className="flex justify-between items-center text-xl font-black uppercase tracking-tighter pt-4 border-t border-zinc-100 dark:border-zinc-800">
                         <span>Total</span>
                         <span>₹{cartTotal.toFixed(2)}</span>
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
    </>
  );
}
