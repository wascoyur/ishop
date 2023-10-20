import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { Profile } from "../entities/User.ts";
import { BucketItem, Product } from "../entities/types.ts";

type ProfileState = {
  token: string | null;
  user: Profile | null;
};
type ProfileAction = {
  setToken: (token: ProfileState["token"]) => void;
  clearToken: () => void;
  isUserAuth: () => boolean;
  editUser: (user: ProfileState["user"]) => void;
};
export const useProfileStore = create(
  devtools(
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
              state.user.name = user.name || "";
              state.user.id = user.id;
              state.user.signUpDate = user.signUpDate;
            });
        },
      })),
      {
        name: `token`,
        partialize: (state) => ({
          token: state.token,
        }),
      },
    ) /*,
    { name: "Profile" },*/,
  ),
);

type ProductStore = {
  products: Array<Product> | null;
  bucket: Array<BucketItem> | null;
};
type ProductActions = {
  addToBucket: (bucketItem: BucketItem) => void;
  getProductById: (idProduct: string) => Product | undefined;
  addProductToStore: (product: Product[]) => void;
  getBucket: () => BucketItem[] | null;
  removeItemBucketById: (bucketId: string) => void;
  removeProductById: (productId: string) => void;
};
export const useProductStore = create(
  devtools(
    persist(
      immer<ProductStore & ProductActions>((set, get) => ({
        products: null,
        bucket: null,
        addProductToStore: (product: Product[]) =>
          set((state) => {
            const currentProducts = state.products || [];
            state.products = [...currentProducts, ...product];
          }),
        addToBucket: (bucketItem: BucketItem) =>
          set((state) => {
            const currentBucket = state.bucket || [];
            state.bucket = [...currentBucket, bucketItem];
          }),
        getProductById: (idProduct: string) => {
          const filteredItem = () =>
            get().products?.find((p) => p.id === idProduct);
          return get().products?.length ? filteredItem() : undefined;
        },
        getBucket: () => {
          return get().bucket;
        },
        removeItemBucketById: (bucketId: string) =>
          set((state) => {
            const newBucket = get().bucket?.filter(
              (item) => item.productId !== bucketId,
            );
            state.bucket = newBucket || state.bucket;
          }),
        removeProductById: (productId: string) =>
          set((state) => {
            const newBucket = get().bucket?.filter(
              (item) => item.productId !== productId,
            );
            state.bucket = newBucket || state.bucket;
          }),
      })),
      {
        name: `Product`,
        partialize: (state) => ({
          bucket: state.bucket,
        }),
      },
    ) /*,
    {
      name: "Product",
    },*/,
  ),
);

type RawProduct = {
  rawProduct: {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
  };
  setRawProduct: (p: RawProduct["rawProduct"]) => void;
  getRawProductById: (id: number) => RawProduct["rawProduct"];
};
export const useRawProduct = create();
