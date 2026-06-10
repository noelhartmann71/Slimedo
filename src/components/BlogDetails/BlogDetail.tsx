import { Link, useParams } from "react-router-dom";
import BlogDetailsImg from "../../../public/images/blog/blog-details-img.png";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/hooks/useAxiosPublic";

interface Author {
  name: string;
  role: string;
  avatar: string;
}

interface SimilarPost {
  id: number;
  image: string;
  tags?: string[] | string;
  title: string;
  description: string;
  category?: string[] | string;
}

function toArray(value?: string[] | string): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  return [value];
}

// ── Similar Blog Badge ──────────────────────────────────────────────────────
function TagBadge({ label }: { label: string }) {
  const colorMap: Record<string, string> = {
    Telemedizin: "bg-teal-50 text-white",
    "Patientenaufklärung": "bg-sage text-white",
    Wellness: "bg-green-50 text-white",
    "Psychische Gesundheit": "bg-purple-50 text-white",
    "Tipps & Ratgeber": "bg-sage text-gray-600",
  };
  const cls = colorMap[label] ?? "bg-sage";
  return (
    <span
      className={`inline-block rounded-[999px] px-2 lg:px-4 lg:py-3 py-1.5 text-sm lg:text-base font-medium text-white ${cls}`}
    >
      {label}
    </span>
  );
}

// This is the similar blog
function SimilarBlog({ label }: { label: string }) {
  const colorMap: Record<string, string> = {
    Telemedizin: "bg-neutral-200 text-sage",
    "Patientenaufklärung": "bg-neutral-200 text-sage",
    Wellness: "bg-neutral-200 text-sage",
    "Psychische Gesundheit": "bg-neutral-200 text-sage",
    "Tipps & Ratgeber": "bg-neutral-200 text-sage",
  };
  const cls = colorMap[label] ?? "bg-neutral-200";
  return (
    <span
      className={`inline-block rounded-[999px] px-3 py-1.5 text-sm font-medium text-sage ${cls}`}
    >
      {label}
    </span>
  );
}

// ── Similar Blog Card ──────────────────────────────────────────────────────
function SimilarCard({ post }: { post: SimilarPost }) {
  return (
    <article className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-4">
      <div className="relative overflow-hidden aspect-video">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
        <div className="flex flex-col flex-1 mt-6 gap-2">
          <div className="flex flex-wrap gap-1.5">
          {toArray(post.category).map((t: string) => (
            <SimilarBlog key={t} label={t} />
          ))}
        </div>
        <h3 className="text-xl font-medium text-black leading-snug line-clamp-2">
          {post.title}
        </h3>
        <p className="text-base text-neutral-500 leading-relaxed line-clamp-2 flex-1">
          {post.description}
        </p>
        <Link to={`/blog/${post.id}`} className="self-start">
          <button className="mt-1 self-start inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-neutral-200 px-4 py-3 text-base font-medium text-sage hover:bg-sage hover:text-white hover:border-teal-600 transition-all duration-200 cursor-pointer">
            Weiterlesen
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
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

// ── Mock Data ──────────────────────────────────────────────────────────────
const AUTHOR: Author = {
  name: "Dr. Sarah Andrews",
  role: "Lead Medical Advisor",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
};

// ── Detail Skeleton ────────────────────────────────────────────────────────
function BlogDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white font-inter animate-pulse">
      <div className="mx-5 lg:mx-10 xl:mx-15 2xl:mx-87.5 py-10 2xl:py-20">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 w-12 bg-gray-200 rounded"></div>
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>

        {/* Category Badge Skeleton */}
        <div className="flex gap-2 mb-4">
          <div className="h-10 w-32 bg-gray-200 rounded-full"></div>
        </div>

        {/* Title Skeleton */}
        <div className="h-10 lg:h-12 w-3/4 bg-gray-200 rounded mb-5"></div>
        <div className="h-10 lg:h-12 w-1/2 bg-gray-200 rounded mb-5"></div>

        {/* Author Row Skeleton */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className="w-12 h-12 rounded-full bg-gray-200"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
          </div>
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
        </div>

        {/* Hero Image Skeleton */}
        <div className="rounded-2xl bg-gray-200 h-62.5 md:h-133 mb-7"></div>

        {/* Article Body Skeleton */}
        <div className="space-y-4">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}

// ── Main BlogDetail Component ──────────────────────────────────────────────
export default function BlogDetail() {
  const { id } = useParams();

  const { data: blogDetailsData, isLoading } = useQuery({
    queryKey: ["blogDetails", id],
    queryFn: async () => {
      const response = await axiosPublic.get(`/blog/${id}`);
      return response?.data?.data;
    },
  });

  // Fetch similar blogs
  const { data: blogData = [], isLoading: isSimilarLoading } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      const response = await axiosPublic.get("/blog");
      return response?.data?.data;
    },
  });

  if (isLoading) {
    return <BlogDetailSkeleton />;
  }

  if (!blogDetailsData) {
    return (
      <div className="min-h-screen bg-white font-inter flex items-center justify-center">
        <div className="text-xl text-gray-500 font-medium">Blog nicht gefunden.</div>
      </div>
    );
  }

  // console.log("Blog data:", blogData);

  return (
    <div className="min-h-screen bg-white font-inter">
      <div className="mx-5 lg:mx-10 xl:mx-15 2xl:mx-87.5 py-10 2xl:py-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-base text-neutral-500 mb-6">
          <Link to="/blog" className="hover:text-teal-600 transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="hover:text-teal-600 font-medium transition-colors text-[#353849]">
            Blog-Details
          </span>
        </nav>

        {/* Category Badge */}
        <div className="flex flex-wrap gap-2 mb-4">
          {toArray(blogDetailsData.category).map((cat: string) => (
            <TagBadge key={cat} label={cat} />
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl lg:text-[44px] font-medium text-black leading-tight mb-5">
          {blogDetailsData.title}
        </h1>

        {/* Author Row */}
        <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          {/* Author */}
          <div className="flex items-center gap-2.5">
            <img
              src={AUTHOR.avatar}
              alt={AUTHOR.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
            />
            <div>
              <p className="text-sm font-medium text-black">{AUTHOR.name}</p>
              <p className="text-xs text-neutral-500">{AUTHOR.role}</p>
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-gray-400 ml-auto">
            {/* Date */}
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {new Date(blogDetailsData.created_at).toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                },
              )}
            </span>
            {/* Read time */}
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              5 Min. Lesezeit
            </span>
          </div>

          {/* Topic Tags */}
          <div className="w-full flex flex-wrap gap-2 mt-1">
            {toArray(blogDetailsData.category).map((cat: string) => (
              <span
                key={cat}
                className="text-xs text-neutral-500 bg-gray-100 px-3 py-2 rounded-lg"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden mb-7">
          <img
            src={blogDetailsData.image || BlogDetailsImg}
            alt={blogDetailsData.title}
            className="w-full object-cover h-62.5 md:max-h-133"
          />
        </div>

        {/* Article Body */}
        <div className="text-neutral-500 text-base leading-relaxed space-y-5">
          <p>{blogDetailsData.description}</p>
        </div>

        {/* Similar Blog Section */}
        <div className="mt-14">
          <h2 className="text-3xl lg:text-[44px] font-medium text-black mb-6">
            Ähnlicher Blog
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {isSimilarLoading
              ? [...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-80 bg-gray-100 rounded-2xl animate-pulse"
                  ></div>
                ))
              : blogData
                  ?.slice(0, 3)
                  .map((post: SimilarPost) => (
                    <SimilarCard key={post.id} post={post} />
                  ))}
          </div>
        </div>
      </div>
    </div>
  );
}
