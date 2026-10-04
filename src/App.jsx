import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import useSiteMeta from "./components/useSiteMeta";
import { Analytics } from '@vercel/analytics/react';

function App() {
  useSiteMeta();
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="w-full md:px-[clamp(60px,15vw,13.75rem)] sm:px-20 px-5">
        <section id="home" className="bg-background w-full min-h-screen">
          <Home />
        </section>

        <section id="about" className="min-h-screen py-20">
          <About />
        </section>

        <section id="projects" className="bg-background py-24">
          <Projects />
        </section>

        <section id="skills" className="w-full py-24">
          <Skills />
        </section>

        <section id="contact" className="bg-background min-h-screen">
          <Contact />
        </section>
      </main>
      <Analytics/>
    </div>
  );
}

export default App;