import BlogDetail from "@/components/BlogDetails/BlogDetail";
import CTABanner from "@/components/CTABanner/CTABanner";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import SlimedoTicker from "@/components/SlimedoTicker/SlimedoTicker.tsx";

const BlogDetails = () => {
  return (
    <div>
      <SlimedoTicker/>
      <Navbar />
      <BlogDetail />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default BlogDetails;
