"use client"

import { useState } from "react"
import { Heart, AlertCircle, Users, Droplet, TrendingDown, Settings, LogOut, BarChart3 } from "lucide-react"
import Link from "next/link"
import BloodCompatibilityChart from "@/components/blood-compatibility-chart"
import AIChatbot from "@/components/ai-chatbot"

export default function HospitalDashboard() {
  const [bloodInventory, setBloodInventory] = useState({
    "O+": { available: 45, critical: 10 },
    "O-": { available: 12, critical: 5 },
    "A+": { available: 28, critical: 8 },
    "A-": { available: 8, critical: 3 },
    "B+": { available: 18, critical: 6 },
    "B-": { available: 5, critical: 2 },
    "AB+": { available: 15, critical: 4 },
    "AB-": { available: 3, critical: 1 },
  })

  const [requests, setRequests] = useState([
    {
      id: 1,
      bloodType: "O+",
      units: 5,
      urgency: "critical",
      recipient: "John Doe",
      dept: "Emergency",
      status: "matched",
    },
    { id: 2, bloodType: "A+", units: 3, urgency: "high", recipient: "Jane Smith", dept: "Surgery", status: "pending" },
    {
      id: 3,
      bloodType: "B+",
      units: 2,
      urgency: "moderate",
      recipient: "Mike Johnson",
      dept: "ICU",
      status: "matched",
    },
    {
      id: 4,
      bloodType: "AB-",
      units: 1,
      urgency: "high",
      recipient: "Sarah Williams",
      dept: "Cardiology",
      status: "pending",
    },
  ])

  const [stats] = useState({
    totalDonors: 1250,
    donorsNearby: 45,
    averageMatch: 2.3,
    livesThisMonth: 34,
  })

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-600 text-white"
      case "high":
        return "bg-orange-500 text-white"
      case "moderate":
        return "bg-yellow-500 text-white"
      default:
        return "bg-green-500 text-white"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "matched" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 fill-white" />
            <h1 className="text-3xl font-bold">Pulse Bank Hospital</h1>
          </div>
          <div className="flex items-center gap-4">
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
        {/* Welcome Section with Hero Image */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-red-600">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-2 text-red-700">City General Hospital</h2>
              <p className="text-gray-600 mb-4">Real-time blood inventory & AI-powered donor matching</p>
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  Active requests: <span className="font-bold text-red-600">{requests.length}</span>
                </p>
                <p className="text-sm text-gray-700">
                  Lives saved this month: <span className="font-bold text-red-600">{stats.livesThisMonth}</span>
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg h-64 md:h-auto flex items-center justify-center relative overflow-hidden">
              <img
                src="/modern-hospital-medical-emergency-healthcare.jpg"
                alt="Hospital emergency room"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <Heart className="w-20 h-20 text-white opacity-80" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Active Donors Nearby", value: stats.donorsNearby, color: "from-red-500 to-red-600" },
            {
              icon: Droplet,
              label: "Avg Match Time",
              value: stats.averageMatch + " min",
              color: "from-red-600 to-red-700",
            },
            {
              icon: TrendingDown,
              label: "Lives This Month",
              value: stats.livesThisMonth,
              color: "from-red-600 to-red-800",
            },
            { icon: Heart, label: "Total Donors", value: stats.totalDonors, color: "from-red-500 to-red-700" },
          ].map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div
                key={idx}
                className={`bg-gradient-to-r ${stat.color} text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold opacity-90">{stat.label}</h3>
                  <Icon className="w-6 h-6 opacity-80" />
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            )
          })}
        </div>

        <BloodCompatibilityChart />

        {/* Blood Inventory */}
        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-red-200">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold">Blood Inventory Status</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {Object.entries(bloodInventory).map(([bloodType, data]) => (
              <div
                key={bloodType}
                className="border-2 border-red-200 rounded-lg p-4 hover:border-red-400 transition bg-gradient-to-br from-white to-red-50"
              >
                <h3 className="text-2xl font-bold text-red-600 mb-2">{bloodType}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Available:</span>
                    <span className="font-bold text-green-600">{data.available} units</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Critical:</span>
                    <span className={`font-bold ${data.critical >= 10 ? "text-red-600" : "text-orange-600"}`}>
                      {data.critical} units
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div
                      className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full"
                      style={{ width: `${(data.available / 50) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blood Requests */}
        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-red-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Active Blood Requests</h2>
            <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">
              + New Request
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Blood Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Units</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Recipient</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Department</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Urgency</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id} className="border-b border-gray-100 hover:bg-red-50 transition">
                    <td className="py-4 px-4">
                      <span className="font-bold text-red-600 text-lg">{req.bloodType}</span>
                    </td>
                    <td className="py-4 px-4">{req.units} units</td>
                    <td className="py-4 px-4">{req.recipient}</td>
                    <td className="py-4 px-4">{req.dept}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getUrgencyColor(req.urgency)}`}>
                        {req.urgency.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(req.status)}`}>
                        {req.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Matching Alert */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-600 rounded-xl p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-green-900 mb-1">AI Matching Alert</h3>
              <p className="text-green-800">
                45 donors matching your current requests have been identified within 5km radius. Success rate: 87%
              </p>
            </div>
          </div>
        </div>
      </div>

      <AIChatbot />
    </main>
  )
}
