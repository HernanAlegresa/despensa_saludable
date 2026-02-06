// ============================================
// DESPENSA NATURAL — Data entry point
// ============================================

export { categories, getCategoryBySlug, getCategoryById } from "./categories";
export {
  collections,
  getCollectionBySlug,
  getCollectionById,
} from "./collections";
export {
  products,
  getAllProducts,
  getProductBySlug,
  getFeaturedProducts,
  getProductsByCategory,
  getProductsByCollection,
} from "./products";
