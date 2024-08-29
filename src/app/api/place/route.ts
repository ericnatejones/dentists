// app/api/place-details/route.ts

import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export async function POST(request: Request) {
  const { placeId } = await request.json();

  // Check if placeId is provided
  if (!placeId) {
    return NextResponse.json({ error: 'placeId is required' }, { status: 400 });
  }

  // Check if GOOGLE_API_KEY is available
  if (!GOOGLE_API_KEY) {
    return NextResponse.json({ error: 'Google Maps API key is not configured' }, { status: 500 });
  }

  try {
    // Make API request to Google Maps
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
      params: {
        place_id: placeId,
        key: GOOGLE_API_KEY,
      },
    });

    // Extract place details from response
    const placeDetails = response.data.result;

    // Return place details as JSON response
    return NextResponse.json(placeDetails);
  } catch (error) {
    console.error('Error fetching place details:', error);

    // Safely handle the error
    const errorMessage = (error as AxiosError).message || 'Error fetching place details';

    // Return error response with details
    return NextResponse.json({
      error: errorMessage,
    }, { status: 500 });
  }
}
