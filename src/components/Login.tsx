"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const registerData = {
  email: "",
  password: "",
};

const notifications = {
  success: {
    message: "You're registered successfully",
    bg: "bg-green-500/20 text-green-600",
  },
  error: {
    message: "Invalid email or password",
    bg: "bg-red-500/20 text-red-600",
  },
  errorNetwork: {
    message: "Please check your connection",
    bg: "bg-red-500/20 text-red-600 border border-red-600",
  },

  warning: {
    message: "Please fill in all fields",
    bg: "bg-yellow-500/20 text-yellow-600",
  },
};

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState(registerData);
  const [notification, setNotification] = useState(notifications.warning);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [loding, setLoding] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function formSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formData.email === "" || formData.password === "") {
      setNotification(notifications.warning);
      setShowNotification(true);
      return;
    }
    setLoding(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        setNotification(notifications.error);
        setShowNotification(true);
        return;
      }
      const data = await response.json();

      setFormData(registerData);
      setShowNotification(true);
      setLoding(false);

      if (data.role === "admin") {
        router.push("/admin");
      } else if (data.role === "teacher") {
        router.push("/teacher");
      } else {
        router.push("/student");
      }
    } catch {
      setNotification(notifications.error);
      setShowNotification(true);
    }
  }

  return (
    <div className="bg-slate-100 h-screen flex items-center justify-center   ">
      <div className="bg-white w-96 flex flex-col p-5 gap-10 items-center rounded-md h-fit shadow-sm">
        <h1 className="text-3xl font-semibold">Login</h1>
        <div
          className={`${showNotification ? "" : "hidden"} w-full flex items-center justify-center ${notification.bg} p-2 rounded-sm`}
        >
          <p>{notification.message}</p>
        </div>

        <form
          className="w-full flex flex-col gap-3"
          onSubmit={(e) => formSubmit(e)}
        >
          <div className="w-full flex flex-col justify-center">
            <label htmlFor="email" className="text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Your email"
              className="border border-slate-400/30 rounded-sm p-2 outline-none focus:border-blue-500 focus:shadow-md transition-colors duration-300"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex flex-col justify-center ">
            <label htmlFor="password" className="text-sm mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Password..."
              className="border border-slate-400/30 rounded-sm p-2 outline-none focus:border-blue-500 focus:shadow-md transition-colors duration-300"
              name="password"
              value={formData.password || ""}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white h-10 rounded-sm mt-5 hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-700 disabled:cursor-not-allowed cursor-pointer transition-colors duration-300 flex items-center justify-center"
            disabled={loding}
          >
            {loding ? "Login...." : "Login"}
          </button>

          <p className="mt-5 mb-2 text-center">
            You do not have an account ?{" "}
            <Link
              href="/register"
              className="text-blue-500 hover:underline cursor-pointer "
            >
              Register now
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
