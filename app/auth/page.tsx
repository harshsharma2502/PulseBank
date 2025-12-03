"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Heart } from "lucide-react"
import Link from "next/link"

type UserType = "hospital" | "donor" | "recipient"

export default function Auth() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [userType, setUserType] = useState<UserType>((searchParams.get("type") as UserType) || "donor")
  const [isLogin, setIsLogin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    bloodType: "O+",
    hospitalName: "",
    licenseNumber: "",
    recipientName: "",
    urgency: "moderate",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("userType", userType)
      localStorage.setItem("userData", JSON.stringify(formData))

      if (userType === "hospital") {
        router.push("/hospital/dashboard")
      } else if (userType === "donor") {
        router.push("/donor/dashboard")
      } else {
        router.push("/recipient/dashboard")
      }
      setLoading(false)
    }, 1000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const userTypeConfig = {
    hospital: {
      title: "Hospital Registration",
      icon: "🏥",
      color: "from-red-600 to-red-700",
    },
    donor: {
      title: "Become a Life Saver",
      icon: "❤️",
      color: "from-red-500 to-red-600",
    },
    recipient: {
      title: "Request Blood",
      icon: "🩸",
      color: "from-red-600 to-red-800",
    },
  }

  const config = userTypeConfig[userType]

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-red-50 to-red-100 flex items-center justify-center p-4">
      {/* Back to home */}
      <Link
        href="/"
        className="absolute top-4 left-4 flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold"
      >
        <Heart className="w-5 h-5" />
        Pulse Bank
      </Link>

      <div className="w-full max-w-4xl">
        {/* User Type Selection */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {(["hospital", "donor", "recipient"] as UserType[]).map((type) => (
            <button
              key={type}
              onClick={() => setUserType(type)}
              className={`p-6 rounded-xl border-2 transition transform hover:scale-105 ${
                userType === type
                  ? "bg-red-600 text-white border-red-700 shadow-lg"
                  : "bg-white text-gray-700 border-gray-200 hover:border-red-400"
              }`}
            >
              <div className="text-4xl mb-3">{type === "hospital" ? "🏥" : type === "donor" ? "❤️" : "🩸"}</div>
              <div className="font-semibold capitalize">{type}</div>
            </button>
          ))}
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className={`bg-gradient-to-r ${config.color} text-white p-8 text-center`}>
            <div className="text-5xl mb-4">{config.icon}</div>
            <h1 className="text-3xl font-bold mb-2">{config.title}</h1>
            <p className="opacity-90">
              {isLogin ? "Welcome back! Sign in to continue" : `Join our community and save lives`}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {userType === "hospital" ? "Hospital Name" : userType === "donor" ? "Full Name" : "Recipient Name"}
                </label>
                <input
                  type="text"
                  name={userType === "hospital" ? "hospitalName" : userType === "donor" ? "name" : "recipientName"}
                  value={
                    userType === "hospital"
                      ? formData.hospitalName
                      : userType === "donor"
                        ? formData.name
                        : formData.recipientName
                  }
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Phone & Specific Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              {userType === "hospital" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">License Number</label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Hospital License #"
                  />
                </div>
              )}
              {userType === "donor" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Type</label>
                  <select
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="O+">O+ (Universal Donor)</option>
                    <option value="O-">O- (Universal Donor)</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              )}
              {userType === "recipient" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Urgency Level</label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              )}
            </div>

            {/* Password */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-red-600 hover:text-red-700 font-semibold text-sm"
                >
                  {isLogin ? "Create Account" : "Sign In Instead"}
                </button>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                required
                className="w-5 h-5 rounded border-gray-300 text-red-600 cursor-pointer mt-1"
              />
              <label className="text-sm text-gray-600">I agree to the terms and conditions and privacy policy</label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition disabled:opacity-50"
            >
              {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
