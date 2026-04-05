'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, Search, User, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { cartCount, cartTotal, removeFromCart, updateQuantity, cart } = useCart();
  const { wishlist } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop All', href: '/shop' },
    { name: 'Men', href: '/shop?category=Men' },
    { name: 'Women', href: '/shop?category=Women' },
    { name: 'Couples', href: '/couples' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-3xl font-black tracking-tighter text-white">
            PRINT<span className="text-neon-green">NEST</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-bold uppercase tracking-widest text-white hover:text-neon-green transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button className="text-white hover:text-neon-green transition-colors">
              <Search size={22} />
            </button>
            <Link href="/wishlist" className="text-white hover:text-neon-green transition-colors relative">
              <Heart size={22} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-neon-green text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-white hover:text-neon-green transition-colors relative"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-neon-green text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <Link href="/login" className="hidden md:block text-white hover:text-neon-green transition-colors">
              <User size={22} />
            </Link>
            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-black uppercase tracking-tighter text-white hover:text-neon-green"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-bold uppercase tracking-widest text-white/50"
              >
                Account
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[70] p-8 flex flex-col text-black shadow-2xl dark:bg-zinc-900 dark:text-white"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black uppercase tracking-tighter">Your Cart ({cartCount})</h2>
                <button onClick={() => setIsCartOpen(false)} className="hover:text-neon-green transition-colors">
                  <X size={28} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                  <ShoppingCart size={64} className="text-zinc-300 dark:text-zinc-700" />
                  <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Your cart is empty</p>
                  <Link
                    href="/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="btn-primary"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex space-x-4 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                        <div className="relative w-24 h-24 bg-zinc-100 dark:bg-zinc-800 flex-shrink-0">
                          <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-bold text-sm uppercase leading-tight truncate w-40">{item.name}</h3>
                            <p className="font-black text-sm">${((item.discountPrice || item.price) * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest">{item.selectedSize} / {item.selectedColor}</p>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border border-zinc-200 dark:border-zinc-800">
                              <button
                                onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                                className="px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                              >
                                -
                              </button>
                              <span className="px-4 py-1 text-xs font-bold">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                                className="px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                              className="text-xs text-red-500 font-bold uppercase hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 border-t border-zinc-100 dark:border-zinc-800 pt-6 space-y-4">
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-bold uppercase tracking-widest text-sm">Subtotal</span>
                      <span className="font-black">${cartTotal.toFixed(2)}</span>
                    </div>
                    <Link
                      href="/checkout"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full btn-primary block text-center"
                    >
                      Checkout Now
                    </Link>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
