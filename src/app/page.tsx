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
        <title>Dentist Finder</title>
        <meta name="description" content="Find dentists near you with ease." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main container for the page content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-blue-700">
          Welcome to Dentist Finder
        </h1>
          <SearchComponent/>
        {/* Map Component is inside SearchComponent*/}
      

        {/* Additional content goes here */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Our Services</h2>
          <p className="text-lg leading-relaxed text-gray-600">
            Explore our platform to find dentists, read reviews, and book appointments easily.
            Our comprehensive listings help you make informed decisions about your dental care.
          </p>
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
