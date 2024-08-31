
'use client'
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import SearchComponent from '../components/Search'; 
import Layout from '../components/Layout'
import React, {useState} from 'react';
import "../app/globals.css";
import { LoadScript } from '@react-google-maps/api';

const HomePage: NextPage = () => {
  const router = useRouter();
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);


  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim();  // Trim leading and trailing spaces

    if (trimmedQuery) {  // Check if the trimmed query is not empty
      const formattedQuery = trimmedQuery.replace(/[\s,]+/g, '-');  // Replace spaces and commas with dashes

         router.push(`/${encodeURIComponent(formattedQuery)}`);  // URL encode the query and navigate
    }
  };


  return (
    <><Layout>
      <Head>
        <title>Dente - Your Trusted Dentist Finder</title>
        <meta name="description" content="Easily discover trusted dentists near you and book appointments effortlessly." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     
      <main className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('/cuteteeth.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative py-20 text-center">
          <h1 className="text-6xl font-extrabold text-white mb-8">
            Welcome to Dente
          </h1>
          <p className="text-2xl font-semibold text-white mb-16">
            Find your perfect dentist.
          </p>
          
          <div className='inline-block'>
            <div className="items-center justify-center bg-white p-10 rounded-lg shadow-xl transition-all duration-500 ease-in-out">
              <div className="transition-all duration-500 ease-in-out">
                {/* Pass handleSearch as a prop */}
                <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
          onLoad={() => setMapLoaded(true)}
          onError={() => console.error('Failed to load Google Maps script')}
        >
                { mapLoaded && <SearchComponent handleSearch={handleSearch} /> }
                </LoadScript>
              </div>
            </div>
          </div>
        </div>

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

      <footer className="bg-blue-700 text-white py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Dentist Finder. All rights reserved.</p>
      </footer>
    </Layout>
    </>
  );
};

export default HomePage;
