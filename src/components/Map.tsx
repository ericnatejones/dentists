import axios from "axios";
import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};



interface Dentist {
  id: number;
  name: string;
  position: {
    lat: number;
    lng: number;
  };
  placeId: string;
}
interface MapComponentProps {
  searchQuery: string;
  searchActive: boolean;
}
const MapComponent: React.FC<MapComponentProps> = ({ searchQuery, searchActive }) => {
  const [reviews, setReviews] = useState<{ [key: string]: any[] }>({});
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false); // Track if map is loaded


  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await axios.post("/api/dentists", {searchQuery});

        // Map the response data to the desired format
        const formattedDentists: Dentist[] = response.data.map(
          (place: any, index: number) => ({
            id: index + 1, // Assigning an ID based on the index
            name: place.name,
            position: {
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng,
            },
            placeId: place.place_id,
          })
        );

        // Save the formatted data in state
        setDentists(formattedDentists);
      } catch (error) {
        console.error("Error fetching dentists:", error);
      }
    };

    fetchDentists();
    return () => {
      setDentists([]);
      setReviews({});
    };
  }, []);

  const fetchReviews = async (placeId: string, name: string) => {
    try {
      const response = await axios.post("/api/reviews", { placeId, name });

      setReviews((prevReviews) => ({
        ...prevReviews,
        [name]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const columns = Math.min(Object.keys(reviews).length, 12);

  return (
     <div className="w-full">{searchActive &&
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
        onLoad={() => setMapLoaded(true)} // Set mapLoaded to true when script is loaded
        onError={() => console.error('Failed to load Google Maps script')}
      >
        <GoogleMap mapContainerStyle={containerStyle} center={dentists[0]?.position || {lat: 40, lng: -111}} zoom={10}>
          {dentists.map((dentist) => (
            <Marker
              key={dentist.id}
              position={dentist.position}
              onClick={() => fetchReviews(dentist.placeId, dentist.name)}
            />
          ))}
        </GoogleMap>
      </LoadScript>}

      {/* Display reviews */}
      <div className={`mt-8 grid grid-cols-${columns} gap-6`}>
        {Object.keys(reviews).map((name) => (
          <div
            key={name}
            className="bg-white p-6 shadow-lg rounded-lg col-span-1"
          >
            <h2 className="text-2xl font-bold mb-4 text-blue-700">
              Reviews for: {name}
            </h2>
            <ul className="space-y-4">
              {reviews[name]?.map((review: any, index: number) => (
                <li
                  key={index + name}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <p>
                    <strong>{review.author_name}:</strong> {review.text}
                  </p>
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
