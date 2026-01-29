import type { Product } from '@/types';

export const categories = [
  { id: 'dermocosmetics', name: 'Dermocosmetics', description: 'Medical-grade skincare treatments' },
  { id: 'aesthetic', name: 'Aesthetic Procedures', description: 'Professional treatment care' },
  { id: 'post-treatment', name: 'Post-Treatment Care', description: 'Recovery and healing products' },
  { id: 'sun-care', name: 'Sun Protection', description: 'Medical SPF and photoprotection' },
] as const;

export const getProductsByCategory = (categoryId: string, products: Product[]) => {
  return products.filter((p) => p.category === categoryId);
};