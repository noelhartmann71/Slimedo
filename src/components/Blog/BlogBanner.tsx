import BlogBannerImg from "../../../public/images/blog/blog-banner.png";

export default function BlogBanner() {
  return (
    <div className="relative w-full sm:h-125 2xl:h-191.5 overflow-hidden">
      {/* Background Image */}
      <img
        src={BlogBannerImg}
        alt="Health Blog Banner"
        className="w-full h-full object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text content - bottom left */}
      <div className="absolute bottom-8 left-8">
        <h1 className="text-white text-3xl sm:text-[52px] font-bold mb-1 font-inter">
          Gesundheits-Blog
        </h1>
        <p className="text-white text-sm sm:text-base">
          Einblicke, Tipps und Updates, die Ihnen helfen, intelligentere Entscheidungen zu treffen.
        </p>
      </div>
    </div>
  );
}
