import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaCheck, FaArrowRight, FaTimes } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';

// Import images from src/pages
import heroImage from './fotoProdukBenar.png';
import productImage from './fotoProdukBenar.png';
import missionImage from './Mission.png';
import labTourTravel from './Labolatorium Tour and Travel.png';
import prodiArsip from './Prodi Pengelolaan arsip dan rekaman informasi.png';
import prodiHutan from './Prodi Pengelolaan Hutan.png';
import visionImage from './Visi.png';
import sdgImage1 from './VoxSilva (4).png';
import sdgImage2 from './VoxSilva (5).png';
import sdgImage3 from './VoxSilva (6).png';
import partnerImage1 from './VoxSilva.png';
import partnerImage2 from './VoxSilva (1).png';
import partnerImage3 from './VoxSilva (2).png';
import partnerImage4 from './VoxSilva (3).png';
import teamPhoto from './fotoTeam.jpeg';
import memberNarendra from './narendra.jpeg';
import memberAdel from './elmo.jpeg';
import memberAditya from './adit.jpeg';
import memberAero from './Aero.jpeg';
import memberDavino from './davino.jpeg';
import memberJavier from './javier.jpeg';

const stats = [
  { number: '10K+', label: 'Pohon Dilindungi' },
  { number: '80%', label: 'Akurasi Deteksi' },
  { number: '24/7', label: 'Pemantauan Real-time' }
];

const features = [
  {
    title: 'Pemantauan Visual',
    description: 'Kamera beresolusi tinggi untuk memantau hutan 24/7',
    icon: '📷'
  },
  {
    title: 'Pendeteksi Suara',
    description: 'Mendeteksi suara gergaji mesin dan alat tebang ilegal',
    icon: '🎤'
  },
  {
    title: 'Analisis AI',
    description: 'Menggunakan kecerdasan buatan untuk mengenali aktivitas ilegal',
    icon: '🧠'
  },
  {
    title: 'Tenaga Surya',
    description: 'Bertenaga surya dengan daya tahan baterai lama',
    icon: '🔋'
  }
];

const Home = () => {
  const [selectedGallery, setSelectedGallery] = useState(null);

  const galleryItems = [
    {
      image: labTourTravel,
      title: 'Tour and Travel Laboratory',
      description: 'The Tour and Travel Laboratory is a learning facility that supports competency development in the tourism and travel industry. This laboratory is equipped with modern equipment for tour planning, travel management, and hospitality services practice.'
    },
    {
      image: prodiArsip,
      title: 'Archives and Information Management Program',
      description: 'The Archives and Information Management Program focuses on developing skills in managing, organizing, and preserving documents and information records. This program prepares students to become professionals in information management and digital archives.'
    },
    {
      image: prodiHutan,
      title: 'Forest Management Program',
      description: 'The Forest Management Program is committed to conserving and managing forest resources sustainably. This program integrates modern forestry science with technology to support forest conservation and responsible ecosystem management.'
  }
];

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-20 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-green-700">
            VoxSilva
          </Link>
          <div className="flex items-center gap-4">
            <a
              href="/login.html"
              className="px-5 py-2 rounded-lg border-2 border-green-700 text-green-700 font-semibold hover:bg-green-50 transition duration-300"
            >
              Login
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative bg-white border-b border-gray-200 py-16 md:py-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:ml-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/2 text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">VoxSilva Pro</h1>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-700">Forest Protection System</h2>
              <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-2xl">
                An intelligent forest monitoring system using ESP32 CAM and MIC to prevent illegal logging and protect Indonesia's forests.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/login.html"
                  className="bg-green-700 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-800 transition duration-300 flex items-center justify-center"
                >
Explore VoxSilva <IoIosArrowForward className="ml-2" />
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:w-1/2 flex justify-center"
            >
              <img
                src={heroImage}
                alt="VoxSilva Pro Forest Protection System"
                className="max-w-full h-auto rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

 

      {/* Product Section */}
      <div id="masalah" className="py-16 bg-gray-50 text-center scroll-mt-24">
        <h2 className="text-3xl font-bold mb-4">Problems We Solve</h2>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Illegal logging in Indonesia threatens nature conservation and ecosystems.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto px-4">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl font-bold text-green-700 mb-2">1.2M</div>
            <div className="text-gray-600">Hectares of Forest Lost/Year</div>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl font-bold text-green-700 mb-2">85%</div>
            <div className="text-gray-600">Undetected Cases</div>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl font-bold text-green-700 mb-2">60%</div>
            <div className="text-gray-600">Without Surveillance</div>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl font-bold text-green-700 mb-2">100%</div>
            <div className="text-gray-600">Preventable</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      {/* Features Section */}
      <section id="product" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">About VoxSilva</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced solution to protect Indonesia's forests from illegal logging using AI and IoT technology.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
            <div className="relative w-full aspect-w-4 aspect-h-3 rounded-xl overflow-hidden shadow-md">
              <img 
                src={heroImage} 
                alt="VoxSilva" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-2xl text-green-600 mb-2">80%</div>
                <h3 className="text-xl font-semibold mb-2">Detection Accuracy</h3>
                <p className="text-gray-600">Advanced AI technology to detect illegal activities</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-2xl text-green-600 mb-2">Monitoring</div>
                <h3 className="text-xl font-semibold mb-2">Real-time</h3>
                <p className="text-gray-600">24/7 monitoring with instant notifications</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-2xl text-green-600 mb-2">Eco-Friendly</div>
                <h3 className="text-xl font-semibold mb-2">Solar Powered</h3>
                <p className="text-gray-600">Solar-powered for sustainable operations</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Visi & Misi Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Vision & Mission</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visi Box */}
            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-green-600 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col">
              <div className="flex items-center mb-4">
                <img 
                  src={visionImage} 
                  alt="Visi" 
                  className="w-10 h-10 object-contain mr-4"
                />
                <h3 className="text-2xl font-bold text-gray-800">Vision</h3>
              </div>
              <div className="flex-grow flex flex-col">
                <p className="text-gray-600">
                  To be the leading solution in Indonesian forest protection through cutting-edge technology innovation to create a better environment for future generations.
                </p>
              </div>
            </div>
            
            {/* Misi Box */}
            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-green-600 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col">
              <div className="flex items-center mb-4">
                <img 
                  src={missionImage} 
                  alt="Misi" 
                  className="w-10 h-10 object-contain mr-4"
                />
                <h3 className="text-2xl font-bold text-gray-800">Mission</h3>
              </div>
              <div className="flex-grow flex flex-col">
                <ul className="space-y-3 mt-4">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-600">Develop AI-based forest monitoring solutions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-600">Support Indonesian forest conservation efforts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-600">Prevent illegal logging and forest damage</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Forest Impact Section */}
      <section className="relative min-h-screen py-12 sm:py-0 sm:h-auto sm:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          >
            <source src="https://player.vimeo.com/external/447554625.hd.mp4?s=d5f3da46ddc17aa69a7def84fa3a268ab404a44b&profile_id=175&oauth2_token_id=57447761" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-green-400 font-semibold text-xs sm:text-base tracking-wider">ENVIRONMENTAL IMPACT</span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-2 sm:mt-4 mb-2 sm:mb-6 leading-tight">
              Protecting Forests
            </h2>
            <p className="text-sm sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
              Together preserving the lungs of our planet
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-10 md:mt-16 px-2 sm:px-0">
              {[
                {
                  image: sdgImage1,
                  label: 'Pohon Terlindungi'
                },
                {
                  image: sdgImage2,
                  label: 'Spesies'
                },
                {
                  image: sdgImage3,
                  label: 'Komunitas'
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center justify-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <img 
                    src={item.image} 
                    alt={item.label}
                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
                  />
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-12 sm:mt-16 mb-16 sm:mb-0"
            >
              <a 
                href="#contact"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
              >
                Bergabung dengan Kami
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Partners Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {[
              { image: partnerImage1 },
              { image: partnerImage2 },
              { image: partnerImage3 },
              { image: partnerImage4 },
            ].map((partner, index) => (
              <motion.div 
                key={index}
                className="flex items-center justify-center"
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={partner.image}
                  alt={`Partner ${index + 1}`}
                  className="w-full max-w-xs h-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="news" className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedGallery(item)}
              >
                <div className="w-full h-64 overflow-hidden">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 text-center">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Gallery */}
      <AnimatePresence>
        {selectedGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedGallery(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedGallery(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              >
                <FaTimes className="text-gray-700 text-xl" />
              </button>

              {/* Image */}
              <div className="w-full h-96 overflow-hidden rounded-t-2xl">
                <img
                  src={selectedGallery.image}
                  alt={selectedGallery.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {selectedGallery.title}
                </h2>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  {selectedGallery.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



      {/* Team Section */}
      <section id="team" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Development Team</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">The innovative team behind VoxSilva's forest monitoring solution</p>
          
          {/* Team Photo */}
          <div className="flex justify-center items-center mb-12">
            <div className="w-full max-w-5xl">
              <img 
                src={teamPhoto} 
                alt="Tim Pengembang VoxSilva"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {[
              { name: 'Narendra Nararya Nurhan', photo: memberNarendra },
              { name: 'Adel Erasmo Farasya', photo: memberAdel },
              { name: 'Aditya Sakti Nugraha', photo: memberAditya },
              { name: 'Aero Naufaly Fadian', photo: memberAero },
              { name: 'Muhammad Davino Ananda', photo: memberDavino },
              { name: 'W Javier', lastName: 'Rafa Ramadhan', photo: memberJavier }
            ].map((member, index) => {
              const [firstName, ...lastName] = member.name.split(' ');
              return (
                <motion.div 
                  key={index}
                  className="bg-white border-2 border-green-500 p-4 rounded-xl shadow-md text-center hover:shadow-lg hover:bg-gray-50 transition-all duration-300 flex flex-col h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-3 overflow-hidden border-2 border-green-600 flex items-center justify-center bg-white p-1">
                    <img 
                      src={member.photo} 
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">{member.name === 'W Javier' ? 'W Javier' : firstName}</h3>
                  <h4 className="text-sm sm:text-base text-gray-600">{member.name === 'W Javier' ? 'Rafa Ramadhan' : lastName.join(' ')}</h4>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
                  {/* Contact Section */}
      <section id="contact" className="py-16 bg-white scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Protect Indonesia's Forests?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Let's discuss how VoxSilva can help protect forests from illegal logging
            </p>
            <button className="bg-green-700 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-800 transition duration-300 mb-12">
              Contact Us
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
              <div>
                <h3 className="text-xl font-bold mb-6 text-gray-800">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700">Email</h4>
                    <p className="text-gray-600">voxsilva.official@gmail.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Phone</h4>
                    <p className="text-gray-600">+62 817-0701-981(elmo)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Social Media</h4>
                    <p className="text-gray-600">@voxsilva_id</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-6 text-gray-800">Send Us a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">Institution/Company</label>
                    <input
                      type="text"
                      id="institution"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Your institution/company name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      id="message"
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-700 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-800 transition duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
