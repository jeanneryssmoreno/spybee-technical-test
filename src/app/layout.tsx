import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'SpyBee Test',
    description: 'Aplicación de prueba técnica',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es" suppressHydrationWarning>
            <head />
            <body suppressHydrationWarning>{children}</body>
        </html>
    );
}