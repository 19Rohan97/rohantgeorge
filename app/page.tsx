import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Resume from "./components/sections/Resume";
import Services from "./components/sections/Services";
import Works from "./components/sections/Works";
import Process from "./components/sections/Process";
import Blog from "./components/sections/Blog";
import Contact from "./components/sections/Contact";

export default function Home() {
  return (
    <div>
      <Hero />

      {/* About with subtle gradient background */}
      <div className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 -translate-x-1/2 w-[120vw] h-full bg-gradient-to-b from-foreground/[0.04] to-transparent" />
        </div>
        <About />
      </div>

      {/* Resume (plain) */}
      <Resume />

      {/* Services with subtle gradient background (alternate) */}
      <div className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 -translate-x-1/2 w-[120vw] h-full bg-gradient-to-b from-transparent via-foreground/[0.035] to-transparent" />
        </div>
        <Services />
      </div>

      {/* Works (plain) */}
      <Works />

      {/* Blog with subtle gradient background (alternate) */}
      <div className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 -translate-x-1/2 w-[120vw] h-full bg-gradient-to-b from-foreground/[0.035] to-transparent" />
        </div>
        <Blog />
      </div>

      {/* Contact (plain) */}
      <Contact />
    </div>
  );
}
