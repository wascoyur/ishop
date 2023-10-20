import { Route, Routes } from "react-router-dom";
import { ErrorPage } from "./error-page.tsx";
import { AuthPage } from "./auth-page.tsx";
import { HomePage } from "./home-page.tsx";
import { RegisterForm } from "../widgets/UserProfile/RegisterForm.tsx";
import { ProductsPage } from "./products-page.tsx";
import { BucketPage } from "./bucket-page.tsx";

export function Routing() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="profile" element={<AuthPage />} />
      {/*<Route path="products" element={<ProductPage />} />*/}
      <Route path="products" element={<ProductsPage />} />
      {/*<Route*/}
      {/*  path="products/product-card/:productId"*/}
      {/*  element={<ProductCard />}*/}
      {/*/>*/}

      {/*<Route path="create-product" element={<AddProductForm />} />*/}
      <Route path="bucket" element={<BucketPage />} />
      {/*<Route path="auth" element={<LoginPage />} />*/}
      <Route path="register" element={<RegisterForm />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
