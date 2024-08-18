import React from 'react';
import { Dentist } from './Map';

type Props = {
  dentist: Dentist;
};

export default function Card({ dentist }: Props) {
  console.log(dentist);
  const photoUrl = dentist.photos?.length > 0
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${dentist.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    : "/placeholder-image.jpg"; // Default placeholder if no photos

  return (
    <div key={dentist.id} className="bg-white shadow-lg rounded-lg w-full">
      <div className="relative w-full h-48">
        <img 
          src={photoUrl}
          alt={dentist.name} 
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{dentist.name}</h3>
        <p className="text-sm text-gray-600 mb-1">Rating: {dentist.rating} ★</p>
        <p className="text-xs text-gray-600 mb-1">{dentist.address}</p>
        <p className="text-sm text-red-600">{dentist.isOpen ? "open" : "closed"}</p>
      </div>
    </div>
  );
}
