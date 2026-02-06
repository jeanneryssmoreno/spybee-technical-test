"use client";
import React from 'react';
import { useProjectStore } from '@/store/useProjectStore';
import styles from './Filters.module.css';

export default function Filters() {
  const searchProjects = useProjectStore((state) => state.searchProjects);
  const sortProjects = useProjectStore((state) => state.sortProjects);

  return (
    <div className={styles.container}>
      <input 
        type="text" 
        placeholder="Buscar por nombre..." 
        className={styles.input}
        onChange={(e) => searchProjects(e.target.value)}
      />

    
      <select 
        className={styles.select}
        onChange={(e) => sortProjects(e.target.value)}
      >
        <option value="alphabetical">Orden Alfabético</option>
        <option value="incidents">Numero de Incidencias</option>
        <option value="rfi">Numero de RFI</option>
        <option value="tasks">Numero de Tareas</option>
      </select>
    </div>
  );
}