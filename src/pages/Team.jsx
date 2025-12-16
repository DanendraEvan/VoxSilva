import { motion } from 'framer-motion';

const Team = () => {
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'CEO & Founder',
      bio: 'Forestry expert with 15+ years of experience in environmental conservation.',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      name: 'Jane Smith',
      role: 'CTO',
      bio: 'AI and IoT specialist passionate about using technology for environmental protection.',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      name: 'Alex Johnson',
      role: 'Lead Developer',
      bio: 'Full-stack developer with expertise in cloud computing and data analysis.',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
      name: 'Sarah Williams',
      role: 'Head of Research',
      bio: 'Environmental scientist focused on sustainable forest management practices.',
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    {
      name: 'Michael Brown',
      role: 'Hardware Engineer',
      bio: 'Expert in designing rugged and reliable hardware for extreme conditions.',
      image: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      name: 'Emily Davis',
      role: 'UX/UI Designer',
      bio: 'Creating intuitive interfaces that make complex data easy to understand.',
      image: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
  ];

  return (
    <div className="min-h-screen py-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Team
          </motion.h1>
          <motion.p 
            className="text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Meet the passionate individuals working to protect our forests
          </motion.p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-64 bg-gray-200 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                  <div className="mt-4 flex space-x-4">
                    <a href="https://linkedin.com/company/voxsilva" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a href="https://twitter.com/voxsilva" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Sustainability',
                description: 'We are committed to developing solutions that promote environmental sustainability and protect our planet for future generations.'
              },
              {
                title: 'Innovation',
                description: 'We constantly push the boundaries of technology to create cutting-edge solutions for forest conservation.'
              },
              {
                title: 'Collaboration',
                description: 'We believe in the power of collaboration and work closely with communities, governments, and organizations to achieve our mission.'
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold text-primary mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We're always looking for talented and passionate individuals to join our mission of protecting the world's forests.
          </p>
          <a 
            href="/careers" 
            className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300"
          >
            View Open Positions
          </a>
        </div>
      </section>
    </div>
  );
};

export default Team;
