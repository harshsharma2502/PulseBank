// Pulse Bank API Endpoints Documentation
// Backend Node.js API Structure

export const API_ENDPOINTS = {
  // Auth Endpoints
  auth: {
    register: "POST /api/auth/register",
    login: "POST /api/auth/login",
    logout: "POST /api/auth/logout",
    refreshToken: "POST /api/auth/refresh-token",
  },

  // Donor Endpoints
  donors: {
    createProfile: "POST /api/donors",
    getProfile: "GET /api/donors/:id",
    updateProfile: "PUT /api/donors/:id",
    getNearbyDonations: "GET /api/donors/:id/nearby-donations",
    scheduleDonation: "POST /api/donors/:id/schedule-donation",
    getDonationHistory: "GET /api/donors/:id/history",
    getStats: "GET /api/donors/:id/stats",
  },

  // Hospital Endpoints
  hospitals: {
    createProfile: "POST /api/hospitals",
    getProfile: "GET /api/hospitals/:id",
    updateProfile: "PUT /api/hospitals/:id",
    getInventory: "GET /api/hospitals/:id/inventory",
    updateInventory: "PUT /api/hospitals/:id/inventory",
    createBloodRequest: "POST /api/hospitals/:id/blood-requests",
    getBloodRequests: "GET /api/hospitals/:id/blood-requests",
    getMatchedDonors: "GET /api/hospitals/:id/matched-donors",
    confirmDonation: "POST /api/hospitals/:id/confirm-donation",
  },

  // Recipient Endpoints
  recipients: {
    createProfile: "POST /api/recipients",
    getProfile: "GET /api/recipients/:id",
    createBloodRequest: "POST /api/recipients/:id/blood-request",
    getRequests: "GET /api/recipients/:id/requests",
    getRequestStatus: "GET /api/recipients/:id/requests/:requestId",
    cancelRequest: "DELETE /api/recipients/:id/requests/:requestId",
  },

  // AI Matching Endpoints
  matching: {
    findDonors: "POST /api/matching/find-donors",
    calculateMatch: "POST /api/matching/calculate-match",
    getMatchScore: "GET /api/matching/match-score/:requestId/:donorId",
    getMatches: "GET /api/matching/matches/:requestId",
  },

  // Location Endpoints
  location: {
    updateLocation: "POST /api/location/update",
    getNearbyDonors: "GET /api/location/nearby-donors",
    getDistance: "GET /api/location/distance",
  },

  // Statistics Endpoints
  stats: {
    getDonorStats: "GET /api/stats/donors",
    getHospitalStats: "GET /api/stats/hospitals",
    getGlobalStats: "GET /api/stats/global",
    getImpactMetrics: "GET /api/stats/impact",
  },
}

// AI Matching Algorithm Documentation
export const AI_MATCHING_ALGORITHM = `
Pulse Bank uses a sophisticated AI-powered matching algorithm that considers:

1. Blood Type Compatibility
   - Direct match: Score = 100
   - Compatible type: Score = 80-90
   - Non-compatible: Score = 0

2. Location Proximity
   - Within 2km: Score = 100
   - 2-5km: Score = 80
   - 5-10km: Score = 60
   - 10km+: Score = 40

3. Urgency Level
   - Critical: Radius = 50km
   - High: Radius = 20km
   - Moderate: Radius = 10km
   - Low: Radius = 5km

4. Donor Availability
   - Last donation > 30 days: Score = 100
   - Last donation > 60 days: Score = 80
   - Recent donation: Score = 40

5. Final Score Calculation
   Score = (Blood Match × 0.40) + (Location × 0.30) + (Availability × 0.20) + (Rating × 0.10)

Only donors with score >= 70 are matched.
`

// Backend Technology Stack Recommendation
export const BACKEND_STACK = {
  runtime: "Node.js (v18+)",
  framework: "Express.js or Fastify",
  database: "MongoDB with Mongoose ODM",
  authentication: "JWT + bcrypt for password hashing",
  locationServices: "Geolocation API + Haversine formula for distance calculation",
  messaging: "Socket.io for real-time notifications",
  cache: "Redis for session management and caching",
  aiMatching: "Custom algorithm (no external AI required)",
  deployment: "Node.js backend deployed on Vercel, AWS, or DigitalOcean",
}
