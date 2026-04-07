import Hero from "@/components/Hero";
import SkillsSection from "@/components/SkillsSection";
import StickyHeader from "@/components/StickyHeader";
import Experience from "@/components/Experience";
import FeaturedWorks from "@/components/FeaturedWorks";
import VisualGallery from "@/components/VisualGallery";
import ContactFooter from "@/components/ContactFooter";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#0a0a0a]">
      <StickyHeader />
      <Hero />
      <SkillsSection />
      <FeaturedWorks />
      <Experience />
      <VisualGallery />
      <ContactFooter />
      <ScrollToTop />
    </main>
  );
}
