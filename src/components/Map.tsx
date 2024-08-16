"use client"
import axios from 'axios';
import { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 40.73061, // New York City as the default center
  lng: -111.882602,
};

// Test array of dentists with coordinates and Google Place IDs
const testDentists = [
  {
    id: 1,
    name: "Village Dental",
    position: { lat: 40.63878400000001, lng: -111.882602 },
    placeId: "ChIJn7GLiothUocRu5AufVW5xks"
  },
  {
    id: 2,
    name: "Salt Flats at Cottonwood",
    position: { lat: 40.6672784, lng: -111.96676 },
    placeId: "ChIJYXQkYpWJUocR1rHAnIUw2mI"
  },
  {
    id: 3,
    name: "Canyon Rim Dental",
    position: { lat: 40.6995777, lng: -111.8184336 },
    placeId: "ChIJabppfqVhUocRCmy2n75Infc"
  },
  {
    id: 4,
    name: "Genesis Dental of Salt Lake",
    position: { lat : 40.7655187, lng : -111.893706},
    placeId: "ChIJDxNuBGP1UocRrG7CSpVgDB8"
    
  }
];

const MapComponent: React.FC = () => {
    const [reviews, setReviews] = useState<{ [key: string]: any[] }>({});
    const fetchReviews = async (placeId: string, name: string) => {
      try {
        const response = await axios.post('/api/reviews', { placeId, name });

        setReviews((prevReviews) => ({
          ...prevReviews,
          [name]: response.data,
        }));
      } catch (error) {
        console.error('Yo, Error fetching reviews:', error);
      }
    };

    console.log(`mt-4 grid grid-cols-${Object.keys(reviews).length < 13 ? Object.keys(reviews).length : 12} gap-4`)
    return (
      <div className="w-full">
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
            {testDentists.map((dentist) => (
              <Marker
                key={dentist.id}
                position={dentist.position}
                onClick={() => fetchReviews(dentist.placeId, dentist.name)}
              />
            ))}
          </GoogleMap>
        </LoadScript>
  
        {/* Display reviews */}
        <div className={`mt-4 grid grid-cols-${Object.keys(reviews).length < 13 ? Object.keys(reviews).length : 12} gap-4`}>
         
          {  
          Object.keys(reviews).map((name) => (
            <div key={name} className="mb-4 col-span-1">
              <h2 className="text-xl font-bold">Reviews for: {name}</h2>
              <ul>
                {reviews[name]?.map((review: any, index: number) => (
                  <li key={index+name} className="mb-2 p-4 border border-gray-200 rounded-lg">
                    <p><strong>{review.author_name}:</strong> {review.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
};


export default MapComponent;
