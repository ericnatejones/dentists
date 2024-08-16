import { NextResponse } from 'next/server';
import axios from 'axios';

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export async function POST(request: Request) {
  const { placeId } = await request.json();

  
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
      
      params: {
        place_id: placeId,
        fields: 'reviews',
        key: GOOGLE_API_KEY,
      },
      
      
    });

    const reviews = response.data.result.reviews;
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.error();
  }
}


// headers: { 'Access-Control-Allow-Origin' : '*', 'Content-Type': 'application/json',}