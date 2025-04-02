import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Main content with padding to account for fixed navbar */}
      <main className="flex-grow pt-16">
        {/* Hero section with elegant typography */}
        <div className="bg-gray-50 dark:bg-gray-800 py-16 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              Our Heritage
            </h1>
            <div className="w-16 h-1 bg-blue-600 mx-auto my-4"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
              Crafting quality apparel since 2023, StyleHub combines timeless elegance with modern sensibilities.
            </p>
          </div>
        </div>
        
        {/* Mission statement with classic styling */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
                <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">Store Interior</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-6">Our Philosophy</h2>
                <div className="prose dark:prose-invert prose-lg">
                  <p className="text-gray-600 dark:text-gray-300 mb-6 font-light leading-relaxed">
                    StyleHub was founded with an unwavering commitment to quality and timeless design. We believe that true style transcends seasonal trends, creating a lasting impression through exceptional craftsmanship and attention to detail.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                    Our curated collections reflect our dedication to providing garments that stand the test of time—both in durability and aesthetic appeal. Each piece tells a story of meticulous design and ethical production practices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values section with classic columns */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">Our Core Values</h2>
              <div className="w-16 h-1 bg-blue-600 mx-auto my-4"></div>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
                The principles that guide us in every decision we make
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-semibold text-gray-900 dark:text-white mb-2">Excellence</h3>
                <p className="text-gray-600 dark:text-gray-300 font-light">
                  We source only the finest materials and work with craftspeople who share our commitment to exceptional quality.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-semibold text-gray-900 dark:text-white mb-2">Sustainability</h3>
                <p className="text-gray-600 dark:text-gray-300 font-light">
                  We maintain a steadfast commitment to ethical sourcing and environmentally responsible production practices.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-semibold text-gray-900 dark:text-white mb-2">Inclusivity</h3>
                <p className="text-gray-600 dark:text-gray-300 font-light">
                  We celebrate diversity and create timeless pieces that empower individuals to express their authentic selves.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-semibold text-gray-900 dark:text-white mb-2">Service</h3>
                <p className="text-gray-600 dark:text-gray-300 font-light">
                  We are dedicated to providing an unparalleled customer experience with personalized attention and care.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Heritage timeline with elegant styling */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">Our Journey</h2>
              <div className="w-16 h-1 bg-blue-600 mx-auto my-4"></div>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
                The milestones that have shaped our heritage
              </p>
            </div>
            
            <div className="relative border-l border-gray-300 dark:border-gray-700 ml-6 md:ml-0 md:mx-auto md:max-w-3xl pl-8 md:pl-0">
              <div className="mb-12 md:grid md:grid-cols-2 md:items-center md:gap-x-16">
                <div className="md:col-start-1">
                  <div className="flex items-center mb-2">
                    <div className="absolute left-0 w-4 h-4 bg-blue-600 rounded-full -ml-2"></div>
                    <div className="font-serif font-bold text-xl text-gray-900 dark:text-white">2023</div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Founding</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-light">
                    StyleHub was established with the vision of creating timeless fashion that combines quality craftsmanship with accessible luxury.
                  </p>
                </div>
              </div>
              
              <div className="mb-12 md:grid md:grid-cols-2 md:items-center md:gap-x-16">
                <div className="md:col-start-2">
                  <div className="flex items-center mb-2 md:justify-end">
                    <div className="font-serif font-bold text-xl text-gray-900 dark:text-white">2023</div>
                    <div className="absolute left-0 w-4 h-4 bg-blue-600 rounded-full -ml-2 md:left-1/2 md:ml-0 md:-translate-x-2"></div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">First Collection</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-light">
                    Our debut collection launched to acclaim, establishing our signature aesthetic of refined simplicity and attention to detail.
                  </p>
                </div>
              </div>
              
              <div className="md:grid md:grid-cols-2 md:items-center md:gap-x-16">
                <div className="md:col-start-1">
                  <div className="flex items-center mb-2">
                    <div className="absolute left-0 w-4 h-4 bg-blue-600 rounded-full -ml-2"></div>
                    <div className="font-serif font-bold text-xl text-gray-900 dark:text-white">2024</div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Expansion</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-light">
                    StyleHub continues to grow, broadening our collections while maintaining our commitment to quality and timeless design.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Leadership team with elegant styling */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">Our Leadership</h2>
              <div className="w-16 h-1 bg-blue-600 mx-auto my-4"></div>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
                The visionaries guiding our path forward
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md">
                <div className="aspect-w-1 aspect-h-1 relative h-80 bg-gray-100 dark:bg-gray-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">CEO Portrait</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-semibold text-gray-900 dark:text-white">Alexandra Chen</h3>
                  <p className="text-blue-600 dark:text-blue-400 mb-4">Founder & CEO</p>
                  <p className="text-gray-600 dark:text-gray-300 font-light">
                    With over 15 years in luxury fashion, Alexandra brings a wealth of experience and a refined aesthetic vision to StyleHub.
                  </p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md">
                <div className="aspect-w-1 aspect-h-1 relative h-80 bg-gray-100 dark:bg-gray-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">Creative Director Portrait</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-semibold text-gray-900 dark:text-white">Marcus Johnson</h3>
                  <p className="text-blue-600 dark:text-blue-400 mb-4">Creative Director</p>
                  <p className="text-gray-600 dark:text-gray-300 font-light">
                    Marcus oversees our design studio, ensuring each collection embodies our commitment to timeless elegance and quality.
                  </p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md">
                <div className="aspect-w-1 aspect-h-1 relative h-80 bg-gray-100 dark:bg-gray-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">Operations Director Portrait</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-semibold text-gray-900 dark:text-white">Sophia Rivera</h3>
                  <p className="text-blue-600 dark:text-blue-400 mb-4">Head of Operations</p>
                  <p className="text-gray-600 dark:text-gray-300 font-light">
                    Sophia leads our ethical supply chain initiatives, ensuring our production meets the highest standards of quality and responsibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact invitation with elegant styling */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">Experience StyleHub</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto my-4"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light mb-8">
              We invite you to explore our collections and experience the StyleHub difference—where quality meets timeless design.
            </p>
            <a 
              href="/category/men" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300 mr-4"
            >
              Shop Men
            </a>
            <a 
              href="/category/women" 
              className="inline-block bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 font-medium py-3 px-8 rounded-md transition-colors duration-300"
            >
              Shop Women
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}