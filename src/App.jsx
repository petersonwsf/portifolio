// LAYOUTS
import Cabecalho from "./components/layout/Cabecalho";
import Container from "./components/layout/Container";

// SECTIONS
import Heroi from "./components/sections/Heroi"
import AboutMe from './components/sections/AboutMe'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Contacts from './components/sections/Contacts'
import Experiences from "./components/sections/Experiences";

function App() {

  return (
    <div>
      <Cabecalho />
      <Heroi />
      <Container>
        <Experiences />
        <Skills/>
        <Projects />
        <AboutMe />
        <Contacts />
      </Container>
    </div>
  )
}

export default App
