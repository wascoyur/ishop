import { Route, Routes } from "react-router-dom";
import { ErrorPage } from "./error-page.tsx";
import { AuthPage } from "./auth-page.tsx";
import { HomePage } from "./home-page.tsx";

export function Routing() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="profile" element={<AuthPage />} />
      {/*<Route path="products" element={<ProductPage />} />*/}
      {/*<Route path="products/edit-products" element={<AddProductForm />} />*/}
      {/*<Route*/}
      {/*  path="products/product-card/:productId"*/}
      {/*  element={<ProductCard />}*/}
      {/*/>*/}

      {/*<Route path="create-product" element={<AddProductForm />} />*/}
      {/*<Route path="bucket" element={<PageBucket />} />*/}
      {/*<Route path="auth" element={<LoginPage />} />*/}
      {/*<Route path="register" element={<RegisterUser />} />*/}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
