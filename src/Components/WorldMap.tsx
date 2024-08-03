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

const DefaultIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const fetchCountriesData = async () => {
  const { data } = await axios.get('https://disease.sh/v3/covid-19/countries');
  return data;
};

const WorldMap: React.FC = () => {
  const dispatch = useDispatch();

  // Dispatch showLoader immediately when component mounts
  useEffect(() => {
    dispatch(showLoader());
  }, [dispatch]);

  const { data, error, isLoading } = useQuery('countriesData', fetchCountriesData, {
    onSettled: () => dispatch(hideLoader()),
    onError: () => dispatch(hideLoader()),
  });

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader());
    }
  }, [isLoading, dispatch]);

  if (isLoading || !data) {
    return null; // Avoid showing the component before the data is available
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="relative w-full h-96 md:h-[500px] lg:h-[600px]">
      <MapContainer center={[0, 0]} zoom={2} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {data.map((country: any, index: number) => {
          const uniqueKey = country.countryInfo._id ? `${country.countryInfo._id}-${index}` : `${index}`;
          return (
            <Marker key={uniqueKey} position={[country.countryInfo.lat, country.countryInfo.long]}>
              <Popup>
                <div>
                  <h3>{country.country}</h3>
                  <p>Cases: {country.cases}</p>
                  <p>Recovered: {country.recovered}</p>
                  <p>Deaths: {country.deaths}</p>
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