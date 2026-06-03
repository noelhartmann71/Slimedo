import { axiosSecure } from "@/hooks/useAxiosSecure";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ChevronDown,
  Loader2,
  Download,
  PackageCheck,
  Truck,
  Send,
  Search,
  Filter,
  X,
  Calendar,
} from "lucide-react";
import { useState } from "react";

type PharmacyProfile = {
  id: number;
  name: string;
  email: string;
  phone: string;
  category: string;
  type: string;
  street: string;
  house: string;
  city: string;
  postal: string;
  country: string;
  longitude: string;
  latitude: string;
};

type DashboardOverview = {
  total_cases: number;
  open_cases: number;
  completed_cases: number;
  cancelled_cases: number;
  shipping_cases: number;
  pickup_cases: number;
};

type DashboardFilters = {
  applied: {
    search: string;
    order_status: string | null;
    payment_status: string | null;
    fulfillment_type: string | null;
    date_from: string | null;
    date_to: string | null;
  };
  available: {
    order_status: string[];
    payment_status: string[];
    fulfillment_type: string[];
  };
};

type DashboardExportLinks = {
  csv_filtered: string;
  csv_all: string;
  note: string;
};

type DashboardOrder = {
  pharmacy_payment_status: string;
  id: number;
  order_id: string;
  prescription_id: number;
  date: string;
  current_status: string;
  status_bucket: string;
  fulfillment_type: string;
  payment_status: string;
  prescription_fee_paid: boolean;
  medication_payment_completed: boolean;
  shipping_confirmed: boolean;
  pickup_confirmed: boolean;
  shipping_confirmation_sent: boolean;
  payment_link_resent: boolean;
  prescription_pdf_download_url: string | null;
  amounts: {
    medication_price: string | null;
    prescription_fee: string | null;
    shipping_amount: string | null;
    due_amount: string | null;
    remaining_amount: string | null;
    total_amount: string | null;
  };
  patient: {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    address: string | null;
  };
  product: {
    id: number;
    name: string;
    category: string;
    price: string;
  };
  pharmacy: {
    id: number;
    name: string;
    email: string;
    phone: string;
    type: string;
    address: string;
  };
  payment: {
    id: number | null;
    status: string | null;
    amount: string | null;
    currency: string | null;
    paid_at: string | null;
  };
  delivery_status: string;
};

type DashboardPagination = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
};

type PharmacyDashboardResponse = {
  status: number;
  message: string;
  data: {
    pharmacy: PharmacyProfile;
    overview: DashboardOverview;
    filters: DashboardFilters;
    export: DashboardExportLinks;
    orders: DashboardOrder[];
  };
  pagination: DashboardPagination;
};

function normalizeLabel(value: string) {
  if (!value) return "N/A";
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function statusBadgeClass(status: string) {
  const s = status?.toLowerCase();
  if (s === "pending")
    return "bg-amber-100 text-amber-700 ring-1 ring-amber-200";
  if (s === "processing" || s === "running")
    return "bg-blue-100 text-blue-700 ring-1 ring-blue-200";
  if (s === "completed" || s === "delivered")
    return "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200";
  if (s === "cancelled") return "bg-red-100 text-red-700 ring-1 ring-red-200";
  return "bg-gray-100 text-gray-500 ring-1 ring-gray-200";
}

function paymentBadgeClass(status: string) {
  const s = status?.toLowerCase();
  if (s === "paid" || s === "approved")
    return "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200";
  if (s === "pending")
    return "bg-amber-100 text-amber-700 ring-1 ring-amber-200";
  if (s === "unpaid" || s === "rejected")
    return "bg-red-100 text-red-700 ring-1 ring-red-200";
  if (s === "partial") return "bg-blue-100 text-blue-700 ring-1 ring-blue-200";
  return "bg-gray-100 text-gray-500 ring-1 ring-gray-200";
}

function paymentDotClass(status: string) {
  const s = status?.toLowerCase();
  if (s === "paid" || s === "approved") return "bg-emerald-500";
  if (s === "pending") return "bg-amber-400";
  if (s === "unpaid" || s === "rejected") return "bg-red-500";
  if (s === "partial") return "bg-blue-500";
  return "bg-gray-400";
}

function formatAmount(value: string | null) {
  if (!value) return "—";
  const amount = Number(value);
  if (Number.isNaN(amount)) return value;
  return amount.toLocaleString();
}

// ── Small boolean tag pill ──────────────────────────────────────────────────

const ORDER_STATUSES = [
  "Pending",
  "Delivered",
  "Completed",
  "Running",
  "Cancelled",
];

export default function PharmacyOverviewPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const [openStatusPopovers, setOpenStatusPopovers] = useState<
    Record<number, boolean>
  >({});

  // Filter state
  const [filters, setFilters] = useState({
    search: "",
    order_status: "",
    payment_status: "",
    fulfillment_type: "",
    date_from: "",
    date_to: "",
  });

  const { data, isLoading, isError, refetch } =
    useQuery<PharmacyDashboardResponse>({
      queryKey: ["pharmacyDashboardData", currentPage, filters],
      queryFn: async () => {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          ...Object.fromEntries(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            Object.entries(filters).filter(([_, v]) => v !== ""),
          ),
        });
        const response = await axiosSecure.get(
          `/pharmacy/dashboard?${params.toString()}`,
        );
        return response.data as PharmacyDashboardResponse;
      },
    });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      order_status: "",
      payment_status: "",
      fulfillment_type: "",
      date_from: "",
      date_to: "",
    });
    setCurrentPage(1);
  };

  // This is the mutation for updating order status
  const { mutate: updateStatus, isPending: isUpdating } = useMutation({
    mutationFn: async ({
      orderId,
      delivery_status,
    }: {
      orderId: string | number;
      delivery_status: string;
    }) => {
      const response = await axiosSecure.post(
        `/pharmacy/order/update-status/${orderId}`,
        { delivery_status: delivery_status.toLowerCase() },
      );
      return response.data;
    },
    onSuccess: (res) => {
      toast.success(res?.message || "Order status updated successfully");
      refetch();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update status");
    },
  });

  // This is the update payment status
  useMutation({
    mutationFn: async ({
      orderId,
      payment_status,
    }: {
      orderId: string | number;
      payment_status: string;
    }) => {
      const response = await axiosSecure.post(
        `/pharmacy/order/update-status/${orderId}`,
        { payment_status: payment_status.toLowerCase() },
      );
      return response.data;
    },
    onSuccess: (res) => {
      toast.success(res?.message || "Payment status updated successfully");
      refetch();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "Failed to update payment status",
      );
    },
  });
  // This is the update payment status

  const [updatingOrderId, setUpdatingOrderId] = useState<
    string | number | null
  >(null);

  const [lastActionOrderId, setLastActionOrderId] = useState<
    string | number | null
  >(null);
  const [activeAction, setActiveAction] = useState<string | null>(null);

  // This is the mutation for confirming pickup, confirming shipping, and resending payment link
  const { mutate: performAction, isPending: isActionPending } = useMutation({
    mutationFn: async ({
      orderId,
      action,
    }: {
      orderId: string | number;
      action: "pickup" | "shipping" | "resend_payment";
    }) => {
      let endpoint = "";
      if (action === "pickup")
        endpoint = `/pharmacy/orders/${orderId}/confirm-pickup`;
      if (action === "shipping")
        endpoint = `/pharmacy/orders/${orderId}/confirm-shipping`;
      if (action === "resend_payment")
        endpoint = `/pharmacy/orders/${orderId}/resend-payment-link`;

      const response = await axiosSecure.post(endpoint);
      return response.data;
    },
    onSuccess: (res) => {
      toast.success(res?.message || "Action performed successfully");
      refetch();
      setActiveAction(null);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Action failed");
      setActiveAction(null);
    },
  });

  const { mutate: exportOrders, isPending: isExporting } = useMutation({
    mutationFn: async () => {
      const response = await axiosSecure.get("/pharmacy/export", {
        responseType: "blob",
      });
      return response.data;
    },
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `orders_export_${new Date().getTime()}.csv`,
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Orders exported successfully");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to export orders");
    },
  });

  const dashboardData = data?.data;
  const overviewData = dashboardData?.overview;
  const pharmacyData = dashboardData?.pharmacy;
  const apiFilters = dashboardData?.filters;
  const exportLinksData = dashboardData?.export;
  const ordersData = dashboardData?.orders ?? [];
  const paginationData = data?.pagination;

  const metricCards = [
    {
      label: "Total Cases",
      value: overviewData?.total_cases ?? 0,
      cardClass: "border-[#DBE7E4] bg-[#F7FBFA]",
      valueClass: "text-[#1B433B]",
    },
    {
      label: "Open Cases",
      value: overviewData?.open_cases ?? 0,
      cardClass: "border-[#F7DFC2] bg-[#FFF8EE]",
      valueClass: "text-[#B45309]",
    },
    {
      label: "Completed Cases",
      value: overviewData?.completed_cases ?? 0,
      cardClass: "border-[#D5F0DD] bg-[#F1FCF4]",
      valueClass: "text-[#15803D]",
    },
    {
      label: "Cancelled Cases",
      value: overviewData?.cancelled_cases ?? 0,
      cardClass: "border-[#F2D3D3] bg-[#FEF4F4]",
      valueClass: "text-[#B91C1C]",
    },
    {
      label: "Shipping Cases",
      value: overviewData?.shipping_cases ?? 0,
      cardClass: "border-[#D6E5FF] bg-[#F3F8FF]",
      valueClass: "text-[#1D4ED8]",
    },
    {
      label: "Pickup Cases",
      value: overviewData?.pickup_cases ?? 0,
      cardClass: "border-[#E7D5FF] bg-[#FAF5FF]",
      valueClass: "text-[#7E22CE]",
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <div className="h-4 w-32 rounded bg-gray-200" />
              <div className="h-8 w-64 rounded bg-gray-200" />
              <div className="h-4 w-48 rounded bg-gray-200" />
            </div>
            <div className="h-24 w-full max-w-md rounded-xl bg-gray-200 lg:w-96" />
          </div>
        </div>

        {/* Metric Cards Skeleton */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3"
            >
              <div className="h-4 w-24 rounded bg-gray-100" />
              <div className="h-10 w-16 rounded bg-gray-100" />
            </div>
          ))}
        </div>

        {/* Table Skeleton */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-7 w-32 rounded bg-gray-200" />
            <div className="h-4 w-64 rounded bg-gray-200" />
          </div>
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
            <div className="h-12 border-b border-gray-50 bg-gray-50/50" />
            <div className="p-5 space-y-4">
              {[1, 2, 3, 4, 5].map((row) => (
                <div key={row} className="flex gap-4">
                  <div className="h-12 flex-1 rounded bg-gray-50" />
                  <div className="h-12 flex-1 rounded bg-gray-50" />
                  <div className="h-12 flex-1 rounded bg-gray-50" />
                  <div className="h-12 flex-1 rounded bg-gray-50" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filterOptions = apiFilters?.available;

  if (
    isError ||
    !dashboardData ||
    !pharmacyData ||
    !overviewData ||
    !apiFilters ||
    !exportLinksData
  ) {
    return (
      <div className="rounded-xl border border-[#F1D7D7] bg-[#FFF8F8] p-6 text-[#B42318]">
        Failed to load pharmacy dashboard data.
      </div>
    );
  }

  const activeCurrentPage = paginationData?.current_page ?? 1;
  const lastPage = paginationData?.last_page ?? 1;

  // Build page numbers with ellipsis
  const pageNumbers = Array.from({ length: lastPage }, (_, i) => i + 1)
    .filter(
      (p) => p === 1 || p === lastPage || Math.abs(p - activeCurrentPage) <= 1,
    )
    .reduce<(number | "…")[]>((acc, p, idx, arr) => {
      if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1)
        acc.push("…");
      acc.push(p);
      return acc;
    }, []);

  return (
    <div className="space-y-8">
      {/* ── Pharmacy header banner ── unchanged ─────────────────────────────── */}
      <div className="rounded-2xl border border-[#DBE7E4] bg-linear-to-r from-[#F5FAF8] to-[#EFF6F4] p-5 md:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-[#5B6C66]">
              Dashboard Status
            </p>
            <h2 className="mt-1 text-[24px] font-semibold text-[#162D28]">
              {data.message}
            </h2>
            <p className="mt-2 text-sm text-[#5B6C66]">
              Pharmacy: {pharmacyData.name} ({pharmacyData.type})
            </p>
          </div>
          <div className="rounded-xl border border-[#DBE7E4] bg-white px-4 py-3 text-sm text-[#3D4C48]">
            <p>
              Address: {pharmacyData.street}, {pharmacyData.house},{" "}
              {pharmacyData.city}, {pharmacyData.postal}, {pharmacyData.country}
            </p>
            <p className="mt-1">
              Contact: {pharmacyData.email} | {pharmacyData.phone}
            </p>
            <p className="mt-1">
              Category: {pharmacyData.category} | Coordinates:{" "}
              {pharmacyData.latitude}, {pharmacyData.longitude}
            </p>
          </div>
        </div>
      </div>

      {/* ── Metric cards ── unchanged ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {metricCards.map((card) => (
          <div
            key={card.label}
            className={`rounded-2xl border p-5 shadow-sm ${card.cardClass}`}
          >
            <p className="text-sm font-medium text-[#5B6C66]">{card.label}</p>
            <p className={`mt-3 text-3xl font-bold ${card.valueClass}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* ── Orders section ─────────────────────────────────────────────────── */}
      <div className="space-y-4">
        {/* Section heading — unchanged */}
        <div className="flex flex-row justify-between gap-1 items-center">
          <div>
            <h2 className="text-[22px] font-bold text-black">Orders</h2>
            <p className="text-sm font-normal text-[#6C7278]">
              View all pharmacy orders from the dashboard API response.
            </p>
          </div>
          {/* Export Buttons */}
          <div className="flex items-center gap-3">
            {/* <a
              href={exportLinksData?.csv_filtered}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#DBE7E4] bg-white px-4 text-[13px] font-medium text-[#1B433B] transition-all hover:border-[#4A8E83] hover:bg-gray-50"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Export Filtered
            </a> */}
            <button
              onClick={() => exportOrders()}
              disabled={isExporting}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#DBE7E4] bg-[#2D6B61] px-4 text-[13px] font-medium text-white transition-all hover:bg-[#1B4F48] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {isExporting ? "Exporting..." : "Export All"}
            </button>
          </div>
        </div>
        {/* ── Filters Section ────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Filter className="h-4 w-4" />
                Filter Orders
              </h3>
              <button
                onClick={clearFilters}
                className="text-xs font-medium text-[#1B433B] hover:text-[#2D6B61] flex items-center gap-1"
              >
                <X className="h-3 w-3" />
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              {/* Search */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-gray-500">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Order ID, Patient..."
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-8 pr-3 text-xs outline-none transition-all placeholder:text-gray-400 focus:border-[#4A8E83] focus:bg-white focus:ring-1 focus:ring-[#4A8E83]"
                  />
                </div>
              </div>

              {/* Order Status */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-gray-500">
                  Order Status
                </label>
                <div className="relative">
                  <select
                    value={filters.order_status}
                    onChange={(e) =>
                      handleFilterChange("order_status", e.target.value)
                    }
                    className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 py-2 pl-3 pr-8 text-xs outline-none transition-all focus:border-[#4A8E83] focus:bg-white focus:ring-1 focus:ring-[#4A8E83]"
                  >
                    <option value="">All Statuses</option>
                    {filterOptions?.order_status?.map((s: string) => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 pointer-events-none text-gray-400" />
                </div>
              </div>

              {/* Payment Status */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-gray-500">
                  Payment Status
                </label>
                <div className="relative">
                  <select
                    value={filters.payment_status}
                    onChange={(e) =>
                      handleFilterChange("payment_status", e.target.value)
                    }
                    className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 py-2 pl-3 pr-8 text-xs outline-none transition-all focus:border-[#4A8E83] focus:bg-white focus:ring-1 focus:ring-[#4A8E83]"
                  >
                    <option value="">All Payments</option>
                    {filterOptions?.payment_status?.map((s: string) => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 pointer-events-none text-gray-400" />
                </div>
              </div>

              {/* Fulfillment Type */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-gray-500">
                  Fulfillment
                </label>
                <div className="relative">
                  <select
                    value={filters.fulfillment_type}
                    onChange={(e) =>
                      handleFilterChange("fulfillment_type", e.target.value)
                    }
                    className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 py-2 pl-3 pr-8 text-xs outline-none transition-all focus:border-[#4A8E83] focus:bg-white focus:ring-1 focus:ring-[#4A8E83]"
                  >
                    <option value="">All Types</option>
                    {filterOptions?.fulfillment_type?.map((s: string) => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 pointer-events-none text-gray-400" />
                </div>
              </div>

              {/* Date From */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-gray-500">
                  Date From
                </label>
                <div className="relative">
                  <Calendar className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    value={filters.date_from}
                    onChange={(e) =>
                      handleFilterChange("date_from", e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-8 pr-3 text-xs outline-none transition-all focus:border-[#4A8E83] focus:bg-white focus:ring-1 focus:ring-[#4A8E83]"
                  />
                </div>
              </div>

              {/* Date To */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-gray-500">
                  Date To
                </label>
                <div className="relative">
                  <Calendar className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    value={filters.date_to}
                    onChange={(e) =>
                      handleFilterChange("date_to", e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-8 pr-3 text-xs outline-none transition-all focus:border-[#4A8E83] focus:bg-white focus:ring-1 focus:ring-[#4A8E83]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              {/* ── Head ── */}
              <thead>
                <tr className="border-b border-gray-100 bg-[#F8F9FA]">
                  {[
                    "Order",
                    "Product",
                    "Patient",
                    "Date",
                    "Amounts",
                    "Payment Status",
                    "Order Status",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      className="whitespace-nowrap px-5 py-3.5 text-[10.5px] font-semibold uppercase tracking-widest text-gray-400"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              {/* ── Body ── */}
              <tbody className="divide-y divide-gray-100">
                {ordersData.map((order) => (
                  <tr
                    key={order.id}
                    className="transition-colors duration-100 hover:bg-[#FAFBFC]"
                  >
                    {/* Order */}
                    <td className="px-5 py-4 align-top">
                      <p className="text-[13px] font-semibold text-gray-800">
                        {order.order_id}
                      </p>
                      <p className="mt-0.5 text-[10px] text-gray-400">
                        #{order.id}&nbsp;&middot;&nbsp;RX #
                        {order.prescription_id}
                      </p>
                    </td>

                    {/* Product */}
                    <td className="px-5 py-4 align-top">
                      <p className="text-[13px] font-medium text-gray-800">
                        {order.product?.name || "N/A"}
                      </p>
                      <p className="mt-0.5 text-[11px] text-gray-400">
                        {order.product?.category || "—"}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        Unit {formatAmount(order.product?.price || null)}
                      </p>
                    </td>

                    {/* Patient */}
                    <td className="px-5 py-4 align-top">
                      <p className="text-[13px] font-medium text-gray-800">
                        {order.patient?.name || "N/A"}
                      </p>
                      <p className="mt-0.5 text-[11px] text-gray-400">
                        {order.patient?.email || "No email"}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {order.patient?.phone || "No phone"}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="whitespace-nowrap px-5 py-4 align-top text-[13px] font-medium text-gray-700">
                      {order.date}
                    </td>

                    {/* Amounts */}
                    <td className="px-5 py-4 align-top">
                      <div className="w-36 space-y-0.5">
                        {(
                          [
                            ["Med", order.amounts.medication_price],
                            ["Fee", order.amounts.prescription_fee],
                            ["Shipping", order.amounts.shipping_amount],
                            ["Due", order.amounts.due_amount],
                          ] as [string, string | null][]
                        ).map(([label, val]) => (
                          <div
                            key={label}
                            className="flex justify-between text-[11px] text-gray-400"
                          >
                            <span>{label}</span>
                            <span>{formatAmount(val)}</span>
                          </div>
                        ))}
                        <div className="flex justify-between border-t border-gray-100 pt-1 text-[12px] font-semibold text-gray-700">
                          <span>Total</span>
                          <span>
                            {formatAmount(order.amounts.total_amount)}
                          </span>
                        </div>
                        <div className="flex justify-between text-[11px] text-gray-400">
                          <span>Remaining</span>
                          <span>
                            {formatAmount(order.amounts.remaining_amount)}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Payment Status */}
                    <td className="px-5 py-4 align-top">
                      {order?.pharmacy_payment_status ? (
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`h-2 w-2 shrink-0 rounded-full ${paymentDotClass(
                              order.pharmacy_payment_status || "",
                            )}`}
                          />
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold transition-all ${paymentBadgeClass(
                              order.pharmacy_payment_status || "",
                            )}`}
                          >
                            {normalizeLabel(
                              order.pharmacy_payment_status || "",
                            )}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-gray-400">null</span>
                      )}
                    </td>

                    {/* Order Status */}
                    <td className="px-5 py-4 align-top">
                      <Popover
                        open={!!openStatusPopovers[order.id]}
                        onOpenChange={(open) =>
                          setOpenStatusPopovers((prev) => ({
                            ...prev,
                            [order.id]: open,
                          }))
                        }
                      >
                        <PopoverTrigger asChild>
                          <button
                            disabled={
                              isUpdating && updatingOrderId === order.id
                            }
                            className={`group flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold transition-all hover:ring-2 ${statusBadgeClass(
                              order.delivery_status,
                            )}`}
                          >
                            {isUpdating && updatingOrderId === order.id ? (
                              <Loader2 className="h-2.5 w-2.5 animate-spin" />
                            ) : (
                              normalizeLabel(order.delivery_status)
                            )}
                            <ChevronDown className="h-2.5 w-2.5 opacity-40 transition-transform group-data-[state=open]:rotate-180" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent
                          align="start"
                          className="w-32 overflow-hidden rounded-xl border border-gray-100 bg-white! p-1 shadow-xl"
                        >
                          <div className="flex flex-col">
                            {ORDER_STATUSES.map((s) => (
                              <button
                                key={s}
                                onClick={() => {
                                  setUpdatingOrderId(order.id);
                                  updateStatus({
                                    orderId: order.id,
                                    delivery_status: s,
                                  });
                                  setOpenStatusPopovers((prev) => ({
                                    ...prev,
                                    [order.id]: false,
                                  }));
                                }}
                                className="w-full rounded-lg px-2.5 py-1.5 text-left text-[11px] font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#1B433B]"
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </td>

                    {/* Action */}
                    <td className="px-5 py-4 align-top">
                      <div className="grid grid-cols-2 items-center gap-2">
                        {/* Download Prescription */}
                        {order.prescription_pdf_download_url ? (
                          <a
                            href={order.prescription_pdf_download_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Download Prescription"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#C8DDD9] bg-[#F0F8F6] text-[#2D6B61] transition-all hover:border-[#4A8E83] hover:bg-[#E4F3F0]"
                          >
                            <Download className="h-4 w-4" />
                          </a>
                        ) : (
                          <button
                            disabled
                            title="No Prescription Available"
                            className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-gray-300"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        )}

                        {/* Confirm PickUp */}
                        <button
                          onClick={() => {
                            setLastActionOrderId(order.id);
                            setActiveAction("pickup");
                            performAction({
                              orderId: order.id,
                              action: "pickup",
                            });
                          }}
                          disabled={
                            isActionPending &&
                            lastActionOrderId === order.id &&
                            activeAction === "pickup"
                          }
                          title="Confirm PickUp"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D6E5FF] bg-[#F3F8FF] text-[#1D4ED8] transition-all hover:border-[#ADC7FF] hover:bg-[#E0EBFF] disabled:opacity-50 cursor-pointer"
                        >
                          {isActionPending &&
                          lastActionOrderId === order.id &&
                          activeAction === "pickup" ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <PackageCheck className="h-4 w-4" />
                          )}
                        </button>

                        {/* Confirm Shipping */}
                        <button
                          onClick={() => {
                            setLastActionOrderId(order.id);
                            setActiveAction("shipping");
                            performAction({
                              orderId: order.id,
                              action: "shipping",
                            });
                          }}
                          disabled={
                            isActionPending &&
                            lastActionOrderId === order.id &&
                            activeAction === "shipping"
                          }
                          title="Confirm Shipping"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E7D5FF] bg-[#FAF5FF] text-[#7E22CE] transition-all hover:border-[#D1B3FF] hover:bg-[#F3E8FF] disabled:opacity-50 cursor-pointer"
                        >
                          {isActionPending &&
                          lastActionOrderId === order.id &&
                          activeAction === "shipping" ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Truck className="h-4 w-4" />
                          )}
                        </button>

                        {/* Resend Payment Link */}
                        <button
                          onClick={() => {
                            setLastActionOrderId(order.id);
                            setActiveAction("resend_payment");
                            performAction({
                              orderId: order.id,
                              action: "resend_payment",
                            });
                          }}
                          disabled={
                            (isActionPending &&
                              lastActionOrderId === order.id &&
                              activeAction === "resend_payment") ||
                            order.pharmacy_payment_status !== "Pending"
                          }
                          title={
                            order.pharmacy_payment_status !== "Pending"
                              ? "Payment link can only be resent if pending"
                              : "Resend Payment Link"
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#F7DFC2] bg-[#FFF8EE] text-[#B45309] transition-all hover:border-[#F3CC9B] hover:bg-[#FFF1E0] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                          {isActionPending &&
                          lastActionOrderId === order.id &&
                          activeAction === "resend_payment" ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {ordersData.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-5 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <svg
                          className="h-8 w-8 text-gray-200"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                        <p className="text-sm text-gray-400">
                          No orders found.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ────────────────────────────────────────────────── */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 bg-[#F8F9FA] px-5 py-3 sm:flex-row">
            {/* Left: record summary */}
            <p className="text-[12px] text-gray-400">
              Showing{" "}
              <span className="font-semibold text-gray-600">
                {paginationData?.from ?? 0}–{paginationData?.to ?? 0}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-600">
                {paginationData?.total ?? 0}
              </span>{" "}
              records
            </p>
            {/* Right: page buttons */}
            <div className="flex items-center gap-1">
              {/* Prev arrow */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M7.5 9L4.5 6l3-3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Page pills */}
              {pageNumbers.map((item, idx) =>
                item === "…" ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="flex h-8 w-8 items-center justify-center text-[12px] text-gray-400"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    onClick={() => setCurrentPage(item as number)}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg border text-[12px] font-medium shadow-sm transition-all ${
                      item === currentPage
                        ? "border-[#2D6B61] bg-[#2D6B61] text-white"
                        : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {item}
                  </button>
                ),
              )}

              {/* Next arrow */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, lastPage))
                }
                disabled={currentPage === lastPage}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M4.5 3L7.5 6l-3 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
