'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [tripType, setTripType] = useState('roundtrip');
  const [searchFrom, setSearchFrom] = useState('TLV');
  const [searchTo, setSearchTo] = useState('TBS');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      tripType,
      from: searchFrom,
      to: searchTo,
      departDate,
      returnDate,
      passengers,
    });
    // TODO: Redirect to search results
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <span className={styles.airplane}>✈️</span>
            <h1>Daonline</h1>
          </div>
          <nav className={styles.nav}>
            <a href="#search">Search</a>
            <a href="#features">Features</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h2>Discover Your Next Adventure</h2>
          <p>From Tel Aviv to Tbilisi and Beyond – Book Flights, Hotels & Tours</p>
          
          {/* Search Form */}
          <form className={styles.searchForm} onSubmit={handleSearch}>
            <div className={styles.tripTypeSelector}>
              <label>
                <input
                  type="radio"
                  value="roundtrip"
                  checked={tripType === 'roundtrip'}
                  onChange={(e) => setTripType(e.target.value)}
                />
                Round Trip
              </label>
              <label>
                <input
                  type="radio"
                  value="oneway"
                  checked={tripType === 'oneway'}
                  onChange={(e) => setTripType(e.target.value)}
                />
                One Way
              </label>
            </div>

            <div className={styles.searchInputs}>
              <div className={styles.inputGroup}>
                <label>From</label>
                <input
                  type="text"
                  placeholder="TLV"
                  value={searchFrom}
                  onChange={(e) => setSearchFrom(e.target.value.toUpperCase())}
                  maxLength={3}
                />
              </div>

              <div className={styles.swapButton}>
                <button
                  type="button"
                  onClick={() => {
                    const temp = searchFrom;
                    setSearchFrom(searchTo);
                    setSearchTo(temp);
                  }}
                >
                  ⇄
                </button>
              </div>

              <div className={styles.inputGroup}>
                <label>To</label>
                <input
                  type="text"
                  placeholder="TBS"
                  value={searchTo}
                  onChange={(e) => setSearchTo(e.target.value.toUpperCase())}
                  maxLength={3}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Depart</label>
                <input
                  type="date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                />
              </div>

              {tripType === 'roundtrip' && (
                <div className={styles.inputGroup}>
                  <label>Return</label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                </div>
              )}

              <div className={styles.inputGroup}>
                <label>Passengers</label>
                <select value={passengers} onChange={(e) => setPassengers(parseInt(e.target.value))}>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className={styles.searchButton}>
                Search Flights
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <h2>Why Choose Daonline?</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🛫</span>
            <h3>Best Prices</h3>
            <p>Compare prices from multiple airlines and find the best deals</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🏨</span>
            <h3>Hotels & Tours</h3>
            <p>Complete travel packages including accommodation and activities</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>💳</span>
            <h3>Secure Payments</h3>
            <p>Safe and secure payment methods with fraud protection</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🔄</span>
            <h3>Easy Changes</h3>
            <p>Modify your bookings, change dates, or cancel anytime</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>📱</span>
            <h3>Mobile Ready</h3>
            <p>Book on the go with our mobile-optimized platform</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🆘</span>
            <h3>24/7 Support</h3>
            <p>Get help anytime with our dedicated customer support team</p>
          </div>
        </div>
      </section>

      {/* Routes Section */}
      <section className={styles.routes}>
        <h2>Popular Routes</h2>
        <div className={styles.routeCards}>
          {[
            { from: 'Tel Aviv (TLV)', to: 'Tbilisi (TBS)', price: '$89' },
            { from: 'Tel Aviv (TLV)', to: 'Bangkok (BKK)', price: '$499' },
            { from: 'Tel Aviv (TLV)', to: 'Istanbul (IST)', price: '$149' },
            { from: 'Tbilisi (TBS)', to: 'Dubai (DXB)', price: '$199' },
          ].map((route, idx) => (
            <div key={idx} className={styles.routeCard}>
              <p className={styles.routeFrom}>{route.from}</p>
              <p className={styles.routeArrow}>→</p>
              <p className={styles.routeTo}>{route.to}</p>
              <p className={styles.routePrice}>from {route.price}</p>
              <button className={styles.viewButton}>View Deals</button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <h2>Ready to Book Your Next Trip?</h2>
        <button className={styles.ctaButton}>Start Searching Now</button>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4>About</h4>
            <ul>
              <li><a href="#">About Daonline</a></li>
              <li><a href="#">Our Mission</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4>Support</h4>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Help Center</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookies</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4>Follow Us</h4>
            <div className={styles.socialLinks}>
              <a href="#">Twitter</a>
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2026 Daonline. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
