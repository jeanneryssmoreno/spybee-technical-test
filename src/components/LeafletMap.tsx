'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from './Maps.module.css';

const fixLeafletIcon = () => {
    if (typeof window !== 'undefined') {
        delete (L.Icon.Default.prototype as any)._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
    }
};

export default function LeafletMap() {
    useEffect(() => {
        fixLeafletIcon();
    }, []);

    const position: [number, number] = [10.4806, -66.9036]; 

    return (
        <MapContainer 
            center={position} 
            zoom={13} 
            scrollWheelZoom={false} 
            className={styles.mapContainer}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    Ubicación del Proyecto
                </Popup>
            </Marker>
        </MapContainer>
    );
}

