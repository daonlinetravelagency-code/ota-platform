'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState('Checking backend...');
  const [mockFlights, setMockFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkBackend();
  }, []);

  const checkBackend = async () => {
    try {
      const response = await fetch('http://localhost:3001/health');
      const data = await response.json();
      setStatus(`✓ Backend OK (${data.timestamp})`);
    } catch (error) {
      setStatus(`✗ Backend error: ${error}`);
    }
  };

  const loadMockFlights = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/flights/mock');
      const data = await response.json();
      setMockFlights(data.flights);
    } catch (error) {
      console.error('Error loading flights:', error);
    }
    setLoading(false);
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>✈️ OTA Platform - POC</h1>

      <section style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
        <h2>Status</h2>
        <p style={{ fontSize: '1.1rem' }}>
          <strong>{status}</strong>
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Quick Links</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><a href="/search" style={{ color: '#1976d2', textDecoration: 'none', fontSize: '1.1rem' }}>→ Search Flights</a></li>
          <li><a href="/bookings" style={{ color: '#1976d2', textDecoration: 'none', fontSize: '1.1rem' }}>→ My Bookings</a></li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>API Test</h2>
        <button
          onClick={loadMockFlights}
          disabled={loading}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
          }}
        >
          {loading ? 'Loading...' : 'Load Mock Flights'}
        </button>

        {mockFlights.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <h3>Available Flights</h3>
            {mockFlights.map((flight) => (
              <div
                key={flight.id}
                style={{
                  padding: '1rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  marginBottom: '0.5rem',
                }}
              >
                <p>
                  <strong>{flight.departure.city} ({flight.departure.code})</strong> →{' '}
                  <strong>{flight.arrival.city} ({flight.arrival.code})</strong>
                </p>
                <p>Airline: {flight.airline} | Duration: {flight.duration}</p>
                <p style={{ color: '#4caf50', fontWeight: 'bold' }}>
                  ${flight.price} {flight.currency}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section style={{ marginTop: '3rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <h3>Next Steps</h3>
        <ol>
          <li>Backend authentication (register/login)</li>
          <li>Real flight search with Duffel API</li>
          <li>Hotel search integration</li>
          <li>Booking flow</li>
          <li>Payment integration with Stripe</li>
        </ol>
      </section>
    </main>
  );
}
