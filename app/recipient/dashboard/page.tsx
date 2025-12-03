"use client"

import { useState, useEffect } from "react"
import { Heart, Clock, CheckCircle, AlertCircle, MapPin, Settings, LogOut } from "lucide-react"
import Link from "next/link"

export default function RecipientDashboard() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [requests, setRequests] = useState([
    {
      id: 1,
      bloodType: "O+",
      units: 3,
      status: "matched",
      matchedDate: "2024-11-13",
      hospitalName: "City General Hospital",
      distance: 2.3,
      estimatedDelivery: "2 hours",
    },
    {
      id: 2,
      bloodType: "A+",
      units: 2,
      status: "searching",
      requestDate: "2024-11-14",
      matchPercentage: 78,
      nearbyDonors: 12,
    },
  ])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      })
    }
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "matched":
        return "text-green-600"
      case "searching":
        return "text-orange-600"
      case "failed":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "matched":
        return "bg-green-100"
      case "searching":
        return "bg-orange-100"
      case "failed":
        return "bg-red-100"
      default:
        return "bg-gray-100"
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 fill-white" />
            <h1 className="text-3xl font-bold">Pulse Bank - Recipient</h1>
          </div>
          <div className="flex items-center gap-4">
            {location && (
              <div className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg">
                <MapPin className="w-5 h-5" />
                <span className="text-sm">Location Active</span>
              </div>
            )}
            <button className="p-2 hover:bg-red-500 rounded-lg transition">
              <Settings className="w-6 h-6" />
            </button>
            <Link href="/" className="p-2 hover:bg-red-500 rounded-lg transition">
              <LogOut className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-red-600">
          <h2 className="text-3xl font-bold mb-2">Your Blood Request Status</h2>
          <p className="text-gray-600">
            Our AI system is finding the best matches for you. We're committed to finding compatible donors quickly.
          </p>
        </div>

        {/* Urgent Help Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl p-8 flex items-start gap-4">
          <AlertCircle className="w-8 h-8 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold mb-2">Need Urgent Help?</h3>
            <p className="mb-4">Contact your hospital immediately or call our 24/7 emergency line for assistance.</p>
            <button className="px-6 py-2 bg-white text-red-600 font-semibold rounded-lg hover:bg-red-50 transition">
              Call Emergency Hotline
            </button>
          </div>
        </div>

        {/* Blood Requests */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Blood Requests</h2>
            <button className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">
              + New Request
            </button>
          </div>

          <div className="space-y-6">
            {requests.map((request) => (
              <div
                key={request.id}
                className={`bg-white rounded-xl shadow-lg p-8 border-l-4 ${request.status === "matched" ? "border-green-500" : "border-orange-500"}`}
              >
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Blood Type & Units */}
                  <div>
                    <h3 className="text-sm text-gray-600 font-semibold mb-2">BLOOD TYPE NEEDED</h3>
                    <div className="flex items-start gap-4">
                      <div className="text-5xl font-bold text-red-600">{request.bloodType}</div>
                      <div>
                        <p className="text-2xl font-bold">{request.units}</p>
                        <p className="text-sm text-gray-600">units</p>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <h3 className="text-sm text-gray-600 font-semibold mb-2">STATUS</h3>
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${getStatusBgColor(request.status)}`}
                    >
                      {request.status === "matched" ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-bold text-green-600">Matched</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-5 h-5 text-orange-600" />
                          <span className="font-bold text-orange-600">Searching...</span>
                        </>
                      )}
                    </div>

                    {request.status === "matched" && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Hospital:</span> {request.hospitalName}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Distance:</span> {request.distance} km
                        </p>
                        <p className="text-sm text-green-600 font-semibold">
                          Est. Delivery: {request.estimatedDelivery}
                        </p>
                      </div>
                    )}

                    {request.status === "searching" && (
                      <div className="mt-4">
                        <div className="text-sm text-gray-600 mb-2">
                          <span className="font-semibold text-orange-600">{request.matchPercentage}%</span> Match Rate
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
                            style={{ width: `${request.matchPercentage}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          <span className="font-semibold text-green-600">{request.nearbyDonors}</span> compatible donors
                          nearby
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 justify-center">
                    <button className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">
                      View Details
                    </button>
                    <button className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition">
                      Track Progress
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-8 border-2 border-red-200">
          <h2 className="text-2xl font-bold mb-6">How AI Matching Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Request Submitted", desc: "Your blood request is registered in the system" },
              { step: 2, title: "AI Analysis", desc: "System analyzes compatibility & proximity" },
              { step: 3, title: "Donor Match", desc: "Compatible donors are identified" },
              { step: 4, title: "Delivery", desc: "Blood is matched and delivered quickly" },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-lg p-4">
                <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
