import axios from "axios";
import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Card from './Card'

const containerStyle = {
  width: "100%",
  height: "400px",
};
interface Photo{
  photo_reference: string
}

export interface Dentist {
  id: number;
  name: string;
  position: {
    lat: number;
    lng: number;
  };
  placeId: string;
  rating: number;
  address: string;
  status: string;
  imageUrl: string;
  photos: Photo[]
}

interface MapComponentProps {
  searchQuery: string;
  searchActive: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({ searchQuery, searchActive }) => {
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [showCards, setShowCards] = useState<boolean>(false);

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await axios.post("/api/dentists", { searchQuery });

        const formattedDentists: Dentist[] = response.data.map(
          (place: any, index: number) => ({
            id: index + 1,
            name: place.name,
            position: {
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng,
            },
            placeId: place.place_id,
            rating: place.rating || 0,
            address: place.vicinity || "Unknown Address",
            status: place.business_status || "Operational",
            photos: place.photos,
            opening_hours: place.opening_hours
          })
        );
        console.log(response.data[0].photos[0].photo_reference)
        setDentists(formattedDentists);
        setShowCards(true);
      } catch (error) {
        console.error("Error fetching dentists:", error);
      }
    };

    if (searchQuery) {
      fetchDentists();
    }

    return () => {
      setDentists([]);
    };
  }, [searchQuery]);

  return ( 
    <div className={`w-screen flex transition-all duration-700 ease-in-out`}>
      {searchActive && (
        <>
          <div className="w-full h-screen flex-1 md:w-2/3">
            <LoadScript
              googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
              onLoad={() => setMapLoaded(true)}
              onError={() => console.error('Failed to load Google Maps script')}
            >
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "100vh"
                }}
                center={dentists[0]?.position || { lat: 40, lng: -111 }}
                zoom={10}
              >
                {dentists.map((dentist) => (
                  <Marker
                    key={dentist.id}
                    position={dentist.position}
                  />
                ))}
              </GoogleMap>
            </LoadScript>
          </div>

          {showCards && (
            <div className="flex flex-col w-full md:w-1/3 p-4 space-y-4 overflow-y-auto" style={{ height: "calc(100vh - 0px)"}}>
              {dentists.map((dentist) => (
                <Card dentist={dentist}/>
              ))}
            </div>
          )}
        </>
      )}
    </div>
    
  );
};

export default MapComponent;