import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { Profile } from "../entities/typesUser.ts";
import {
  BucketItem,
  Category,
  Product,
  ServerErrors,
} from "../entities/types.ts";

type ProfileState = {
  token: string | undefined;
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
        token: undefined,
        user: null,
        setToken: (newToken: string | undefined) =>
          set(() => ({ token: newToken })),
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
  categories: Array<Category> | undefined;
};
type ProductActions = {
  addToBucket: (bucketItem: BucketItem) => void;
  getProductById: (idProduct: string) => Product | undefined;
  addProductToStore: (product: Product[]) => void;
  getBucket: () => BucketItem[] | null;
  removeItemBucketById: (bucketId: string) => void;
  removeProductById: (productId: string) => void;
  setCategories: (arg0: Array<Category>) => void;
  getCategoryById: (arg0: string) => Category | undefined;
  removeCategoryById: (arg0: string) => void;
};
export const useProductStore = create(
  devtools(
    immer<ProductStore & ProductActions>((set, get) => ({
      products: null,
      bucket: null,
      categories: undefined,
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
      removeCategoryById: (categoryId: string) =>
        set((state) => {
          state.categories = state.categories?.filter(
            (item) => item.id !== categoryId,
          );
        }),
    })),

    {
      name: "Product",
      anonymousActionType: "Product",
    },
  ),
);

type ErrorStore = {
  errors: ServerErrors | undefined;
};
type ErrorActions = {
  setError: (arg0: ServerErrors) => void;
  clearErrors: () => void;
};
export const useErrorStore = create(
  devtools(
    immer<ErrorStore & ErrorActions>((set) => ({
      errors: undefined,
      setError: (err: ServerErrors) =>
        set((state) => {
          state.errors = err;
        }),
      clearErrors: () => {
        set(() => ({
          errors: undefined,
        }));
      },
    })),
    { name: "errors", anonymousActionType: "errors" },
  ),
);
