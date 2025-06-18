import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Twitter, MessageCircle , Send, Menu, X, MapPin, Star, Clock, Users } from 'lucide-react';


const destinations = [
  {
    id: 1,
    name: "Chania Old Town",
    image: "https://images.pexels.com/photos/13900763/pexels-photo-13900763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Explore the enchanting Venetian harbor and narrow cobblestone streets of Chania's historic old town.",
    rating: 4.9,
    duration: "Half Day",
    category: "Historic"
  },
  {
    id: 2,
    name: "Balos Lagoon",
    image: "https://images.pexels.com/photos/29399456/pexels-photo-29399456/free-photo-of-stunning-aerial-view-of-balos-beach-greece.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Experience the breathtaking turquoise waters and pink sand beaches of this iconic lagoon.",
    rating: 4.8,
    duration: "Full Day",
    category: "Beach"
  },
  {
    id: 3,
    name: "Knossos Palace",
    image: "https://images.pexels.com/photos/14322617/pexels-photo-14322617.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Discover the ancient Minoan civilization at Europe's oldest city and archaeological wonder.",
    rating: 4.7,
    duration: "3 Hours",
    category: "Archaeological"
  },
  {
    id: 4,
    name: "Samaria Gorge",
    image: "https://cdn.pixabay.com/photo/2017/09/30/14/21/edmund-gorge-2802225_1280.jpg",
    description: "Hike through one of Europe's longest gorges in the heart of the White Mountains.",
    rating: 4.6,
    duration: "Full Day",
    category: "Adventure"
  },
  {
    id: 5,
    name: "Elafonisi Beach",
    image: "https://images.pexels.com/photos/32279568/pexels-photo-32279568/free-photo-of-aerial-view-of-tropical-island-and-coral-reef.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Relax on the famous pink sand beach with crystal clear shallow waters.",
    rating: 4.9,
    duration: "Half Day",
    category: "Beach"
  },
  {
    id: 6,
    name: "Rethymno",
    image: "https://images.pexels.com/photos/723023/pexels-photo-723023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Wander through the perfectly preserved Renaissance town with Ottoman influences.",
    rating: 4.5,
    duration: "Half Day",
    category: "Historic"
  }
];

const stats = [
  { number: "1000+", label: "Happy Travelers", icon: Users },
  { number: "50+", label: "Destinations", icon: MapPin },
  { number: "4.8★", label: "Average Rating", icon: Star },
  { number: "24/7", label: "Support", icon: Clock }
];

export default function CretaLandingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isVisible, setIsVisible] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Beach', 'Historic', 'Archaeological', 'Adventure'];
  
  const filteredDestinations = activeFilter === 'All' 
    ? destinations 
    : destinations.filter(dest => dest.category === activeFilter);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("https://travel-landing-backend.onrender.com/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      alert(data.error || "Something went wrong");
    }
  } catch (err) {
    console.error("Submit error:", err);
    alert("Server error. Please try again later.");
  }
};


  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-teal-900/20"></div>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
              TRAVEL
            </h1>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-12">
              {['Home', 'Destinations', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="relative text-lg font-medium transition-all duration-300 hover:text-cyan-400 group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden transition-all duration-300 hover:text-cyan-400 hover:scale-110"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 rounded-b-2xl">
              <div className="px-2 pt-2 pb-6 space-y-1">
                {['Home', 'Destinations', 'About', 'Contact'].map((item, index) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left px-6 py-4 text-lg font-medium hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            transform: `translateY(${isScrolled ? '50px' : '0px'})`,
            transition: 'transform 0.5s ease-out'
          }}
        ></div>
        
        {/* Dark Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60 z-10"></div>
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}

        <div className="text-center z-20 px-4 max-w-6xl mx-auto">
          <div className={`transform transition-all duration-1500 ${
            isVisible.home ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <h1 className="font-black mb-8 text-7xl md:text-9xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent leading-tight">
              Discover
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                Places
              </span>
            </h1>
          </div>
          
          <p className={`mb-12 font-light text-2xl md:text-4xl text-gray-200 transform transition-all duration-1500 delay-300 ${
            isVisible.home ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            Where <span className="text-cyan-400 font-semibold">Ancient Legends</span> Meet <span className="text-blue-400 font-semibold">Azure Waters</span>
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transform transition-all duration-1500 delay-500 ${
            isVisible.home ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <button
              className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-5 px-10 rounded-2xl text-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 relative overflow-hidden"
              onClick={() => scrollToSection('destinations')}
            >
              <span className="relative z-10">Explore Destinations</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button
              className="group border-2 border-white/30 hover:border-cyan-400 text-white hover:text-cyan-400 font-bold py-5 px-10 rounded-2xl text-xl transform transition-all duration-300 hover:scale-105 backdrop-blur-sm hover:bg-white/10"
              onClick={() => scrollToSection('about')}
            >
              Learn More
            </button>
          </div>
        </div>
        
        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <div className="animate-bounce mb-2">
            <div className="w-1 h-16 bg-gradient-to-b from-cyan-400 to-transparent rounded-full"></div>
          </div>
          <span className="text-sm text-gray-300 animate-pulse">Scroll Down</span>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className={`text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transform transition-all duration-700 hover:scale-105 ${
                    isVisible.home ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <IconComponent className="w-8 h-8 mx-auto mb-4 text-cyan-400" />
                  <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 mt-2">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`mb-6 font-black text-5xl md:text-7xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent transform transition-all duration-1000 ${
              isVisible.destinations ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Popular Destinations
            </h2>
            <p className={`text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 delay-200 ${
              isVisible.destinations ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Discover the most breathtaking locations that make Crete a Mediterranean paradise beyond imagination
            </p>
          </div>

          {/* Filter Buttons */}
          <div className={`flex flex-wrap justify-center gap-4 mb-12 transform transition-all duration-1000 delay-400 ${
            isVisible.destinations ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white backdrop-blur-sm border border-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
              <div
                key={destination.id}
                className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transform transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10 ${
                  isVisible.destinations 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm font-semibold">{destination.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="bg-cyan-500/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {destination.category}
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {destination.duration}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {destination.name}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {destination.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className={`mb-12 font-black text-5xl md:text-7xl bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent transform transition-all duration-1000 ${
            isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            About This
          </h2>
          <div className={`bg-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-12 transform transition-all duration-1000 delay-300 ${
            isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <p className="leading-relaxed text-2xl md:text-3xl font-light text-gray-200 mb-8">
              It is not just an island—it's a <span className="text-cyan-400 font-semibold">living museum</span> where every stone tells a story of ancient civilizations, where <span className="text-blue-400 font-semibold">pristine beaches</span> meet dramatic mountains, and where warm hospitality welcomes travelers from around the world.
            </p>
            <p className="leading-relaxed text-xl text-gray-300">
              From the legendary Palace of Knossos to the stunning Balos Lagoon, experience the magic that has captivated visitors for millennia.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-center mb-6 font-black text-5xl md:text-7xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent transform transition-all duration-1000 ${
            isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Get in Touch
          </h2>
          <p className={`text-center mb-16 text-gray-300 text-xl transform transition-all duration-1000 delay-200 ${
            isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Ready to plan your dream vacation to Greece? We're here to help make it unforgettable!
          </p>
          
          <div className={`bg-white/5 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl transform transition-all duration-1000 delay-400 ${
            isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-gray-300 text-sm font-semibold mb-3">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-semibold mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-3">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                  rows="6"
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 resize-none text-white placeholder-gray-400 backdrop-blur-sm"
                  placeholder="Tell us about your dream vacation to Crete..."
                ></textarea>
              </div>
              
              <button
                   onClick={handleSubmit}
                    type="button"
                    className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-400 hover:via-pink-400 hover:to-red-400 text-white font-bold py-5 px-8 rounded-2xl text-xl transform transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-purple-500/25 flex items-center justify-center space-x-3 group"
              >
                <Send size={24} className="group-hover:translate-x-1 transition-transform duration-300" />
                <span>Send Message</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <h3 className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                TOURER
              </h3>
              <p className="text-gray-400 text-xl">
                Your gateway to the <span className="text-cyan-400">Mediterranean paradise</span>
              </p>
            </div>
            
            <div className="flex space-x-6">
  {[
    {
      icon: Facebook,
      color: 'hover:bg-blue-600',
      label: 'Facebook',
      href: 'https://facebook.com',
    },
    {
      icon: Instagram,
      color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600',
      label: 'Instagram',
      href: 'https://instagram.com',
    },
    {
      icon: Twitter,
      color: 'hover:bg-blue-400',
      label: 'Twitter',
      href: 'https://twitter.com',
    },
    {
      icon: MessageCircle,
      color: 'hover:bg-green-500', 
      label: 'WhatsApp',
      href: 'https://wa.me', 
    },
    {
      icon: Send,
      color: 'hover:bg-cyan-400',
      label: 'Telegram',
      href: 'https://t.me',
    }
  ].map((social, index) => {
    const IconComponent = social.icon;
    return (
      <a
        key={index}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.label}
        className={`p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl transform transition-all duration-300 hover:scale-110 ${social.color} hover:shadow-xl group`}
      >
        <IconComponent size={28} className="group-hover:scale-110 transition-transform duration-300" />
      </a>
    );
  })}
</div>

          </div>
          
          <div className="border-t border-white/10 pt-8 mt-12 text-center">
            <p className="text-gray-400 text-lg">
              © 2025 Gm Travel. All rights reserved. | Discover the magic of  Travel ✨
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
