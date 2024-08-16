import { NextResponse } from 'next/server';
import axios from 'axios';

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export async function POST(request: Request) {
  
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      
      params: {
        query: 'dentists+in+Salt+Lake+City',
        key: GOOGLE_API_KEY,
      },
      
      
    });

    // console.log(Object.keys(response.data.results))
    return NextResponse.json(response.data.results);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.error();
  }
}


