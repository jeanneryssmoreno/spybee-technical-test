"use client";
import React from 'react';
import { useProjectStore } from '@/store/useProjectStore';
import styles from './Filters.module.css';

export default function Filters() {
  const searchProjects = useProjectStore((state) => state.searchProjects);
  const filteredProjects = useProjectStore((state) => state.filteredProjects);
  
  return (
    <div className={styles.toolbarContainer}>
      <div className={styles.leftSection}>
        <h1 className={styles.title}>Mis proyectos</h1>
        <span className={styles.projectCount}>{filteredProjects.length} Proyectos</span>
      </div>

      <div className={styles.rightSection}>
    
        <button className={styles.toggleButton} style={{ border: 'none', background: 'transparent' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="20" x2="12" y2="10"></line>
                <line x1="18" y1="20" x2="18" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="16"></line>
            </svg>
        </button>

        <div className={styles.viewToggles}>
            <button className={`${styles.toggleButton} ${styles.activeToggle}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
            </button>
            <button className={styles.toggleButton}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
            </button>
             <button className={styles.toggleButton}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
            </button>
        </div>

       
        <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>|</span>
            <input 
                type="text" 
                placeholder="Buscar" 
                className={styles.searchInput}
                onChange={(e) => searchProjects(e.target.value)}
            />
            
             <svg style={{ position: 'absolute', right: '10px', color: '#aaa' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        </div>

     
        <button className={styles.createButton}>
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Crear proyecto
        </button>
      </div>
    </div>
  );
}