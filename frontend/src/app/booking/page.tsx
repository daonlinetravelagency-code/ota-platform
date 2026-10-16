'use client';

import { useState } from 'react';
import styles from './booking.module.css';

type BookingStep = 'passengers' | 'payment' | 'confirmation';
type TestScenario = 'success' | 'decline' | 'timeout' | 'none';

interface PassengerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export default function BookingPage() {
  const [step, setStep] = useState<BookingStep>('passengers');
  const [testScenario, setTestScenario] = useState<TestScenario>('none');
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState<any>(null);

  const [passengerInfo, setPassengerInfo] = useState<PassengerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const flightDetails = {
    airline: 'El Al',
    departure: '08:00 TLV',
    arrival: '12:30 TBS',
    duration: '4h 30m',
    price: 189,
    flightNumber: 'LY402',
    date: '2026-10-20',
  };

  const handlePassengerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passengerInfo.firstName && passengerInfo.lastName && passengerInfo.email) {
      setStep('payment');
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (testScenario === 'success') {
      setBookingConfirmation({
        status: 'success',
        bookingId: `BK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        passenger: passengerInfo.firstName + ' ' + passengerInfo.lastName,
        flight: flightDetails.flightNumber,
        date: flightDetails.date,
        totalPrice: flightDetails.price,
        pnr: `${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      });
      setStep('confirmation');
    } else if (testScenario === 'decline') {
      setBookingConfirmation({
        status: 'declined',
        message: 'Card was declined. Your bank might have blocked the transaction.',
        suggestion: 'Try with a different card or contact your bank.',
      });
    } else if (testScenario === 'timeout') {
      setBookingConfirmation({
        status: 'timeout',
        message: 'Payment timeout. The request took too long.',
        suggestion: 'Please try again or use a different payment method.',
      });
    }

    setIsProcessing(false);
  };

  const handleCancelBooking = () => {
    setBookingConfirmation(null);
    setStep('passengers');
    setPassengerInfo({ firstName: '', lastName: '', email: '', phone: '' });
    setPaymentInfo({ cardNumber: '', cardHolder: '', expiryDate: '', cvv: '' });
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1>✈️ Daonline</h1>
        <p>Booking Confirmation</p>
      </header>

      <div className={styles.content}>
        {/* Flight Summary */}
        <aside className={styles.summary}>
          <div className={styles.summaryCard}>
            <h3>Flight Details</h3>
            <div className={styles.flightSummary}>
              <p>
                <strong>{flightDetails.airline}</strong>
              </p>
              <p>{flightDetails.departure} → {flightDetails.arrival}</p>
              <p className={styles.duration}>{flightDetails.duration}</p>
              <p className={styles.flightNumber}>{flightDetails.flightNumber}</p>
            </div>

            <div className={styles.priceBreakdown}>
              <div className={styles.priceRow}>
                <span>Flight</span>
                <span>${flightDetails.price}</span>
              </div>
              <div className={styles.priceRow}>
                <span>Taxes & Fees</span>
                <span>$25</span>
              </div>
              <div className={styles.priceRow + ' ' + styles.total}>
                <span>Total</span>
                <span>${flightDetails.price + 25}</span>
              </div>
            </div>

            {bookingConfirmation?.status === 'success' && (
              <div className={styles.successBadge}>
                ✓ Booking Confirmed
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.main}>
          {/* Test Scenario Selector */}
          {!bookingConfirmation && (
            <div className={styles.testScenario}>
              <h4>🧪 Test Scenario</h4>
              <div className={styles.scenarioButtons}>
                {[
                  { value: 'success', label: '✅ Success', desc: 'Booking completes' },
                  { value: 'decline', label: '❌ Card Declined', desc: 'Payment rejected' },
                  { value: 'timeout', label: '⏱️ Timeout', desc: 'Request timeout' },
                ].map((scenario) => (
                  <button
                    key={scenario.value}
                    className={`${styles.scenarioBtn} ${
                      testScenario === scenario.value ? styles.active : ''
                    }`}
                    onClick={() => setTestScenario(scenario.value as TestScenario)}
                  >
                    <div>{scenario.label}</div>
                    <small>{scenario.desc}</small>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Passenger Info Step */}
          {step === 'passengers' && !bookingConfirmation && (
            <form onSubmit={handlePassengerSubmit} className={styles.form}>
              <h2>Passenger Information</h2>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>First Name</label>
                  <input
                    type="text"
                    value={passengerInfo.firstName}
                    onChange={(e) =>
                      setPassengerInfo({ ...passengerInfo, firstName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={passengerInfo.lastName}
                    onChange={(e) =>
                      setPassengerInfo({ ...passengerInfo, lastName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input
                    type="email"
                    value={passengerInfo.email}
                    onChange={(e) =>
                      setPassengerInfo({ ...passengerInfo, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={passengerInfo.phone}
                    onChange={(e) =>
                      setPassengerInfo({ ...passengerInfo, phone: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <button type="submit" className={styles.nextBtn}>
                Continue to Payment →
              </button>
            </form>
          )}

          {/* Payment Step */}
          {step === 'payment' && !bookingConfirmation && (
            <form onSubmit={handlePaymentSubmit} className={styles.form}>
              <h2>Payment Information</h2>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Card Number</label>
                  <input
                    type="text"
                    placeholder="4111 1111 1111 1111"
                    value={paymentInfo.cardNumber}
                    onChange={(e) =>
                      setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
                    }
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Card Holder Name</label>
                  <input
                    type="text"
                    value={paymentInfo.cardHolder}
                    onChange={(e) =>
                      setPaymentInfo({ ...paymentInfo, cardHolder: e.target.value })
                    }
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={paymentInfo.expiryDate}
                    onChange={(e) =>
                      setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })
                    }
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={paymentInfo.cvv}
                    onChange={(e) =>
                      setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className={styles.paymentWarning}>
                <p>
                  <strong>Test Card Numbers:</strong>
                </p>
                <p>Success: 4111 1111 1111 1111</p>
                <p>Decline: 4000 0000 0000 0002</p>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={() => setStep('passengers')}
                  className={styles.backBtn}
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={styles.submitBtn}
                >
                  {isProcessing ? 'Processing...' : `Pay $${flightDetails.price + 25}`}
                </button>
              </div>
            </form>
          )}

          {/* Confirmation Step */}
          {bookingConfirmation && (
            <div className={styles.confirmationBox}>
              {bookingConfirmation.status === 'success' && (
                <div className={styles.successConfirmation}>
                  <div className={styles.successIcon}>✓</div>
                  <h2>Booking Confirmed!</h2>
                  <div className={styles.confirmationDetails}>
                    <p>
                      <strong>Booking ID:</strong> {bookingConfirmation.bookingId}
                    </p>
                    <p>
                      <strong>Passenger:</strong> {bookingConfirmation.passenger}
                    </p>
                    <p>
                      <strong>Flight:</strong> {bookingConfirmation.flight}
                    </p>
                    <p>
                      <strong>Date:</strong> {bookingConfirmation.date}
                    </p>
                    <p>
                      <strong>PNR:</strong> {bookingConfirmation.pnr}
                    </p>
                    <p className={styles.confirmationPrice}>
                      <strong>Total Paid:</strong> ${bookingConfirmation.totalPrice + 25}
                    </p>
                  </div>

                  <div className={styles.nextSteps}>
                    <h4>What's Next?</h4>
                    <ul>
                      <li>Check-in 24 hours before departure</li>
                      <li>Confirmation email sent to {passengerInfo.email}</li>
                      <li>Arrive at airport 2 hours early</li>
                      <li>Have your passport ready</li>
                    </ul>
                  </div>

                  <div className={styles.scenarioInfo}>
                    <p className={styles.testLabel}>🧪 Test: Successful Booking</p>
                    <p>Next: Try the <strong>Cancel Booking</strong> scenario to test refunds</p>
                  </div>
                </div>
              )}

              {bookingConfirmation.status === 'declined' && (
                <div className={styles.errorConfirmation}>
                  <div className={styles.errorIcon}>✗</div>
                  <h2>Payment Failed</h2>
                  <p className={styles.errorMessage}>{bookingConfirmation.message}</p>
                  <p className={styles.errorSuggestion}>{bookingConfirmation.suggestion}</p>
                  <div className={styles.scenarioInfo}>
                    <p className={styles.testLabel}>🧪 Test: Card Decline</p>
                    <p>Card used: 4000 0000 0000 0002</p>
                  </div>
                </div>
              )}

              {bookingConfirmation.status === 'timeout' && (
                <div className={styles.errorConfirmation}>
                  <div className={styles.errorIcon}>⏱️</div>
                  <h2>Request Timeout</h2>
                  <p className={styles.errorMessage}>{bookingConfirmation.message}</p>
                  <p className={styles.errorSuggestion}>{bookingConfirmation.suggestion}</p>
                  <div className={styles.scenarioInfo}>
                    <p className={styles.testLabel}>🧪 Test: Payment Timeout</p>
                  </div>
                </div>
              )}

              <button onClick={handleCancelBooking} className={styles.newBookingBtn}>
                Try Another Scenario
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
