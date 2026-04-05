import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link href="/" className="text-3xl font-black tracking-tighter">
              PRINT<span className="text-neon-green">NEST</span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              Premium printed t-shirts for the expressive generation. Style that speaks without words.
            </p>
            <div className="flex space-x-4">
              <span className="w-10 h-10 border border-zinc-700 flex items-center justify-center hover:bg-neon-green hover:text-black hover:border-neon-green transition-all cursor-pointer">IG</span>
              <span className="w-10 h-10 border border-zinc-700 flex items-center justify-center hover:bg-neon-green hover:text-black hover:border-neon-green transition-all cursor-pointer">TW</span>
              <span className="w-10 h-10 border border-zinc-700 flex items-center justify-center hover:bg-neon-green hover:text-black hover:border-neon-green transition-all cursor-pointer">TT</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-6">Shop</h4>
            <ul className="space-y-4 text-zinc-400 text-sm">
              <li><Link href="/shop?category=Men" className="hover:text-neon-green transition-colors">Men's Collection</Link></li>
              <li><Link href="/shop?category=Women" className="hover:text-neon-green transition-colors">Women's Collection</Link></li>
              <li><Link href="/couples" className="hover:text-neon-green transition-colors">Couples' Bundle</Link></li>
              <li><Link href="/shop" className="hover:text-neon-green transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4 text-zinc-400 text-sm">
              <li><Link href="#" className="hover:text-neon-green transition-colors">Track Order</Link></li>
              <li><Link href="#" className="hover:text-neon-green transition-colors">Returns & Refunds</Link></li>
              <li><Link href="#" className="hover:text-neon-green transition-colors">Shipping Info</Link></li>
              <li><Link href="#" className="hover:text-neon-green transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-6">Join the Nest</h4>
            <p className="text-zinc-400 text-xs mb-4">Subscribe to get 15% off your first order.</p>
            <div className="flex flex-col space-y-4">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-zinc-900 border border-zinc-800 text-white p-3 text-xs focus:outline-none focus:border-neon-green uppercase tracking-widest"
              />
              <button className="btn-primary py-2 text-xs">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
          <p>© 2026 PRINTNEST ARTWORKS. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
