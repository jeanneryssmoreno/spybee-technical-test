import React from 'react';
import Image from 'next/image';
import styles from './TopBar.module.css';
import logo from './logo/spybee_logo_black.webp';

export default function TopBar() {
    return (
        <div className={styles.topBar}>
            <div className={styles.logoContainer}>
                <Image src={logo} alt="Spybee Logo" height={40} className={styles.logo} style={{ filter: 'brightness(0) invert(1)' }} /> 
            </div>
            
            <div className={styles.userProfile}>
                <div className={styles.avatar}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                <div className={styles.userInfo}>
                    <span className={styles.userName}>Marco</span>
                    <span className={styles.userRole}>Administrador</span>
                </div>
                <span className={styles.dropdownIcon}>▼</span>
            </div>
        </div>
    );
}
