import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Daonline - Book Flights & Hotels Worldwide',
  description: 'Book flights, hotels, and tours from Israel to Georgia and worldwide',
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
