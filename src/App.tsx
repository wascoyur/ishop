import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/*<AppHeader />*/}
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="profile" element={<RedoUserProfileForm />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="products/edit-products" element={<AddProductForm />} />
        <Route
          path="products/product-card/:productId"
          element={<ProductCard />}
        />

        <Route path="create-product" element={<AddProductForm />} />
        <Route path="bucket" element={<PageBucket />} />
        <Route path="auth" element={<LoginPage />} />
        <Route path="register" element={<RegisterUser />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
