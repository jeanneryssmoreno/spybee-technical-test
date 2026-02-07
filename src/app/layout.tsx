import type { Metadata } from 'next';
import './globals.css';
import TopBar from '@/components/TopBar';

export const metadata: Metadata = {
    title: 'SpyBee Test',
    description: 'Aplicación de prueba técnica',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es" suppressHydrationWarning>
            <head />
            <body suppressHydrationWarning style={{ margin: 0, backgroundColor: '#f5f5f5' }}>
                <TopBar />
                {children}
            </body>
        </html>
    );
}