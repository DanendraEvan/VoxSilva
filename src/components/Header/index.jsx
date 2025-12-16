import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from './logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const navigation = [
    { name: 'Home', href: '#home', sectionId: 'home' },
    { name: 'Product', href: '#product', sectionId: 'product' },
    { name: 'News', href: '#news', sectionId: 'news' },
    { name: 'Team', href: '#team', sectionId: 'team' },
    { name: 'Contact', href: '#contact', sectionId: 'contact' },
  ];
  
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If not on home page, navigate to home with hash
      window.location.href = `/#${sectionId}`;
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-2">
        <div className="bg-white shadow-md rounded-full px-6 sm:px-10 py-2 sm:py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="flex-shrink-0">
              <img 
                src={logo} 
                alt="VoxSilva Logo" 
                className="h-12 w-auto"
              />
            </div>
            <span className="ml-3 text-xl font-bold text-primary">VoxSilva</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.sectionId)}
                className="text-gray-600 font-medium hover:text-primary transition"
              >
                {item.name}
              </a>
            ))}
            <a
              href="/login.html"
              className="px-4 py-2 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition"
            >
              Login
            </a>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary focus:outline-none"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-100">
          <div className="px-6 py-4 space-y-3">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.sectionId)}
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-800 hover:bg-gray-50 transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
            <a
              href="/login.html"
              className="block px-4 py-3 rounded-lg text-base font-semibold text-primary border border-primary hover:bg-primary hover:text-white transition-colors duration-200 text-center"
            >
              Login
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
