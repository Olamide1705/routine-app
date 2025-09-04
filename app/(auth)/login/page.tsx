"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted Data:", email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-5">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/*Email */}
          <div>
            <label htmlFor="email">
              Email
              <input
                name="email"
                type="email"
                value={email}
                placeholder="Email"
                className="border p-2 rounded w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password">
              Password
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Password"
                className="border p-2 rounded w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <div
              className="absolute right-2 top-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          <button
            type="submit"
            className="bg-[rgb(90,187,187)] text-white py-2 px-4 rounded w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
