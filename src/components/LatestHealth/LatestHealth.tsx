import { axiosPublic } from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import { Pagination } from "../Blog/BlogCard";

interface SimilarPost {
  category: string[];
  id: number;
  image: string;
  tags: string[];
  title: string;
  description: string;
}

interface BlogData {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

// This is the similar blog
function SimilarBlog({ label }: { label: string }) {
  const colorMap: Record<string, string> = {
    Telemedicine: "bg-[#E8ECEB] text-sage",
    "Patient Education": "bg-[#E8ECEB] text-sage",
    Wellness: "bg-[#E8ECEB] text-sage",
    "Mental Health": "bg-[#E8ECEB] text-sage",
    "Tips & Guide": "bg-[#E8ECEB] text-sage",
  };
  const labelMap: Record<string, string> = {
    Telemedicine: "Telemedizin",
    "Patient Education": "Patientenaufklärung",
    Wellness: "Wellness",
    "Mental Health": "Mentale Gesundheit",
    "Tips & Guide": "Tipps & Leitfäden",
  };
  const displayLabel = labelMap[label] ?? label;
  const cls = colorMap[label] ?? "bg-[#E8ECEB]";
  return (
    <span
      className={`inline-block rounded-[999px] px-3 py-1.5 text-sm font-medium text-sage ${cls}`}
    >
      {displayLabel}
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
          {Array.isArray(post?.category) ? (
            post.category.map((t) => <SimilarBlog key={t} label={t} />)
          ) : post?.category ? (
            <SimilarBlog label={String(post.category)} />
          ) : null}
        </div>
        <h3 className="text-xl font-medium text-black leading-snug line-clamp-2">
          {post.title}
        </h3>
        <p className="text-base text-[#6B7280] leading-relaxed line-clamp-2 flex-1">
          {post.description}
        </p>
        <Link to={`/blog/${post.id}`} className="self-start">
          <button className="mt-1 self-start inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-sage px-4 py-1.5 md:py-3 text-sm md:text-base font-medium text-white hover:bg-sage hover:text-white hover:border-teal-600 transition-all duration-200 cursor-pointer">
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

const BlogCardSkeleton = () => (
  <div className="flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm p-4 h-full">
    <Skeleton className="aspect-video w-full rounded-xl" />
    <div className="flex flex-col gap-4 mt-6 flex-1">
      <div className="flex gap-2">
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-3/4" />
      <div className="mt-auto">
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </div>
  </div>
);

const LatestHealth = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const { data: blogData = [], isLoading } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      const response = await axiosPublic.get("/blog");
      return response?.data?.data;
    },
  });

  const totalPages = Math.ceil(blogData.length / postsPerPage);
  const paginatedData = blogData.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  // console.log("Blog data:", blogData);

  return (
    <div className="mx-5 lg:mx-10 xl:mx-15 2xl:mx-50">
      {/* Similar Blog Section */}
      <div className="mt-7 lg:mt-14">
        <span className="inline-block font-inter px-4 py-3 bg-deep/10 text-[#064045] text-sm font-medium rounded-full mb-4">
          Blogs
        </span>
        {/*  */}
        <div className="flex flex-col gap-5 sm:gap-0 md:flex-row justify-between items-center mb-5 md:mb-0">
          <div>
            <h2 className="text-3xl lg:text-[46px] font-serif font-semibold text-sage mb-4">
              Neueste Gesundheitserkenntnisse
            </h2>
            <h2 className="text-base font-inter font-normal text-[#6B7280] md:mb-7">
              Expertenrat, Gesundheitstipps und Branchen-News von unserem Team aus <br /> zugelassenen Ärzten
            </h2>
          </div>
          {/* This is the button */}
          <Link to={"/"}>
            <button className="flex items-center gap-3 bg-[#0f4a4a] text-[#FFF] px-2 md:px-4 md:py-3 py-1.5 md:rounded-full rounded-4xl text-sm font-medium">
              <span>Alle ansehen</span>
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#E8ECEB] text-[#0f4a4a] text-lg font-bold">
                ›
              </span>
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {isLoading
            ? [...Array(postsPerPage)].map((_, index) => (
                <BlogCardSkeleton key={index} />
              ))
            : paginatedData?.map((post: BlogData) => (
                <SimilarCard key={post.id} post={post} />
              ))}
        </div>
        {!isLoading && totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              current={currentPage}
              total={totalPages}
              onChange={(p) => setCurrentPage(p)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestHealth;
