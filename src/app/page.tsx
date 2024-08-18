// Import necessary components and libraries
'use client'
import { NextPage } from 'next';
import Head from 'next/head';
import SearchComponent from '../components/Search'; // Adjust the path according to your project structure

const HomePage: NextPage = () => {
  return (
    <>
      {/* Head component for meta tags and page title */}
      <Head>
        <title>Dente - Your Trusted Dentist Finder</title>
        <meta name="description" content="Easily discover trusted dentists near you and book appointments effortlessly." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main container for the page content */}
      <main className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('/cuteteeth.jpg')" }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative py-20 text-center">
          <h1 className="text-6xl font-extrabold text-white mb-8">
            Welcome to Dente
          </h1>
          <p className="text-2xl font-semibold text-white mb-16">
            Find your perfect dentist.
          </p>
          
          {/* Search Component */}
            <div className='inline-block'>
              <SearchComponent />
            </div>
        </div>

        {/* Additional content below the fold */}
        <section className="bg-white py-12">
          <div className="container mx-auto">
            <h2 className="text-4xl font-semibold mb-6 text-gray-800 text-center">
              Our Services
            </h2>
            <p className="text-lg leading-relaxed text-gray-600 text-center">
              Discover top-rated dentists, read authentic reviews, and book appointments all in one place. 
              We make dental care simpler, smarter, and more accessible for everyone.
            </p>
          </div>
        </section>
      </main>

      {/* Footer section */}
      <footer className="bg-blue-700 text-white py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Dentist Finder. All rights reserved.</p>
      </footer>
    </>
  );
};

export default HomePage;
