// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useProductStore } from "../../app/state.ts";
// import Loader from "../loader/Loader.tsx";
//
// export const ProductCard = (props: { id?: number }) => {
//   const { productId } = useParams();
//   const [loading, setLoading] = useState<boolean>(true); // Изначально устанавливаем loading в true
//   const getProductById = useProductStore((state) => state.getProductById);
//
//   const product = getProductById(parseInt(productId));
//   const { desc, name, category } = product || {}; // Добавляем проверку на существование product
//
//   useEffect(() => {
//     if (product) {
//       setLoading(false); // Если product существует, устанавливаем loading в false
//     }
//   }, [product]);
//
//   const Title = () => {
//     return <div className="product-card-title">{name}</div>;
//   };
//   const Description = () => {
//     return (
//       <div className="product-card-description">
//         {desc || `Description Product`}
//       </div>
//     );
//   };
//
//   const Category = () => {
//     return <div className="product-card-category">{category?.name || ""}</div>; // Добавляем проверку на существование category и name
//   };
//
//   const ProductCardField = (props: {
//     name: string | React.ReactNode;
//     value: number | string;
//   }) => {
//     return (
//       <div className="product-card-fee">
//         <div className="product-card-name">{props.name}</div>
//         <div className="product-card-value">{props.value}р.</div>
//       </div>
//     );
//   };
//   return (
//     <div className="product-card">
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <Title />
//           <ProductImage img_url={product.photo} />
//           <div className="product-info-wrapper">
//             <Category />
//             <Description />
//             <ProductCardField name={`Цена за шт.`} value={product.price} />
//             <div className="in-cart-wrapper">
//               <InCartButton productId={parseInt(productId) || props.id} />
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };
//
// export const ProductImage = (props: { img_url: string }) => {
//   return (
//     <div className="product-image">
//       <img src={props.img_url} alt={"product"} />
//     </div>
//   );
// };
