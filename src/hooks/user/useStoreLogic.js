import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { productService } from "../../services/user/productService";
import { buildImageUrl } from "../../utils/imageUrl";

const PER_PAGE = 12;

const normalizeProduct = (product) => ({
  ...product,
  id: product._id || product.id,
  image_url: buildImageUrl(product.image_url || product.image || product.img),
});

const getCategory = (product) => {
  if (product.category && typeof product.category === "object") {
    return {
      id: product.category.id ?? product.category._id,
      name: product.category.name,
    };
  }

  if (product.categoryId || product.category_id) {
    return {
      id: product.categoryId ?? product.category_id,
      name: product.categoryName || product.category_name || "Kategori",
    };
  }

  return null;
};

const normalizeMeta = (meta, page) => ({
  page: Number(meta?.page) || page,
  limit: Number(meta?.limit) || PER_PAGE,
  total: Number(meta?.total) || 0,
  totalPages: Number(meta?.totalPages) || 1,
});

export const useStoreLogic = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
  const categoryIds = (searchParams.get("category_id") || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  const categoryKey = categoryIds.join(",");

  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ page, limit: PER_PAGE, total: 0, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const pagesRef = useRef(new Map());
  const metaByPageRef = useRef(new Map());
  const queryRef = useRef(null);
  const requestIdRef = useRef(0);

  const updateParams = useCallback((updates) => {
    setSearchParams((previousParams) => {
      const nextParams = new URLSearchParams(previousParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") {
          nextParams.delete(key);
        } else {
          nextParams.set(key, String(value));
        }
      });

      return nextParams;
    }, { replace: true });
  }, [setSearchParams]);

  useEffect(() => {
    const requestId = ++requestIdRef.current;
    const queryKey = `${q}|${categoryKey}`;
    const isNewQuery = queryRef.current !== queryKey;

    if (isNewQuery) {
      queryRef.current = queryKey;
      pagesRef.current.clear();
      metaByPageRef.current.clear();
      setProducts([]);
    }

    let isActive = true;

    const fetchRequiredPages = async () => {
      setIsLoading(true);

      try {
        for (let currentPage = 1; currentPage <= page; currentPage += 1) {
          if (pagesRef.current.has(currentPage)) continue;

          const response = await productService.getProducts({
            q: q || undefined,
            category_id: categoryKey || undefined,
            page: currentPage,
            limit: PER_PAGE,
          });

          if (!isActive || requestIdRef.current !== requestId) return;

          const rawData = response?.data ?? response ?? [];
          const pageProducts = Array.isArray(rawData) ? rawData.map(normalizeProduct) : [];
          pagesRef.current.set(currentPage, pageProducts);
          metaByPageRef.current.set(currentPage, normalizeMeta(response?.meta, currentPage));
        }

        if (!isActive || requestIdRef.current !== requestId) return;

        const loadedProducts = [];
        const productIds = new Set();

        for (let currentPage = 1; currentPage <= page; currentPage += 1) {
          const pageProducts = pagesRef.current.get(currentPage) || [];
          pageProducts.forEach((product) => {
            const productKey = String(product.id);
            if (!productIds.has(productKey)) {
              productIds.add(productKey);
              loadedProducts.push(product);
            }
          });
        }

        const currentMeta = metaByPageRef.current.get(page) || metaByPageRef.current.get(1);
        const loadedCategories = new Map();
        loadedProducts.forEach((product) => {
          const category = getCategory(product);
          if (category?.id !== undefined && category?.id !== null) {
            loadedCategories.set(String(category.id), category);
          }
        });

        setProducts(loadedProducts);
        setCategories([...loadedCategories.values()]);
        if (currentMeta) setMeta(currentMeta);
      } catch (err) {
        if (isActive && requestIdRef.current === requestId) {
          console.error("Gagal ambil produk:", err);
          setProducts([]);
        }
      } finally {
        if (isActive && requestIdRef.current === requestId) {
          setIsLoading(false);
        }
      }
    };

    fetchRequiredPages();

    return () => {
      isActive = false;
    };
  }, [categoryKey, page, q]);

  const handleLoadMore = useCallback(() => {
    if (isLoading || page >= meta.totalPages) return;
    updateParams({ page: page + 1 });
  }, [isLoading, meta.totalPages, page, updateParams]);

  const handleFilterChange = useCallback((category) => {
    const categoryId = String(category?.id ?? category?._id ?? category);
    const nextCategoryIds = categoryIds.includes(categoryId)
      ? categoryIds.filter((id) => id !== categoryId)
      : [...categoryIds, categoryId];

    updateParams({ category_id: nextCategoryIds.join(","), page: 1 });
  }, [categoryIds, updateParams]);

  const clearFilter = useCallback(() => {
    updateParams({ category_id: "", page: 1 });
  }, [updateParams]);

  const filteredData = products;

  return {
    filter: categoryIds,
    categories,
    isLoading,
    filteredData,
    totalCount: meta.total,
    currentPage: page,
    totalPages: meta.totalPages,
    q,
    handleLoadMore,
    handleFilterChange,
    clearFilter,
    refreshProducts: () => updateParams({ page: 1 }),
  };
};
