import React,{ useEffect, useRef } from 'react'

const Map = (props) => {

    const mapRef = useRef();

    useEffect(() => {
        new window.google.maps.Map(mapRef.current, {
            zoom: 12,
            center: {
                lat: props.lat,
                lng: props.lon
            }
        });
    },[props]);

    return (
        <div ref={mapRef} className="col-6"></div>
    );
}

export default Map
