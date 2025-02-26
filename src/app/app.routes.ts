import { Routes } from '@angular/router';
import { HomeComponent } from './features/pages/home/home.component';
import { CartComponent } from './features/pages/cart/cart.component';
import { CategoriesComponent } from './features/pages/categories/categories.component';
import { ProductsComponent } from './features/pages/products/products.component';
import { BrandsComponent } from './features/pages/brands/brands.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { NotfoundComponent } from './features/layout/notfound/notfound.component';
import { authGuard } from './core/guards/auth-gurad/auth.guard';
import { ProductDetailsComponent } from './features/pages/product-details/product-details.component';
import { ForgotpasswordComponent } from './features/auth/forgotpassword/forgotpassword.component';
import { BrandsDetailsComponent } from './features/pages/brands-details/brands-details.component';
import { WishlistComponent } from './features/pages/wishlist/wishlist.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    title: 'Home',
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [authGuard],
    title: 'Cart',
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [authGuard],
    title: 'Categories',
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [authGuard],
    title: 'Products',
  },
  {
    path: 'brands',
    component: BrandsComponent,
    canActivate: [authGuard],
    title: 'Brands',
  },
  {
    path: 'product-details/:productId',
    component: ProductDetailsComponent,
    canActivate: [authGuard],
    title: 'productDetails',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'LogIn',
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent,
    title: 'ForgotPassword',
  },
  {
    path: 'brand',
    component: BrandsComponent,
    title: 'Brand',
  },
  {
    path: 'brandsdetails/:brandId',
    component: BrandsDetailsComponent,
    title: 'Brand-Details',
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    title: 'WishList',
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];
