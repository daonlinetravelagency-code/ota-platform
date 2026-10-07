export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">OTA Platform MVP</h1>
        <p className="text-xl mb-8">Online Travel Agency - Proof of Concept</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-4xl">
          <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur">
            <h2 className="text-2xl font-semibold mb-2">✈️ Flights</h2>
            <p>Search and book flights worldwide</p>
          </div>
          <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur">
            <h2 className="text-2xl font-semibold mb-2">🏨 Hotels</h2>
            <p>Find the perfect accommodation</p>
          </div>
          <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur">
            <h2 className="text-2xl font-semibold mb-2">🎫 Tours</h2>
            <p>Discover amazing tour packages</p>
          </div>
        </div>
      </div>
    </main>
  );
}
