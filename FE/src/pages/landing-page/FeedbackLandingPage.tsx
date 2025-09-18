
import Footer from "./ui/Footer";
import Navbar from "./ui/Navbar";
import Hero from "./ui/Hero";
import Features from "./ui/Features";
import About from "./ui/About";


export default function FeedbackLandingPage() {

  return (
    <>
      <div className="fl-root">
        {/* Google Fonts import */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Navbar */}
        <Navbar />
        {/* Hero Section */}
        <Hero />
        {/*Feature Highlights */}
        <Features />
        {/* About Section */}
        <About />
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
