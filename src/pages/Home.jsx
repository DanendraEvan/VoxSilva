import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaCheck, FaArrowRight } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';

// Import images from src/pages
import heroImage from './fotoProdukBenar.png';
import productImage from './fotoProdukBenar.png';
import news1 from './fotoProdukBenar.png';
import news2 from './fotoProdukBenar.png';
import news3 from './fotoProdukBenar.png';
import missionImage from './Mission.png';
import visionImage from './Visi.png';

const stats = [
  { number: '10K+', label: 'Pohon Dilindungi' },
  { number: '99.9%', label: 'Akurasi Deteksi' },
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

const news = [
  {
    date: 'January 2, 2025',
    category: 'Event',
    title: 'PURIVA Kerjasama dengan Puskesmas Mergangsan',
    excerpt: 'Kolaborasi ini bertujuan memperkuat akses dan kualitas layanan kesehatan masyarakat.',
    image: news1
  },
  {
    date: 'December 28, 2024',
    category: 'Collaboration',
    title: 'Uji coba PURIVA kepada Kepala SPPG Kemantren',
    excerpt: 'Uji coba awal dilakukan untuk memastikan efektivitas program sebelum diperluas.',
    image: news2
  },
  {
    date: 'December 20, 2024',
    category: 'Expansion',
    title: 'Mechanism of UV-C in Eliminating Pathogens',
    excerpt: 'UV-C light terbukti efektif dalam menghancurkan bakteri dan virus.',
    image: news3
  }
];

const Home = () => {
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-700">Sistem Perlindungan Hutan</h2>
              <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-2xl">
                Sistem pemantauan hutan cerdas menggunakan ESP32 CAM dan MIC untuk mencegah penebangan liar dan melindungi hutan Indonesia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-green-700 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-800 transition duration-300 flex items-center justify-center">
                  Jelajahi VoxSilva <IoIosArrowForward className="ml-2" />
                </button>
                <button className="border-2 border-green-700 text-green-700 font-semibold px-8 py-3 rounded-lg hover:bg-green-50 transition duration-300">
                  Lihat Demo
                </button>
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
      <div className="py-16 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-4">Masalah yang Kami Atasi</h2>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Penebangan hutan ilegal di Indonesia mengancam kelestarian alam dan ekosistem.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto px-4">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl font-bold text-green-700 mb-2">1.2 Jt</div>
            <div className="text-gray-600">Hektar Hutan Hilang/Tahun</div>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl font-bold text-green-700 mb-2">85%</div>
            <div className="text-gray-600">Kasus Tidak Terdeteksi</div>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl font-bold text-green-700 mb-2">60%</div>
            <div className="text-gray-600">Tanpa Pengawasan</div>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl font-bold text-green-700 mb-2">100%</div>
            <div className="text-gray-600">Dapat Dicegah</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      {/* Features Section */}
      <section id="product" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Tentang VoxSilva</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Solusi canggih untuk melindungi hutan Indonesia dari penebangan liar dengan teknologi AI dan IoT.
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
                <div className="text-2xl text-green-600 mb-2">99.9%</div>
                <h3 className="text-xl font-semibold mb-2">Akurasi Deteksi</h3>
                <p className="text-gray-600">Teknologi AI canggih untuk mendeteksi aktivitas ilegal</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-2xl text-green-600 mb-2">Pemantauan</div>
                <h3 className="text-xl font-semibold mb-2">Real-time</h3>
                <p className="text-gray-600">Pemantauan 24/7 dengan notifikasi instan</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-2xl text-green-600 mb-2">Ramah Lingkungan</div>
                <h3 className="text-xl font-semibold mb-2">Tenaga Surya</h3>
                <p className="text-gray-600">Bertenaga surya untuk operasional berkelanjutan</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Visi & Misi Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Visi & Misi</h2>
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
                <h3 className="text-2xl font-bold text-gray-800">Visi</h3>
              </div>
              <div className="flex-grow flex flex-col">
                <p className="text-gray-600">
                  Menjadi solusi terdepan dalam perlindungan hutan Indonesia melalui inovasi teknologi terkini untuk menciptakan lingkungan yang lebih baik bagi generasi mendatang.
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
                <h3 className="text-2xl font-bold text-gray-800">Misi</h3>
              </div>
              <div className="flex-grow flex flex-col">
                <ul className="space-y-3 mt-4">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-600">Mengembangkan solusi pemantauan hutan berbasis AI</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-600">Mendukung upaya pelestarian hutan Indonesia</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-600">Mencegah penebangan liar dan kerusakan hutan</span>
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
            <span className="text-green-400 font-semibold text-xs sm:text-base tracking-wider">DAMPAK LINGKUNGAN</span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-2 sm:mt-4 mb-2 sm:mb-6 leading-tight">
              Melindungi Hutan
            </h2>
            <p className="text-sm sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
              Bersama menjaga paru-paru dunia
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-10 md:mt-16 px-2 sm:px-0">
              {[
                {
                  icon: '🌳',
                  number: '10,000+',
                  label: 'Pohon Terlindungi',
                  description: 'Mencegah deforestasi ilegal'
                },
                {
                  icon: '🌍',
                  number: '500+',
                  label: 'Spesies',
                  description: 'Satwa liar yang dilindungi'
                },
                {
                  icon: '🏆',
                  number: '50+',
                  label: 'Komunitas',
                  description: 'Masyarakat yang didukung'
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-white/10 backdrop-blur-md p-2 sm:p-4 md:p-6 rounded-lg sm:rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="text-3xl sm:text-5xl mb-1 sm:mb-3">{item.icon}</div>
                  <div className="text-xl sm:text-4xl font-bold mb-0 sm:mb-1">{item.number}</div>
                  <div className="text-xs sm:text-lg font-semibold mb-0 sm:mb-1">{item.label}</div>
                  <div className="hidden sm:block text-xs text-gray-300">{item.description}</div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-12 sm:mt-16 mb-16 sm:mb-0"
            >
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
                Bergabung dengan Kami
              </button>
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
              { name: 'Ministry of Environment', logo: '🌲' },
              { name: 'Global Wildlife Fund', logo: '🐼' },
              { name: 'Forest Research Institute', logo: '🔬' },
              { name: 'EcoTech Solutions', logo: '🌍' },
            ].map((partner, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center p-6 rounded-xl bg-gray-50 hover:shadow-lg transition-all duration-300 w-full max-w-xs"
                whileHover={{ y: -5 }}
              >
                <div className="text-5xl mb-4">{partner.logo}</div>
                <h3 className="text-lg font-semibold text-gray-800 text-center">{partner.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="news" className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'New Forest Protection Initiative',
                date: 'November 28, 2023',
                excerpt: 'Launching a new initiative to protect endangered forest areas using our monitoring technology.',
                category: 'Announcement'
              },
              {
                title: 'AI Technology Breakthrough',
                date: 'November 20, 2023',
                excerpt: 'Our AI system now achieves 98% accuracy in detecting illegal logging activities.',
                category: 'Technology'
              },
              {
                title: 'Community Outreach Program',
                date: 'November 15, 2023',
                excerpt: 'Educating local communities about sustainable forest management practices.',
                category: 'Community'
              }
            ].map((news, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="text-sm text-green-600 font-medium">{news.category}</span>
                <h3 className="text-xl font-semibold mt-2 mb-3 text-gray-800">{news.title}</h3>
                <p className="text-gray-600 mb-4">{news.excerpt}</p>
                <span className="text-sm text-gray-500">{news.date}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Team Section */}
      <section id="team" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Tim Pengembang</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">Tim inovatif di balik solusi pemantauan hutan VoxSilva</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {[
              { name: 'Narendra Nararya Nurhan', role: 'Tim Pengembang', expertise: 'Full Stack Development' },
              { name: 'Adel Erasmo Farasya', role: 'Tim Pengembang', expertise: 'Hardware & IoT' },
              { name: 'Aditya Sakti Nugraha', role: 'Tim Pengembang', expertise: 'AI & Machine Learning' },
              { name: 'Aero Naufaly Fadian', role: 'Tim Pengembang', expertise: 'UI/UX Design' },
              { name: 'Muhammad Davino Ananda', role: 'Tim Pengembang', expertise: 'Backend Development' },
              { name: 'W Javier Rafa Ramadhan', role: 'Tim Pengembang', expertise: 'Mobile Development' }
            ].map((member, index) => (
              <motion.div 
                key={index}
                className="bg-white p-4 rounded-xl shadow-md text-center hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                whileHover={{ y: -5 }}
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl sm:text-3xl text-green-600">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">{member.name.split(' ')[0]}</h3>
                <h4 className="text-sm sm:text-base text-gray-700">{member.name.split(' ').slice(1).join(' ')}</h4>
                <p className="text-green-600 text-sm font-medium mt-2">{member.role}</p>
                <p className="text-xs text-gray-500 mt-1">{member.expertise}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
                  {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Siap Melindungi Hutan Indonesia?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Mari berdiskusi bagaimana VoxSilva dapat membantu melindungi hutan dari penebangan liar
            </p>
            <button className="bg-green-700 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-800 transition duration-300 mb-12">
              Hubungi Kami
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
              <div>
                <h3 className="text-xl font-bold mb-6 text-gray-800">Informasi Kontak</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700">Email</h4>
                    <p className="text-gray-600">voxsilva@example.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Telepon</h4>
                    <p className="text-gray-600">+62 812 3456 7890</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Media Sosial</h4>
                    <p className="text-gray-600">@voxsilva_id</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-6 text-gray-800">Kirim Pesan</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Nama Anda"
                    />
                  </div>
                  <div>
                    <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">Institusi/Perusahaan</label>
                    <input
                      type="text"
                      id="institution"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Nama institusi/perusahaan"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="email@contoh.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      id="message"
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Pesan Anda..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-700 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-800 transition duration-300"
                  >
                    Kirim Pesan
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
