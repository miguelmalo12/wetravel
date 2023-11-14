import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import CTA from '../components/CTA/CTA';
import Header from '../components/Header/Header';
import { CopyrightFooter, Footer } from '../components/Footer/Footer';


function Home() {
  return (
    <div>
      <main>
        <Hero />
        <About />
        <CTA title={"Let's Explore The Beauty Of the World"} text={"Your perfect destination, one click away."} buttonText={"Get Started"} />
      </main>
      <Footer />
      <CopyrightFooter />
    </div>
  )
}

export default Home