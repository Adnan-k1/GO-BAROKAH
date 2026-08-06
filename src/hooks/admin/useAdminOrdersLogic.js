import { useState, useMemo, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAdminOrders } from "./useAdminOrders";

export const PER_PAGE = 10;

export const TABS = [
  "Semua",
  "Menunggu",
  "Disiapkan",
  "Dapat Diambil",
  "Dikirim",
  "Selesai",
  "Dibatalkan",
];

export const getModalContent = (confirmAction) => {
  if (!confirmAction) return {};
  const { order, status } = confirmAction;

  switch (status) {
    case "Disiapkan":
      return {
        title: "Proses Pesanan?",
        message: `Yakin mau mulai memproses pesanan dari ${order.customer_name}?`,
        btnText: "Ya, Proses",
        variant: "primary",
      };
    case "Dapat Diambil":
      return {
        title: "Tandai Siap Diambil?",
        message: `Pesanan milik ${order.customer_name} sudah siap. Pelanggan akan diberitahu untuk mengambil pesanan di toko.`,
        btnText: "Ya, Siap Diambil",
        variant: "primary",
      };
    case "Dikirim":
      return {
        title: "Kirim Pesanan?",
        message: `Tandai pesanan sedang dalam pengiriman kurir?`,
        btnText: "Ya, Kirim",
        variant: "primary",
      };
    case "Selesai":
      return {
        title: "Selesaikan Pesanan?",
        message: `Pastikan pesanan benar-benar sudah diterima ${order.customer_name}. Selesaikan sekarang?`,
        btnText: "Ya, Selesai",
        variant: "primary",
      };
    case "Menunggu":
      return {
        title: "Kembalikan Status?",
        message: `Yakin mau mengembalikan pesanan ke status Menunggu?`,
        btnText: "Ya, Kembalikan",
        variant: "primary",
      };
    case "Dibatalkan":
      return {
        title: "Batalkan Pesanan?",
        message: `Kamu yakin mau membatalkan pesanan dari ${order.customer_name}?`,
        btnText: "Ya, Batalkan",
        variant: "danger",
      };
    default:
      return {
        title: "Update Status",
        message: "Yakin melanjutkan aksi ini?",
        btnText: "Lanjut",
        variant: "primary",
      };
  }
};

export const useAdminOrdersLogic = () => {
  const location = useLocation();
  const { orders, isLoading, handleUpdateStatus } = useAdminOrders();

  const [search, setSearch] = useState(location.state?.searchId || "");
  const [activeTab, setActiveTab] = useState("Semua");
  const [page, setPage] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchTab = activeTab === "Semua" || o.status === activeTab;
      const matchSearch =
        o.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
        o.id.toString().includes(search) ||
        o.order_number?.toLowerCase().includes(search.toLowerCase());
      return matchTab && matchSearch;
    });
  }, [orders, activeTab, search]);

  const totalPages = Math.ceil(filteredOrders.length / PER_PAGE) || 1;
  const paginatedItems = filteredOrders.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE,
  );

  const stats = useMemo(
    () => ({
      total: orders.length,
      pending: orders.filter((o) => o.status === "Menunggu").length,
      processing: orders.filter((o) => o.status === "Disiapkan").length,
      ready: orders.filter((o) => o.status === "Dapat Diambil").length,
      shipping: orders.filter((o) => o.status === "Dikirim").length,
      finished: orders.filter((o) => o.status === "Selesai").length,
    }),
    [orders],
  );

  const openDetail = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  const handleConfirm = () => {
    handleUpdateStatus(confirmAction.order.id, confirmAction.status);
    setConfirmAction(null);
  };

  return {
    orders,
    isLoading,
    search,
    activeTab,
    page,
    isScrolled,
    selectedOrder,
    isModalOpen,
    confirmAction,
    isMobileOpen,
    tableScrollRef,
    filteredOrders,
    paginatedItems,
    totalPages,
    stats,
    modalContent: getModalContent(confirmAction),
    setPage,
    openDetail,
    handleSearchChange,
    handleTabChange,
    handleConfirm,
    setConfirmAction,
    setIsModalOpen,
    setIsMobileOpen,
  };
};
