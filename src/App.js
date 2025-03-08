import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Projects from "./components/Projects"
import Skills from "./components/Skills"
import WorkExperience from "./components/WorkExperience"
import Education from "./components/Education"
import Certifications from "./components/Certifications"
import Footer from "./components/Footer"
import Contact from "./components/Contact"
import "./index.css"

function App() {
  return (
    <div className="font-sans bg-gray-900 text-white">
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <WorkExperience />
      <Education />
      <Certifications />
      <Contact/>
      <Footer />
     
    </div>
  )
}

export default App

