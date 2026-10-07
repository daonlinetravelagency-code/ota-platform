import { FastifyInstance } from 'fastify';

export async function registerTestRoutes(fastify: FastifyInstance) {
  fastify.get('/api/test', async (request, reply) => {
    return {
      message: 'Backend is working!',
      timestamp: new Date().toISOString(),
      version: '0.1.0',
    };
  });

  fastify.get('/api/flights/mock', async (request, reply) => {
    // Mock flight data for testing
    return {
      flights: [
        {
          id: 'flight_1',
          departure: {
            city: 'Tel Aviv',
            code: 'TLV',
            time: '2026-10-15T08:00:00Z',
          },
          arrival: {
            city: 'Tbilisi',
            code: 'TBS',
            time: '2026-10-15T14:00:00Z',
          },
          airline: 'MOCK Airlines',
          price: 450,
          currency: 'USD',
          duration: '6h 0m',
        },
      ],
    };
  });
}
