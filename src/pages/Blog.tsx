import BlogBanner from "@/components/Blog/BlogBanner";
import BlogCard from "@/components/Blog/BlogCard";
import CTABanner from "@/components/CTABanner/CTABanner";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import SlimedoTicker from "@/components/SlimedoTicker/SlimedoTicker.tsx";

const Blog = () => {
  return (
    <div>
      {/* This is the Blog page */}
      <SlimedoTicker/>
      <Navbar />
      <BlogBanner />
      <BlogCard />
      <CTABanner />
      <Footer />
      {/*  */}
    </div>
  );
};

export default Blog;
