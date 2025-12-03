-- Pulse Bank Database Schema
-- MongoDB Collections Definition

-- Users Collection
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "password", "userType", "createdAt"],
      properties: {
        _id: { bsonType: "objectId" },
        email: { bsonType: "string", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" },
        password: { bsonType: "string" },
        userType: { enum: ["hospital", "donor", "recipient"] },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
})

-- Donors Collection
db.createCollection("donors", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "name", "bloodType", "phone", "location"],
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "objectId" },
        name: { bsonType: "string" },
        bloodType: { enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"] },
        phone: { bsonType: "string" },
        location: {
          bsonType: "object",
          properties: {
            latitude: { bsonType: "double" },
            longitude: { bsonType: "double" },
            address: { bsonType: "string" }
          }
        },
        totalDonations: { bsonType: "int", default: 0 },
        totalUnits: { bsonType: "int", default: 0 },
        lastDonation: { bsonType: "date" },
        isActive: { bsonType: "bool", default: true },
        verificationStatus: { enum: ["pending", "verified", "rejected"], default: "pending" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
})

-- Hospitals Collection
db.createCollection("hospitals", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "hospitalName", "licenseNumber", "phone", "location"],
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "objectId" },
        hospitalName: { bsonType: "string" },
        licenseNumber: { bsonType: "string" },
        phone: { bsonType: "string" },
        location: {
          bsonType: "object",
          properties: {
            latitude: { bsonType: "double" },
            longitude: { bsonType: "double" },
            address: { bsonType: "string" },
            city: { bsonType: "string" },
            state: { bsonType: "string" }
          }
        },
        bloodInventory: {
          bsonType: "object",
          properties: {
            "O+": { bsonType: "int" },
            "O-": { bsonType: "int" },
            "A+": { bsonType: "int" },
            "A-": { bsonType: "int" },
            "B+": { bsonType: "int" },
            "B-": { bsonType: "int" },
            "AB+": { bsonType: "int" },
            "AB-": { bsonType: "int" }
          }
        },
        operatingHours: { bsonType: "string" },
        isActive: { bsonType: "bool", default: true },
        verificationStatus: { enum: ["pending", "verified", "rejected"], default: "pending" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
})

-- Recipients Collection
db.createCollection("recipients", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "name", "bloodTypeNeeded", "phone", "location"],
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "objectId" },
        name: { bsonType: "string" },
        bloodTypeNeeded: { enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"] },
        phone: { bsonType: "string" },
        location: {
          bsonType: "object",
          properties: {
            latitude: { bsonType: "double" },
            longitude: { bsonType: "double" },
            address: { bsonType: "string" }
          }
        },
        hospitalId: { bsonType: "objectId" },
        medicalReports: { bsonType: "array", items: { bsonType: "string" } },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
})

-- Blood Requests Collection
db.createCollection("bloodRequests", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["hospitalId", "bloodType", "units", "urgency"],
      properties: {
        _id: { bsonType: "objectId" },
        hospitalId: { bsonType: "objectId" },
        recipientId: { bsonType: "objectId" },
        bloodType: { enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"] },
        units: { bsonType: "int" },
        urgency: { enum: ["low", "moderate", "high", "critical"] },
        status: { enum: ["pending", "matched", "in_progress", "completed", "failed"] },
        matchedDonor: { bsonType: "objectId" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" },
        completedAt: { bsonType: "date" }
      }
    }
  }
})

-- Donations Collection
db.createCollection("donations", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["donorId", "bloodType", "units", "hospitalId"],
      properties: {
        _id: { bsonType: "objectId" },
        donorId: { bsonType: "objectId" },
        bloodType: { enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"] },
        units: { bsonType: "int" },
        hospitalId: { bsonType: "objectId" },
        requestId: { bsonType: "objectId" },
        status: { enum: ["scheduled", "completed", "cancelled"] },
        donationDate: { bsonType: "date" },
        expiryDate: { bsonType: "date" },
        certificateIssued: { bsonType: "bool", default: false },
        createdAt: { bsonType: "date" }
      }
    }
  }
})

-- AI Matching Records Collection
db.createCollection("matchingRecords", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["requestId", "donorId", "matchScore"],
      properties: {
        _id: { bsonType: "objectId" },
        requestId: { bsonType: "objectId" },
        donorId: { bsonType: "objectId" },
        bloodTypeMatch: { bsonType: "bool" },
        distanceKm: { bsonType: "double" },
        matchScore: { bsonType: "double", minimum: 0, maximum: 100 },
        matchedAt: { bsonType: "date" },
        selectedAt: { bsonType: "date" },
        rejectedAt: { bsonType: "date" }
      }
    }
  }
})

-- Create Indexes
db.donors.createIndex({ "location.latitude": 1, "location.longitude": 1 })
db.donors.createIndex({ "bloodType": 1 })
db.donors.createIndex({ "userId": 1 }, { unique: true })

db.hospitals.createIndex({ "location.latitude": 1, "location.longitude": 1 })
db.hospitals.createIndex({ "userId": 1 }, { unique: true })

db.bloodRequests.createIndex({ "hospitalId": 1 })
db.bloodRequests.createIndex({ "bloodType": 1 })
db.bloodRequests.createIndex({ "status": 1 })
db.bloodRequests.createIndex({ "createdAt": -1 })

db.donations.createIndex({ "donorId": 1 })
db.donations.createIndex({ "hospitalId": 1 })
db.donations.createIndex({ "status": 1 })

db.matchingRecords.createIndex({ "requestId": 1 })
db.matchingRecords.createIndex({ "matchScore": -1 })
