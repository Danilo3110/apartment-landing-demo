import { FormattedMessage } from 'react-intl';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Gallery from './components/Gallery.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Location from './components/Location.jsx';
import Prices from './components/Prices.jsx';
import Reviews from './components/Reviews.jsx';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        <FormattedMessage id="skip" />
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Gallery />
        <Prices />
        <Reviews />
        <Location />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
