import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground px-15">
      <Navbar />

      <main className="w-full">
        <section id="hero" className="bg-background w-full min-h-screen">
          <Hero />
        </section>

        <section id="about" className="bg-surface min-h-screen py-20">
          <About />
        </section>

        <section id="projects" className="bg-background py-24">
          <Projects />
        </section>

        <section id="skills" className="bg-surface py-24">
          <Skills />
        </section>

        <section id="contact" className="bg-background min-h-screen">
          <Contact />
        </section>
      </main>
    </div>
  );
}

export default App;