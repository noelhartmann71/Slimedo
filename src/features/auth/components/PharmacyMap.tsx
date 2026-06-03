import React, { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useUsercentricsConsent } from "@/hooks/useUsercentricsConsent";
import {
  googleMapsUsercentricsServiceName,
  type UsercentricsConsentState,
} from "@/lib/usercentrics";

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
  onPharmaciesFound,
  onPharmacySelect,
  ...props
}) => {
  const { status, isGranted, openSettings } = useUsercentricsConsent(
    googleMapsUsercentricsServiceName,
  );

  useEffect(() => {
    if (!isGranted) {
      onPharmaciesFound?.([]);
      onPharmacySelect?.(null);
    }
  }, [isGranted, onPharmaciesFound, onPharmacySelect]);

  if (!isGranted) {
    return (
      <GoogleMapsConsentPlaceholder
        status={status}
        onOpenSettings={() => {
          void openSettings().then((didOpen) => {
            if (!didOpen) {
              console.warn(
                "Usercentrics is not available yet. Verify VITE_USERCENTRICS_SETTINGS_ID and CMP loading.",
              );
            }
          });
        }}
      />
    );
  }

  return (
    <ConsentedPharmacyMap
      {...props}
      onPharmaciesFound={onPharmaciesFound}
      onPharmacySelect={onPharmacySelect}
    />
  );
};

const ConsentedPharmacyMap: React.FC<PharmacyMapProps> = ({
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

function GoogleMapsConsentPlaceholder({
  status,
  onOpenSettings,
}: {
  status: UsercentricsConsentState;
  onOpenSettings: () => void;
}) {
  const isUnconfigured = status === "unconfigured";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: 320,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        borderRadius: 16,
        border: "1px solid rgba(30,58,46,.16)",
        background:
          "linear-gradient(135deg, rgba(250,245,234,.96), rgba(205,221,203,.42))",
        color: "#1E3A2E",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 420 }}>
        <p
          style={{
            margin: "0 0 8px",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          Google Maps ist deaktiviert
        </p>
        <p
          style={{
            margin: "0 0 18px",
            fontSize: 14,
            lineHeight: 1.55,
            color: "rgba(30,58,46,.72)",
          }}
        >
          {isUnconfigured
            ? "Die Cookie-Verwaltung ist noch nicht konfiguriert. Sobald die Usercentrics Settings ID gesetzt ist, kann die Karte consent-basiert geladen werden."
            : "Zur Anzeige der Apothekenkarte wird Google Maps verwendet. Bitte erlaube Google Maps in den Cookie-Einstellungen."}
        </p>
        <button
          type="button"
          onClick={onOpenSettings}
          disabled={isUnconfigured}
          style={{
            border: "none",
            borderRadius: 999,
            background: isUnconfigured ? "rgba(61,92,74,.35)" : "#3D5C4A",
            color: "#FAF5EA",
            cursor: isUnconfigured ? "not-allowed" : "pointer",
            fontSize: 13,
            fontWeight: 700,
            padding: "10px 16px",
            fontFamily: '"Inter", sans-serif',
          }}
        >
          Cookie-Einstellungen öffnen
        </button>
      </div>
    </div>
  );
}

export default React.memo(PharmacyMap);
