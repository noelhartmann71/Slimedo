import BlogDetail from "@/components/BlogDetails/BlogDetail";
import CTABanner from "@/components/CTABanner/CTABanner";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

const BlogDetails = () => {
  return (
    <div>
      <Navbar />
      <BlogDetail />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default BlogDetails;
