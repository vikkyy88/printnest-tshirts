'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import { Category, Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { Filter, ChevronDown, LayoutGrid, List, SlidersHorizontal, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') as Category | null;

  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>(categoryParam || 'All');
  const [selectedSize, setSelectedSize] = useState<string | 'All'>('All');
  const [sortBy, setSortBy] = useState<'Featured' | 'Price: Low to High' | 'Price: High to Low' | 'Popularity'>('Featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const categories: (Category | 'All')[] = ['All', 'Men', 'Women', 'Couples'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by Size
    if (selectedSize !== 'All') {
      result = result.filter(p => p.sizes.includes(selectedSize));
    }

    // Filter by Search
    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Sort
    switch (sortBy) {
      case 'Price: Low to High':
        result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'Price: High to Low':
        result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'Popularity':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, selectedSize, sortBy, searchQuery]);

  return (
    <div className="pt-32 pb-24 px-6 container mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">THE <br /> COLLECTION</h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Total {filteredProducts.length} Products Found</p>
        </div>

        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text" 
              placeholder="SEARCH PRODUCTS" 
              className="w-full bg-zinc-100 border-none p-4 pl-10 text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-neon-green"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="btn-outline flex items-center gap-2 p-3 text-xs"
          >
            <SlidersHorizontal size={18} /> Filters
          </button>
        </div>
      </div>

      {/* Filters Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-zinc-200 mb-12"
          >
            <div className="py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Category Filter */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-[0.2em]">Category</h4>
                <div className="flex flex-col gap-2">
                  {categories.map((cat) => (
                    <button 
                      key={cat} 
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-left text-sm font-bold uppercase tracking-widest hover:text-neon-green transition-colors ${selectedCategory === cat ? 'text-neon-green' : 'text-zinc-400'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-[0.2em]">Size</h4>
                <div className="grid grid-cols-3 gap-2">
                  {['All', ...sizes].map((size) => (
                    <button 
                      key={size} 
                      onClick={() => setSelectedSize(size)}
                      className={`border p-2 text-xs font-bold uppercase transition-all ${selectedSize === size ? 'bg-black text-white border-black' : 'border-zinc-200 text-zinc-400 hover:border-black hover:text-black'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Filter */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-[0.2em]">Sort By</h4>
                <div className="flex flex-col gap-2">
                  {['Featured', 'Popularity', 'Price: Low to High', 'Price: High to Low'].map((s) => (
                    <button 
                      key={s} 
                      onClick={() => setSortBy(s as any)}
                      className={`text-left text-sm font-bold uppercase tracking-widest hover:text-neon-green transition-colors ${sortBy === s ? 'text-neon-green' : 'text-zinc-400'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset */}
              <div className="flex items-end">
                <button 
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedSize('All');
                    setSortBy('Featured');
                    setSearchQuery('');
                  }}
                  className="text-xs font-black uppercase tracking-widest border-b-2 border-black pb-1 hover:text-red-500 hover:border-red-500 transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 text-zinc-300">No products found</h3>
          <p className="text-zinc-500 mb-8">Try adjusting your filters or search query.</p>
          <button 
            onClick={() => {
              setSelectedCategory('All');
              setSelectedSize('All');
              setSearchQuery('');
            }}
            className="btn-primary"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center font-black text-2xl uppercase tracking-widest animate-pulse">Loading Collection...</div>}>
      <ShopContent />
    </Suspense>
  );
}
