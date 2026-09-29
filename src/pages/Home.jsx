import Navbar from "../components/layouts/Navbar";
import Hero from "../components/layouts/Hero";
import About from "../components/layouts/About";
import Work from "../components/ui/Work";
import Terminal from "../components/ui/Terminal";
import Contact from "../components/layouts/Contact";
import Footer from "../components/layouts/Footer";

function Home() {
  return (
    <div className="portfolio-app-root">
      <Navbar />
      <Hero />
      <About />
      <Work />
      <Terminal />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
