"use client";
import React from 'react';
import { useProjectStore } from '@/store/useProjectStore';
import styles from './Pagination.module.css';

export default function Pagination() {
  const { filteredProjects, itemsPerPage, currentPage, setCurrentPage } = useProjectStore();

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  if (totalPages <= 1) return null; 


  return (
    <div className={styles.pagination}>
      <button 
        className={styles.button}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Anterior
      </button>
      
      <span className={styles.info}>Página {currentPage} de {totalPages}</span>

      <button 
        className={styles.button}
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Siguiente
      </button>
    </div>
  );
}