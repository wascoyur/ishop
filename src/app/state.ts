import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { Profile } from "../entities/typesUser.ts";
import { BucketItem, Category, Product } from "../entities/types.ts";

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
    ),
    { name: "Profile" },
  ),
);

type ProductStore = {
  products: Array<Product> | null;
  bucket: Array<BucketItem> | null;
  categories: Array<Category> | null;
};
type ProductActions = {
  addToBucket: (bucketItem: BucketItem) => void;
  getProductById: (idProduct: string) => Product | undefined;
  addProductToStore: (product: Product[]) => void;
  getBucket: () => BucketItem[] | null;
  removeItemBucketById: (bucketId: string) => void;
  removeProductById: (productId: string) => void;
  setCategories: (arg0: Array<Category>) => void;
  getCategoryById: (arg0: string) => void;
};
export const useProductStore = create(
  devtools(
    persist(
      immer<ProductStore & ProductActions>((set, get) => ({
        products: null,
        bucket: null,
        categories: null,
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
        setCategories: (categories: Category[]) =>
          set((state) => {
            const currentCat = state.categories || new Array<Category>();
            const newCat: Category[] = Array.from(
              new Set(
                [...currentCat, ...categories].map((c) => JSON.stringify(c)),
              ),
            ).map((str) => JSON.parse(str));
            state.categories = newCat;
          }),
        getCategoryById: (categoryId: string) => {
          const filteredCategory = () =>
            get().categories?.find((c) => c.id === categoryId);
          return get().categories?.length ? filteredCategory() : undefined;
        },
      })),
      {
        name: `Product`,
        partialize: (state) => ({
          bucket: state.bucket,
        }),
      },
    ),
    {
      name: "Product",
    },
  ),
);

export const useRawProduct = create();
