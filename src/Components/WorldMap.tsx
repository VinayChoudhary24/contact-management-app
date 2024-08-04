import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { showLoader, hideLoader } from '../Slices/loaderSlice';

// Fix default marker icons not loading
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Define the default icon for Leaflet markers
const DefaultIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [17, 33],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Function to fetch COVID-19 data for different countries
const fetchCountriesData = async () => {
  const { data } = await axios.get('https://disease.sh/v3/covid-19/countries');
  return data;
};

/**
 * WorldMap component - displays a map with COVID-19 data for different countries.
 * @returns {JSX.Element | null}
 */
const WorldMap: React.FC = () => {
  const dispatch = useDispatch();

  // Show loader when component mounts
  useEffect(() => {
    dispatch(showLoader());
  }, [dispatch]);

  // Fetch country data and manage loading state
  const { data, error, isLoading } = useQuery('countriesData', fetchCountriesData, {
    onSettled: () => dispatch(hideLoader()),
    onError: () => dispatch(hideLoader()),
  });

  // Show loader while data is being loaded
  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader());
    }
  }, [isLoading, dispatch]);

  // Render nothing if data is still loading
  if (isLoading || !data) {
    return null;
  }

  // Show error message if data failed to load
  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="relative w-full h-64 sm:h-72 md:h-96 lg:h-[600px]">
      <MapContainer center={[0, 0]} zoom={2} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {data.map((country: any, index: number) => {
          const uniqueKey = country.countryInfo._id ? `${country.countryInfo._id}-${index}` : `${index}`;
          return (
            <Marker key={uniqueKey} position={[country.countryInfo.lat, country.countryInfo.long]}>
              <Popup>
                <div>
                  <h3 className="text-sm md:text-base lg:text-lg font-medium">{country.country}</h3>
                  <p className="text-xs md:text-sm lg:text-base">Cases: {country.cases}</p>
                  <p className="text-xs md:text-sm lg:text-base">Recovered: {country.recovered}</p>
                  <p className="text-xs md:text-sm lg:text-base">Deaths: {country.deaths}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default WorldMap;