
"use client";
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useProjectStore } from '@/store/useProjectStore';

// Fix para que los iconos de Leaflet se vean bien en Next.js
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// SUB-COMPONENTE: Para mover la cámara cuando seleccionamos un proyecto
function MapController({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 14, { duration: 1.5 }); // Efecto de "vuelo" suave
    }
  }, [coords, map]);
  return null;
}

export default function MapView() {
  const { filteredProjects, selectedProject } = useProjectStore();

  return (
    <div style={{ height: '400px', width: '100%', borderRadius: '12px', overflow: 'hidden', marginTop: '20px' }}>
      <MapContainer 
        center={[0, 0]} 
        zoom={2} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Punto 4: Marcadores de todos los proyectos filtrados */}
        {filteredProjects.filter(p => p.position).map((project) => (
          <Marker 
            key={project._id} 
            position={[project.position!.lat, project.position!.lng]} 
            icon={defaultIcon}
          >
            <Popup>
              <strong>{project.title}</strong> <br />
              Estado: {project.status}
            </Popup>
          </Marker>
        ))}

        {/* Punto 5: Si el usuario selecciona un proyecto, el mapa se mueve */}
        {selectedProject?.position && (
          <MapController 
            coords={[selectedProject.position.lat, selectedProject.position.lng]} 
          />
        )}
      </MapContainer>
    </div>
  );
}