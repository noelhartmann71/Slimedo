import BlogBanner from "@/components/Blog/BlogBanner";
import BlogCard from "@/components/Blog/BlogCard";
import CTABanner from "@/components/CTABanner/CTABanner";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

const Blog = () => {
  return (
    <div>
      {/* This is the Blog page */}
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
