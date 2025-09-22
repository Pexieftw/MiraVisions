import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TermsOfService from "@/components/TermsOfService";

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      <Navbar />
      <TermsOfService />
      <Footer />
    </div>
  );
};

export default TermsOfServicePage;