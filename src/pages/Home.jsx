import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import CTA from '../components/CTA/CTA';


function Home() {
  return (
    <main>
        <Hero />
        <About />
        <CTA title={"Let's Explore The Beauty Of the World"} text={"Your perfect destination, one click away."} buttonText={"Get Started"} />
    </main>
  )
}

export default Home