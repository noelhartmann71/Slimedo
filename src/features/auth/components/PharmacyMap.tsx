import React, { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

interface PharmacyMapProps {
  center: {
    lat: number;
    lng: number;
  };
  onPharmaciesFound?: (pharmacies: Pharmacy[]) => void;
  onPharmacySelect?: (pharmacy: Pharmacy | null) => void;
  selectedPharmacyId?: string | null;
}

export interface Pharmacy {
  place_id: string;
  name: string;
  vicinity: string;
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
  rating?: number;
  user_ratings_total?: number;
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const libraries: "places"[] = ["places"];

const PharmacyMap: React.FC<PharmacyMapProps> = ({
  center,
  onPharmaciesFound,
  onPharmacySelect,
  selectedPharmacyId,
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries: libraries,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(
    null,
  );

  // Sync internal selection with external prop
  useEffect(() => {
    if (selectedPharmacyId) {
      const found = pharmacies.find((p) => p.place_id === selectedPharmacyId);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (found) setSelectedPharmacy(found);
    } else {
      setSelectedPharmacy(null);
    }
  }, [selectedPharmacyId, pharmacies]);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  useEffect(() => {
    if (isLoaded && map && center) {
      const service = new google.maps.places.PlacesService(map);
      const request: google.maps.places.PlaceSearchRequest = {
        location: center,
        radius: 5000, // 5km radius
        type: "pharmacy",
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const formattedResults = results as Pharmacy[];
          setPharmacies(formattedResults);
          if (onPharmaciesFound) onPharmaciesFound(formattedResults);
        }
      });
    }
  }, [isLoaded, map, center, onPharmaciesFound]);

  const handleMarkerClick = (pharmacy: Pharmacy) => {
    setSelectedPharmacy(pharmacy);
    if (onPharmacySelect) onPharmacySelect(pharmacy);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        disableDefaultUI: false,
        zoomControl: true,
      }}
    >
      {/* User location marker */}
      <Marker
        position={center}
        icon={{
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        }}
        title="Ihre Position"
      />

      {/* Pharmacy markers */}
      {pharmacies.map((pharmacy) => (
        <Marker
          key={pharmacy.place_id}
          position={{
            lat: pharmacy.geometry.location.lat(),
            lng: pharmacy.geometry.location.lng(),
          }}
          onClick={() => handleMarkerClick(pharmacy)}
          title={pharmacy.name}
          animation={
            selectedPharmacyId === pharmacy.place_id
              ? google.maps.Animation.BOUNCE
              : undefined
          }
        />
      ))}

      {selectedPharmacy && (
        <InfoWindow
          position={{
            lat: selectedPharmacy.geometry.location.lat(),
            lng: selectedPharmacy.geometry.location.lng(),
          }}
          onCloseClick={() => {
            setSelectedPharmacy(null);
            if (onPharmacySelect) onPharmacySelect(null);
          }}
        >
          <div className="p-2">
            <h3 className="font-bold text-sm">{selectedPharmacy.name}</h3>
            <p className="text-xs">{selectedPharmacy.vicinity}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default React.memo(PharmacyMap);
