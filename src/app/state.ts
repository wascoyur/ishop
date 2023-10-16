import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
// import { ApiResponseProduct, TypeProduct } from "src/types/typeProduct";
// import { BucketItem } from "src/types/typeStore";
import { persist } from "zustand/middleware";
import { Profile } from "../entities/User.ts";

// type ProductState = {
//   rawProducts: Array<ApiResponseProduct>;
//   bucket: Array<BucketItem>;
//   products: Array<TypeProduct>;
// };
// type Action = {
//   clearTokens: () => void;
//   setRawProducts: (arr: ProductState["rawProducts"]) => void;
//
//   setBucket: (product: BucketItem) => void;
//   getProductById: (idProduct: number) => TypeProduct;
//   setProducts: (products: Array<TypeProduct>) => void;
//   getBucket: () => { product: TypeProduct; count: number }[];
//   removeItemBucketById: (id: number) => void;
// };
// export const useStore = create(
//   persist(
//     immer<ProductState & Action>((set, get) => ({
//       rawProducts: null,
//       bucket: null,
//       products: null,
//       setTokenUser: (newToken: string) => set(() => ({ tokenUser: newToken })),
//       setTokenAdmin: (newTokenAdm: string) =>
//         set(() => ({ tokenAdmin: newTokenAdm })),
//
//       isUserAuth: () => {
//         return Boolean(
//           (get().tokenUser || get().tokenAdmin) &&
//             Boolean(get().loggedUser?.id),
//         );
//       },
//       setRawProducts: (arr: Array<ApiResponseProduct>) =>
//         set(() => ({ rawProducts: arr })),
//       setExternalUser: (user: ExternalUserProfile) =>
//         set(() => ({ userExternal: user })),
//       setLoggedUser: (user: userProfile) =>
//         set((state) => {
//           if (!state.loggedUser) state.loggedUser = user;
//         }),
//       editLoggedUser: (user: userProfile) => {
//         set((state) => {
//           state.loggedUser.username = user.username;
//           state.loggedUser.about = user.about;
//         });
//       },
//       setBucket: (bucketItem: BucketItem) =>
//         set((state) => {
//           if (!get().bucket) {
//             state.bucket = new Array(bucketItem);
//             return;
//           }
//           const exsistingProductIndex = get().bucket.findIndex(
//             (item) => item.productId === bucketItem.productId,
//           );
//           if (exsistingProductIndex !== -1) {
//             // Если продукт с таким productId уже существует, увеличиваем его count
//             state.bucket[exsistingProductIndex].count =
//               get().bucket[exsistingProductIndex].count + bucketItem.count;
//           } else {
//             // Если продукта с таким productId нет, добавляем его в коллекцию
//             state.bucket.push(bucketItem);
//           }
//         }),
//       setProducts: (products: Array<TypeProduct>) =>
//         set((state) => {
//           const currentState = state?.products || new Array<TypeProduct>();
//           state.products = [...currentState, ...products];
//         }),
//       getProductById: (id: number) => {
//         const allProducts = get().products || new Array<TypeProduct>();
//         return allProducts.filter((p) => p.id == id)[0];
//       },
//       getBucket: () => {
//         const bucket = get()?.bucket || [];
//         const products = bucket.map((p) => {
//           return { product: get().getProductById(p.productId), count: p.count };
//         });
//         return products;
//       },
//       removeItemBucketById: (id: number) =>
//         set((state) => {
//           const newBucket: BucketItem[] = state.bucket.filter(
//             (i) => i.productId !== id,
//           );
//           state.bucket = newBucket;
//         }),
//     })),
//     {
//       name: `tokens`,
//       partialize: (state) => ({
//         bucket: state.bucket,
//       }),
//     },
//   ),
// );

type ProfileState = {
  token: string | null;
  user: Profile | null;
};
type ProfileAction = {
  setToken: (token: ProfileState["token"]) => void;
  clearToken: () => void;
  isUserAuth: () => boolean;
  editUser: (user: ProfileState["user"]) => void;
  getProfile: () => ProfileState["user"];
};
export const useProfileStore = create(
  persist(
    immer<ProfileState & ProfileAction>((set, get) => ({
      token: null,
      user: null,
      setToken: (newToken: string | null) => set(() => ({ token: newToken })),
      clearToken: () =>
        set(() => ({
          token: null,
        })),
      isUserAuth: () => {
        return Boolean(get().token);
      },
      editUser: (user: Profile | null) => {
        if (user !== null)
          set((state) => {
            if (!state.user) state.user = {} as Profile;
            state.user.username = user.username || "";
            state.user.about = user.about;
          });
      },
      getProfile: () => {
        state.user;
      },
    })),
    {
      name: `token`,
      partialize: (state) => ({
        token: state.token,
      }),
    },
  ),
);
