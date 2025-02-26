export interface IProduct {
  sold: number;
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  images: string[];
  category: Category;
  brand: Category;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  title: string;
}
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}
