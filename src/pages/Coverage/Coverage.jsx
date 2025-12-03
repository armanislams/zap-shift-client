import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const serviceCenters = useLoaderData()
    // console.log(serviceCenters);
    const mapRef = useRef()
    
    const position = [23.8103, 90.4125];
    const handleSearch =(e) => {
        e.preventDefault()
        const location = e.target.location.value
        const district = serviceCenters.find(c => c.district.toLowerCase().includes(location.toLowerCase()))
        if (district) {
            const cord = [district.latitude, district.longitude]
            console.log(cord);
            mapRef.current.flyTo(cord,14)
        }
        
    }
    return (
      <div className="bg-white rounded-2xl my-5">
        <h2 className="text-3xl font-bold">We are available in 64 districts</h2>
        <div className='my-5 h-10'>
          <form onSubmit={handleSearch}>
            <input name='location' type="search" placeholder='search' className='h-10 grow mx-2'/>
            <button type='submit' className='btn btn-primary text-black'>Search</button>
          </form>
        </div>
        <div className="w-full h-[600px]">
          <MapContainer
            className="h-[600px]"
            center={position}
            zoom={8}
                    scrollWheelZoom={false}
                    ref ={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {serviceCenters.map((center, i) => (
              <Marker key={i} position={[center.latitude, center.longitude]}>
                <Popup>
                  <strong>{center.district}</strong> <br />
                  Service Area: {center.covered_area.join(", ")}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    );
};

export default Coverage;