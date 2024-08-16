// Import necessary components and libraries
import { NextPage } from 'next';
import MapComponent from '../components/Map'; // Adjust the path according to your project structure

const HomePage: NextPage = () => {
  return (
    <>
      {/* Head component for meta tags and page title */}
  

      {/* Main container for the page content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to Dentist Finder</h1>
        
        {/* Map Component */}
        <div className="map-container mb-8">
          <MapComponent />
        </div>

        {/* Additional content goes here */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
          <p>
            Explore our platform to find dentists, read reviews, and book appointments easily. Our
            comprehensive listings help you make informed decisions about your dental care.
          </p>
        </section>
      </main>

      {/* Footer section */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; {new Date().getFullYear()} Dentist Finder. All rights reserved.</p>
      </footer>
    </>
  );
};

export default HomePage;

