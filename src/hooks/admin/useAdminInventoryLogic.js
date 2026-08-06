import { useState, useMemo, useRef, useEffect } from "react";
import { useAdminProducts } from "./useAdminProducts";

export const PER_PAGE = 10;

export const useAdminInventoryLogic = () => {
  const {
    products,
    categories,
    types,
    isLoading,
    actionLoading,
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
  const [activeCat, setActiveCat] = useState("Semua");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [page, setPage] = useState(1);
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
  }, [page]);

  const stats = useMemo(() => {
    const needRestockProducts = products.filter((p) => (Number(p.stock) || 0) <= 10);
    const availableProducts = products.filter((p) => (Number(p.stock) || 0) > 10);
    return { needRestockProducts, availableProducts };
  }, [products]);

  const filteredProducts = useMemo(
    () =>
      products.filter((p) => {
        const pCategoryName = p.category?.name || p.category;
        return (
          (activeCat === "Semua" || pCategoryName === activeCat) &&
          p.name?.toLowerCase().includes(search.toLowerCase())
        );
      }),
    [products, activeCat, search],
  );

  const totalPages = Math.ceil(filteredProducts.length / PER_PAGE) || 1;
  const paginatedItems = filteredProducts.slice((page - 1) * PER_PAGE, page * PER_PAGE);

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
    setPage(1);
  };

  const handleCatChange = (value) => {
    setActiveCat(value);
    setPage(1);
  };

  return {
    products,
    categories,
    types,
    isLoading,
    actionLoading,
    search,
    activeCat,
    isMobileOpen,
    page,
    modalMode,
    selected,
    isScrolled,
    deleteModal,
    tableScrollRef,
    stats,
    filteredProducts,
    paginatedItems,
    totalPages,
    setPage,
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
