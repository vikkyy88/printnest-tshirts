export type Category = 'Men' | 'Women' | 'Couples';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  sizes: string[];
  colors: string[];
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isTrending?: boolean;
  isSale?: boolean;
  discountPrice?: number;
}

export interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}
