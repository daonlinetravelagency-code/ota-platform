export const metadata = {
  title: 'OTA Platform',
  description: 'Online Travel Agency - Book flights, hotels, and more',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <nav style={{ padding: '1rem', backgroundColor: '#f5f5f5' }}>
          <a href="/" style={{ marginRight: '1rem', textDecoration: 'none' }}>
            <strong>OTA Platform</strong>
          </a>
        </nav>
        {children}
      </body>
    </html>
  );
}
