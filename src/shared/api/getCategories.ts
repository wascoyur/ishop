import { useProductStore, useProfileStore } from "../../app/state.ts";
import { useEffect, useState } from "react";
import {
  Category,
  ErrorCode,
  Pagination,
  ServerErrors,
  Sorting,
} from "../../entities/types.ts";

export const getCategories = async (
  token: string | null,
): Promise<ApiCategoriesResponse | ServerErrors> => {
  const GET_CATEGORIES = `https://19429ba06ff2.vps.myjino.ru/api/categories`;

  try {
    const categories = await fetch(GET_CATEGORIES, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    });
    if (categories.ok) {
      const { data, sorting, pagination } =
        (await categories.json()) as unknown as ApiCategoriesResponse;
      return { data, sorting, pagination };
    } else {
      const resp = (await categories.json()) as unknown as ServerErrors;
      return { errors: resp.errors };
    }
  } catch (e) {
    console.error(e);
    return {
      errors: [
        {
          message: "Network error",
          name: "network error",
          fieldName: "network error",
          extensions: { code: ErrorCode.ERR_NETWORK_ERROR },
          stack: e as string,
        },
      ],
    };
  }
};

export const useFetchCategories = () => {
  const token = useProfileStore((state) => state.token);
  const setCategories = useProductStore((state) => state.setCategories);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ServerErrors | undefined>();
  useEffect(() => {
    async function getCategoriesWrapper() {
      try {
        setLoading(true);
        const result = await getCategories(token);

        if ("data" in result) {
          const data = await result.data;
          setCategories(data);
        } else if ("errors" in result) {
          setErrors(result as ServerErrors);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    const res = getCategoriesWrapper();
  }, [token]);
  return { loading, errors };
};

interface ApiCategoriesResponse {
  data: Category[];
  sorting: Sorting;
  pagination: Pagination;
}
