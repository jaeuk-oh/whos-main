import './App.css';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import NavDots from './components/NavDots';

function App() {
  return (
    <>
    <a href="#hero" className="skip-link">Skip to main content</a>
    <main className="app">
      <div className="bg-orbs" aria-hidden="true">
        <div className="bg-orbs__orb bg-orbs__orb--1" />
        <div className="bg-orbs__orb bg-orbs__orb--2" />
      </div>
      <Hero />
      <Projects />
      <Skills />
      <Contact />
      <NavDots />
    </main>
    </>
  );
}

export default App;
