'use client';

import { useState } from 'react';
import styles from './search.module.css';

interface Flight {
  id: string;
  airline: string;
  departure: {
    time: string;
    airport: string;
    city: string;
  };
  arrival: {
    time: string;
    airport: string;
    city: string;
  };
  duration: string;
  stops: number;
  price: number;
  rating: number;
}

const mockFlights: Flight[] = [
  {
    id: '1',
    airline: 'El Al',
    departure: { time: '08:00', airport: 'TLV', city: 'Tel Aviv' },
    arrival: { time: '12:30', airport: 'TBS', city: 'Tbilisi' },
    duration: '4h 30m',
    stops: 0,
    price: 189,
    rating: 4.8,
  },
  {
    id: '2',
    airline: 'Wizz Air',
    departure: { time: '10:15', airport: 'TLV', city: 'Tel Aviv' },
    arrival: { time: '15:00', airport: 'TBS', city: 'Tbilisi' },
    duration: '4h 45m',
    stops: 0,
    price: 79,
    rating: 4.5,
  },
  {
    id: '3',
    airline: 'Turkish Airlines',
    departure: { time: '06:30', airport: 'TLV', city: 'Tel Aviv' },
    arrival: { time: '14:20', airport: 'TBS', city: 'Tbilisi' },
    duration: '7h 50m',
    stops: 1,
    price: 129,
    rating: 4.6,
  },
  {
    id: '4',
    airline: 'Ryanair',
    departure: { time: '11:45', airport: 'TLV', city: 'Tel Aviv' },
    arrival: { time: '16:30', airport: 'TBS', city: 'Tbilisi' },
    duration: '4h 45m',
    stops: 0,
    price: 69,
    rating: 4.2,
  },
  {
    id: '5',
    airline: 'El Al',
    departure: { time: '16:00', airport: 'TLV', city: 'Tel Aviv' },
    arrival: { time: '20:45', airport: 'TBS', city: 'Tbilisi' },
    duration: '4h 45m',
    stops: 0,
    price: 199,
    rating: 4.8,
  },
];

export default function SearchResults() {
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('price');

  const sortedFlights = [...mockFlights].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'duration') {
      const aDuration = parseInt(a.duration);
      const bDuration = parseInt(b.duration);
      return aDuration - bDuration;
    }
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const handleSelectFlight = (flightId: string) => {
    setSelectedFlight(flightId);
    // TODO: Navigate to booking page
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1>✈️ Daonline</h1>
      </header>

      {/* Search Summary */}
      <section className={styles.searchSummary}>
        <div className={styles.summaryContent}>
          <h2>Tel Aviv (TLV) → Tbilisi (TBS)</h2>
          <p>October 20, 2026 | 1 Passenger | Round Trip</p>
        </div>
        <button className={styles.editButton}>← Edit Search</button>
      </section>

      <div className={styles.content}>
        {/* Filters & Sorting */}
        <aside className={styles.sidebar}>
          <div className={styles.filterSection}>
            <h3>Sort By</h3>
            <div className={styles.sortOptions}>
              {[
                { value: 'price', label: '💰 Lowest Price' },
                { value: 'duration', label: '⏱️ Shortest Duration' },
                { value: 'rating', label: '⭐ Best Rating' },
              ].map((option) => (
                <label key={option.value}>
                  <input
                    type="radio"
                    value={option.value}
                    checked={sortBy === option.value}
                    onChange={(e) => setSortBy(e.target.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <h3>Price Range</h3>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>$60 - $200</p>
          </div>

          <div className={styles.filterSection}>
            <h3>Stops</h3>
            <label>
              <input type="checkbox" defaultChecked /> Direct Only
            </label>
          </div>
        </aside>

        {/* Results */}
        <main className={styles.results}>
          <div className={styles.resultHeader}>
            <p>{sortedFlights.length} flights found</p>
          </div>

          <div className={styles.flightList}>
            {sortedFlights.map((flight) => (
              <div
                key={flight.id}
                className={`${styles.flightCard} ${
                  selectedFlight === flight.id ? styles.selected : ''
                }`}
                onClick={() => handleSelectFlight(flight.id)}
              >
                <div className={styles.flightInfo}>
                  <div className={styles.airlineSection}>
                    <p className={styles.airline}>{flight.airline}</p>
                    <div className={styles.rating}>
                      ⭐ {flight.rating}
                    </div>
                  </div>

                  <div className={styles.timeSection}>
                    <div className={styles.timeBlock}>
                      <p className={styles.time}>{flight.departure.time}</p>
                      <p className={styles.airport}>{flight.departure.airport}</p>
                      <p className={styles.city}>{flight.departure.city}</p>
                    </div>

                    <div className={styles.durationSection}>
                      <p className={styles.duration}>{flight.duration}</p>
                      <div className={styles.timeline}>
                        <div className={styles.dot}></div>
                        {flight.stops === 0 ? (
                          <div className={styles.line}></div>
                        ) : (
                          <>
                            <div className={styles.line}></div>
                            <div className={styles.stopDot}></div>
                            <div className={styles.line}></div>
                          </>
                        )}
                        <div className={styles.dot}></div>
                      </div>
                      <p className={styles.stops}>
                        {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop`}
                      </p>
                    </div>

                    <div className={styles.timeBlock}>
                      <p className={styles.time}>{flight.arrival.time}</p>
                      <p className={styles.airport}>{flight.arrival.airport}</p>
                      <p className={styles.city}>{flight.arrival.city}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.priceSection}>
                  <p className={styles.price}>${flight.price}</p>
                  <button className={styles.selectButton}>
                    {selectedFlight === flight.id ? '✓ Selected' : 'Select'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {selectedFlight && (
            <div className={styles.bookingSection}>
              <h3>Ready to Book?</h3>
              <p>You've selected a flight. Proceed to checkout to complete your booking.</p>
              <button className={styles.continueButton}>
                Continue to Booking →
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2026 Daonline. All rights reserved.</p>
      </footer>
    </div>
  );
}
