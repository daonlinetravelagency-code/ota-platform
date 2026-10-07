import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OTA Platform - Book Your Next Adventure',
  description: 'Online Travel Agency MVP',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
