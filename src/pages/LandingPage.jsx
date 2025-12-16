import { motion } from 'framer-motion';
import fotoProduk from './fotoProduk.png';

const LandingPage = () => {
  // Features data
  const features = [
    {
      icon: '🔍',
      title: 'Real-time Monitoring',
      description: '24/7 monitoring of forest conditions and wildlife activities.',
      category: 'Monitoring'
    },
    {
      icon: '🌳',
      title: 'Deforestation Alerts',
      description: 'Instant notifications for any unauthorized tree cutting activities.',
      category: 'Protection'
    },
    {
      icon: '🛰️',
      title: 'Satellite Integration',
      description: 'Combined with satellite data for comprehensive coverage.',
      category: 'Technology'
    }
  ];

  // Team members data
  const team = [
    { name: 'Dr. Sarah Chen', role: 'Lead AI Engineer', expertise: 'Machine Learning & Computer Vision' },
    { name: 'Michael Rodriguez', role: 'Hardware Specialist', expertise: 'IoT & Sensor Technology' },
    { name: 'Aisha Patel', role: 'Environmental Scientist', expertise: 'Forest Ecology & Conservation' },
    { name: 'David Kim', role: 'Software Architect', expertise: 'Cloud Computing & Big Data' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section id="home" className="bg-white py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between py-12">
            <div className="max-w-2xl text-center md:text-left mb-10 md:mb-0">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-green-600">Smart Forest Monitoring System</span>
              </motion.h1>
              <motion.p 
                className="text-xl mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-gray-800">Protecting forests through advanced AI and IoT technology</span>
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-start w-full"
              >
                <a
                  href="#product"
                  className="bg-green-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-700 transition duration-300 text-center"
                >
                  Learn More
                </a>
                <a
                  href="#contact"
                  className="bg-transparent border-2 border-green-600 text-green-600 font-semibold px-8 py-3 rounded-lg hover:bg-green-600 hover:bg-opacity-10 transition duration-300 text-center"
                >
                  Contact Us
                </a>
              </motion.div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="bg-transparent">
                <div className="w-[500px] h-[500px] flex items-center justify-center">
                  <img 
                    src={fotoProduk} 
                    alt="Forest Monitoring Device" 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="product" className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Product</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Advanced forest monitoring solution powered by AI and IoT technology
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="md:w-1/2">
              <div className="w-full max-w-md mx-auto">
                <img 
                  src={fotoProduk} 
                  alt="VoxSilva Pro Device" 
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <h3 className="text-2xl font-semibold mb-4">VoxSilva Pro</h3>
              <p className="text-gray-600 mb-6">
                Our cutting-edge forest monitoring system combines advanced sensors, AI technology, and cloud computing to provide real-time insights and protection for forested areas.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">24/7 Real-time monitoring</span>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">AI-powered threat detection</span>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Weatherproof and durable design</span>
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300">
                  Request Demo
                </button>
                <button className="border-2 border-green-600 text-green-600 font-semibold px-6 py-3 rounded-lg hover:bg-green-50 transition duration-300">
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions for effective forest monitoring and protection
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <span className="text-sm text-green-600 font-medium">{feature.category}</span>
                <h3 className="text-xl font-semibold mt-2 mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the brilliant minds behind our innovative forest monitoring solutions
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-32 h-32 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl text-green-600">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-green-600 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-500">{member.expertise}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-green-50 rounded-xl p-8 md:p-12 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Get In Touch</h2>
              <p className="text-gray-600">Have questions? We'd love to hear from you.</p>
            </div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="How can we help you?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <div className="text-center">
                <button 
                  type="submit" 
                  className="bg-green-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
