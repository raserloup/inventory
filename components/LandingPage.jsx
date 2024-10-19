import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Features
          </h2>
          <p className="mt-4 text-center text-gray-600">
            Discover the powerful features that make our inventory system
            indispensable.
          </p>
          <div className="mt-10 flex flex-wrap justify-center space-x-6">
            {/* Add feature cards here */}
          </div>
        </div>
      </section>
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            About Us
          </h2>
          <p className="mt-4 text-center text-gray-600">
            Learn more about our mission and the team behind the Construction
            Inventory System.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
