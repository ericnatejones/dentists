'use client'
import { useRouter } from 'next/router';
import MapComponent from '../components/Map'; // Adjust the path according to your project structure
import Layout from '../components/Layout'

const SearchResultsPage: React.FC = () => {
  const router = useRouter();
  const place = Array.isArray(router.query.place) ? router.query.place[0] : router.query.place; // Handle place as string or array

  if (!place) return <p>Loading...</p>;

  return (
    <Layout>
    <div className="w-full h-screen bg-gray-100 p-4">
    <div className='inline-block'>
            <div className="items-center justify-center bg-white p-10 rounded-lg shadow-xl transition-all duration-500 ease-in-out">
              <div className="transition-all duration-500 ease-in-out">
      <MapComponent place={place} />
      </div>
      </div>
      </div>
    </div>
    </Layout>
  );
};

export default SearchResultsPage;
