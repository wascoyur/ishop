import { Route, Routes } from "react-router-dom";
import { ErrorPage } from "./error-page.tsx";

export function Routing() {
  return (
    <Routes>
      <Route index element={<ErrorPage />} />
      {/*<Route path="profile" element={<RedoUserProfileForm />} />*/}
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
      {/*<Route path="*" element={<ErrorPage />} />*/}
    </Routes>
  );
}
