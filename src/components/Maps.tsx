'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import styles from './Maps.module.css';

const MapView = dynamic(() => import('./MapView'), { 
    ssr: false,
    loading: () => <div className={styles.mapContainer} style={{ background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando mapa...</div>
});

export default function Maps() {
    return (
        <div className={styles.mapContainer}>
            <MapView />
        </div>
    );
}