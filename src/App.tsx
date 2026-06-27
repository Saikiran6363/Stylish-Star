/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Booking } from './components/Booking';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { AdminPanel } from './components/AdminPanel';

function MainApp() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Booking />
      <Gallery />
      <Reviews />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-dark-950 min-h-screen text-gray-200">
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
