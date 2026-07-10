import { CustomCursor } from './components/CustomCursor';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { CaseStudies } from './components/CaseStudies';
import { Services } from './components/Services';
import { ContactForm } from './components/ContactForm';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="relative min-h-screen w-full bg-white select-none">
      {/* Resizable responsive navbar */}
      <Navbar />

      {/* Custom Cursor Overlay */}
      <CustomCursor />
      
      {/* SECTION 1: HERO */}
      <Hero />
      
      {/* SECTION 2: ABOUT */}
      <About />
      
      {/* SECTION 3: CASE STUDIES (CAROUSEL) */}
      <CaseStudies />
      
      {/* SECTION 4: SERVICES (BENTO GRID) */}
      <Services />
      
      {/* SECTION 5: LET'S TALK */}
      <ContactForm />
    </div>
  );
}

export default App;
