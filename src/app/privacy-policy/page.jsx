import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrivacyPolicy from "@/components/PrivacyPolicy";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      <Navbar />
      <PrivacyPolicy />
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;