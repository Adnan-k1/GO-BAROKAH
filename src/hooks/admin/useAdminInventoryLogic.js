import { useState, useMemo, useRef, useEffect } from "react";
import { useAdminProducts } from "./useAdminProducts";

export const PER_PAGE = 10;

export const useAdminInventoryLogic = () => {
  const {
    products,
    categories,
    types,
    meta,
    criticalStockProducts,
    isLoading,
    actionLoading,
    filters,
    setFilters,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleToggleActive,
    handleAddCategory,
    handleAddType,
    handleEditCategory,
    handleEditType,
  } = useAdminProducts();

  const [search, setSearch] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [selected, setSelected] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const tableScrollRef = useRef(null);

  useEffect(() => {
    const el = tableScrollRef.current;
    if (!el) return;
    const onScroll = () => setIsScrolled(el.scrollTop > 40);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (tableScrollRef.current) {
      tableScrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [filters.page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextQuery = search.trim();
      setFilters((prev) => (
        prev.q === nextQuery && prev.page === 1
          ? prev
          : { ...prev, q: nextQuery, page: 1 }
      ));
    }, 400);

    return () => clearTimeout(timer);
  }, [search, setFilters]);

  const stats = useMemo(() => {
    return { needRestockProducts: criticalStockProducts };
  }, [criticalStockProducts]);

  const totalPages = meta?.totalPages || 1;
  const paginatedItems = products;

  const openModal = (mode, item = null) => {
    setSelected(item);
    setModalMode(mode);
  };

  const handleDeleteConfirm = () => {
    handleDelete(deleteModal.id);
    setDeleteModal({ isOpen: false, id: null });
  };

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const handleCatChange = (value) => {
    setFilters((prev) => {
      const currentIds = prev.category_id ? prev.category_id.split(",") : [];
      const nextIds = value === "all"
        ? []
        : currentIds.includes(String(value))
          ? currentIds.filter((id) => id !== String(value))
          : [...currentIds, String(value)];

      return {
        ...prev,
        category_id: nextIds.join(","),
        page: 1,
      };
    });
  };

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  return {
    products,
    categories,
    types,
    isLoading,
    actionLoading,
    search,
    activeCat: filters.category_id ? filters.category_id.split(",") : [],
    isMobileOpen,
    page: filters.page,
    modalMode,
    selected,
    isScrolled,
    deleteModal,
    tableScrollRef,
    stats,
    totalPages,
    paginatedItems,
    setPage: handlePageChange,
    openModal,
    handleDeleteConfirm,
    handleSearchChange,
    handleCatChange,
    handleCreate,
    handleUpdate,
    handleToggleActive,
    handleAddCategory,
    handleAddType,
    handleEditCategory,
    handleEditType,
    setModalMode,
    setDeleteModal,
    setIsMobileOpen,
  };
};
