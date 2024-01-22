import React, { useEffect, useRef } from 'react';

interface GeoAmpAutoFillProps {
  onPlaceSelect: (place: { address: string; latitude: number; longitude: number } | null) => void;
}

const GeoAmpAutoFill: React.FC<GeoAmpAutoFillProps> = ({ onPlaceSelect }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeAutocomplete;
      document.head.appendChild(script);
    };

    const initializeAutocomplete = () => {
      if (inputRef.current) {
        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ['geocode'],
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          console.log('Place selected:', place);

          if (place && place.geometry) {
            const { lat, lng } = place.geometry.location;
            const address = place.formatted_address;

            console.log('Latitude:', lat());
            console.log('Longitude:', lng());
            console.log('Address:', address);

            // Call the onPlaceSelect callback with the selected place details
            onPlaceSelect({
              address: address,
              latitude: lat(),
              longitude: lng(),
            });
          } else {
            console.error('No valid place selected.');
            // Call the onPlaceSelect callback with null if no valid place is selected
            onPlaceSelect(null);
          }
        });
      }
    };

    if (!window.google || !window.google.maps) {
      // Google Maps script hasn't been loaded yet
      loadGoogleMapsScript();
    } else {
      // Google Maps script is already loaded
      initializeAutocomplete();
    }
  }, [onPlaceSelect]);

  return (
    <>
      <input
        ref={inputRef}
        placeholder="Enter address here"
        className="rounded-md px-2 py-4 w-full border border-gray-300 hover:border-black"
      />
    </>
  );
};

export default GeoAmpAutoFill;
