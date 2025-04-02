import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/lib/products';
import ProductGrid from '@/components/ProductGrid';
import AnimatedSection from '@/components/AnimatedSection';

export default function AllProductsPage() {
  // All products will be displayed here
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Main content with padding to account for fixed navbar */}
      <main className="flex-grow pt-16">
        {/* Page header */}
        <div className="bg-gray-100 dark:bg-gray-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInBlur" threshold={0.3}>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
                All Collections
              </h1>
              <p className="mt-4 text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Browse our complete catalog of high-quality clothing for men and women.
                From casual essentials to statement pieces, find your perfect style.
              </p>
            </AnimatedSection>
          </div>
        </div>
        
        {/* Products section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection 
              animation="slideInUp" 
              delay={0.2}
              threshold={0.1}
              staggerChildren={true}
              staggerDelay={0.1}
            >
              {products.length > 0 ? (
                <ProductGrid products={products} isAnimated={true} />
              ) : (
                <p className="text-center text-gray-600 dark:text-gray-300">
                  No products available at the moment. Please check back soon.
                </p>
              )}
            </AnimatedSection>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 