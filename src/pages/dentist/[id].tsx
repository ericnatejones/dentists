// pages/dentist/[id].tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';

interface Review {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
}

interface Dentist {
  name: string;
  address: string;
  rating: number;
  phoneNumber: string;
  website: string;
  isOpen: boolean;
  photos: { photo_reference: string }[];
}

const DentistDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [dentist, setDentist] = useState<Dentist | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (id) {
      const fetchDentistDetails = async () => {
        try {
          const response = await axios.post('/api/dentists', { searchQuery: id });
          setDentist(response.data[0]);
        } catch (error) {
          console.error('Error fetching dentist details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchDentistDetails();
    }
  }, [id]);

  useEffect(() => {
    if (dentist) {
      const fetchReviews = async () => {
        try {
          const response = await axios.post('/api/reviews', { placeId: dentist.place_id });
          setReviews(response.data);
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      };

      fetchReviews();
    }
  }, [dentist]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!dentist) {
    return <div className="flex justify-center items-center h-screen">Dentist not found</div>;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-400 to-purple-400 text-white py-16">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold">{dentist.name}</h1>
            <p className="mt-4 text-xl">{dentist.address}</p>
            <div className="mt-6">
              <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full">
                Rating: {dentist.rating} ⭐
              </span>
            </div>
          </div>
        </section>

        {/* Details Section */}
        <section className="py-12">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Details Card */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold mb-4">Contact Details</h2>
              <p className="text-gray-700 mb-2"><strong>Phone:</strong> {dentist.phoneNumber}</p>
              <p className="text-gray-700 mb-2"><strong>Website:</strong> <a href={dentist.website} className="text-blue-600">{dentist.website}</a></p>
              <p className="text-gray-700"><strong>Status:</strong> {dentist.isOpen ? 'Open Now' : 'Closed'}</p>
            </div>

            {/* Photos Card */}
            {dentist.photos && dentist.photos.length > 0 && (
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold mb-4">Photos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {dentist.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
                      alt={`Photo of ${dentist.name}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="bg-gray-100 py-12">
          <div className="container mx-auto">
            <h2 className="text-4xl font-semibold text-gray-800 mb-6 text-center">Reviews</h2>
            {reviews.length === 0 ? (
              <p className="text-center text-gray-500">No reviews available.</p>
            ) : (
              <div className="flex flex-wrap -mx-4">
                {reviews.map((review, index) => (
                  <div key={index} className="w-full md:w-1/3 px-4 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg h-full">
                      <div className="flex items-center mb-4">
                        <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                          {review.author_name[0]}
                        </div>
                        <div className="ml-4">
                          <h4 className="text-xl font-semibold">{review.author_name}</h4>
                          <p className="text-sm text-gray-500">{review.relative_time_description}</p>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{review.text}</p>

                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.911c.97 0 1.371 1.24.588 1.81l-3.975 2.885 1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.975-2.885-3.976 2.885c-.782.57-1.838-.197-1.538-1.118l1.518-4.674-3.976-2.885c-.782-.57-.382-1.81.588-1.81h4.911l1.518-4.674z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default DentistDetails;
