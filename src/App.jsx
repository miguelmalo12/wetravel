import './main.scss';

import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import CTA from './components/CTA/CTA';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <About />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
