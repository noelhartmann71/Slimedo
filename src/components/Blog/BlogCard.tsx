import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/hooks/useAxiosPublic";

// ── Mock Data ──────────────────────────────────────────────────────────────

const FILTER_TABS = [
  "Alle",
  "Telemedizin",
  "Patientenaufklärung",
  "Wellness",
  "Datenschutz & Sicherheit",
  "Psychische Gesundheit",
];

// ── Tag Badge ──────────────────────────────────────────────────────────────
function TagBadge({ label }: { label: string }) {
  const colorMap: Record<string, string> = {
    Telemedizin: "bg-teal-50 text-teal-700",
    "Patientenaufklärung": "bg-blue-50 text-blue-700",
    Wellness: "bg-green-50 text-green-700",
    "Psychische Gesundheit": "bg-purple-50 text-purple-700",
    "Tipps & Ratgeber": "bg-gray-100 text-gray-600",
    "Datenschutz & Sicherheit": "bg-orange-50 text-orange-700",
  };
  const cls = colorMap[label] ?? "bg-gray-100 text-gray-600";
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-sm font-medium font-inter ${cls}`}
    >
      {label}
    </span>
  );
}

// ── Blog Card ──────────────────────────────────────────────────────────────
function BlogCardSkeleton() {
  return (
    <div className="flex flex-col rounded-card overflow-hidden bg-white border border-[#F5F7F8] p-4 animate-pulse">
      {/* Image Skeleton */}
      <div className="bg-gray-200 aspect-video rounded-card-sm w-full"></div>

      {/* Body Skeleton */}
      <div className="flex flex-col flex-1 pt-6 gap-3">
        {/* Tags Skeleton */}
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
        </div>

        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-5 w-full bg-gray-200 rounded"></div>
          <div className="h-5 w-2/3 bg-gray-200 rounded"></div>
        </div>

        {/* Description Skeleton */}
        <div className="space-y-2 mt-2">
          <div className="h-4 w-full bg-gray-100 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-100 rounded"></div>
        </div>

        {/* Button Skeleton */}
        <div className="h-10 w-32 bg-gray-200 rounded-md mt-2"></div>
      </div>
    </div>
  );
}

function BlogCard({ post }: { post: SimilarPost }) {
  const categories = Array.isArray(post.category)
    ? post.category
    : post.category
      ? [post.category]
      : [];

  return (
    <article className="group flex flex-col rounded-card overflow-hidden bg-white border border-[#F5F7F8] p-4">
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 pt-6 gap-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat: string) => (
            <TagBadge key={cat} label={cat} />
          ))}
        </div>

        {/* Title */}
        <h3 className="text-base xl:text-xl font-semibold text-gray-900 leading-snug line-clamp-2 transition-colors duration-200">
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-sm xl:text-base text-neutral-500 leading-relaxed line-clamp-2 flex-1">
          {post.description}
        </p>

        {/* Read More */}
        <Link to={`/blog/${post.id}`}>
          <button className="mt-1 self-start inline-flex items-center gap-1.5 rounded-md border border-[#B8C5C2] bg-neutral-200 px-2 xl:px-4 xl:py-3 py-1.5 text-base font-medium text-gray-700 hover:bg-sage hover:text-white hover:border-teal-600 transition-all duration-200 cursor-pointer">
            Weiterlesen
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </Link>
      </div>
    </article>
  );
}

// ── Pagination ─────────────────────────────────────────────────────────────
export function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (p: number) => void;
}) {
  const getPages = () => {
    const pages: (number | string)[] = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push("...");
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (current < total - 2) pages.push("...");
      pages.push(total);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {/* Prev */}
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all duration-200 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div className="flex items-center gap-1.5">
        {getPages().map((p, i) =>
          typeof p === "number" ? (
            <button
              key={i}
              onClick={() => onChange(p)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                p === current
                  ? "bg-sage text-white shadow-md shadow-sage/20"
                  : "border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
              }`}
            >
              {p}
            </button>
          ) : (
            <span
              key={i}
              className="w-10 h-10 flex items-center justify-center text-gray-400 font-medium"
            >
              {p}
            </span>
          ),
        )}
      </div>

      {/* Next */}
      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all duration-200 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}

interface SimilarPost {
  id: number;
  image: string;
  category?: string[] | string;
  title: string;
  description: string;
}

// ── Blog List Page ─────────────────────────────────────────────────────────
export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState("Alle");
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 9;

  const { data: blogData = [], isLoading } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      const response = await axiosPublic.get("/blog");
      return response?.data?.data;
    },
  });

  // console.log("Blog data:", blogData);

  // For now, we use blogData for the grid but keep filter logic separate as requested
  const totalPages = Math.max(1, Math.ceil(blogData.length / POSTS_PER_PAGE));
  const paginated = blogData.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  const handleFilter = (tab: string) => {
    setActiveFilter(tab);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      <div className="mx-5 lg:mx-10 xl:mx-15 2xl:mx-20 py-10">
        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          {/* Search */}
          <div className="relative w-full sm:w-102.25">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Artikel suchen..."
              className="w-full pl-9 pr-4 py-3 text-sm rounded-card-sm border border-gray-200 bg-white"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => handleFilter(tab)}
                className={`xl:px-4 px-2 xl:py-3 py-1.5 rounded-xl xl:rounded-card-sm text-sm xl:text-base font-medium transition-all duration-200 ${
                  activeFilter === tab
                    ? "bg-sage text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        ) : paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((post: SimilarPost) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 py-20">Keine Artikel gefunden.</p>
        )}

        {/* Pagination */}
        <Pagination
          current={currentPage}
          total={totalPages}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
