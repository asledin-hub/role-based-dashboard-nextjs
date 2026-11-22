"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const registerData = {
  fullName: "",
  email: "",
  password: "",
  confirm_password: "",
};

const notifications = {
  success: {
    message: "You're registered successfully",
    bg: "bg-green-500/20 text-green-600",
  },
  error: {
    message: "User already exists",
    bg: "bg-red-500/20 text-red-600",
  },
  errorPassword: {
    message: "Passwords do not match",
    bg: "bg-red-500/20 text-red-600",
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // async function formSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   if (
  //     formData.fullName === "" ||
  //     formData.email === "" ||
  //     formData.password === "" ||
  //     formData.confirm_password === ""
  //   ) {
  //     setShowNotification(true);
  //     setNotification(notifications.warning);
  //     return;
  //   }
  //   if (formData.password !== formData.confirm_password) {
  //     setShowNotification(true);
  //     setNotification(notifications.errorPassword);
  //     return;
  //   }
  //   setFormData(registerData);
  //   setNotification(notifications.success);
  //   setShowNotification(true);
  //   // setTimeout(() => {
  //   //   setShowNotification(false);

  //   // }, 2000);
  // }

  async function formSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      formData.fullName === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.confirm_password === ""
    ) {
      setNotification(notifications.warning);
      setShowNotification(true);
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setNotification(notifications.errorPassword);
      setShowNotification(true);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setNotification(notifications.error);
        setShowNotification(true);
        return;
      }

      setFormData(registerData);
      setNotification(notifications.success);
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
        router.push("/login");
      }, 2000);
    } catch {
      setNotification(notifications.error);
      setShowNotification(true);
    }
  }

  return (
    <div className="bg-slate-100 h-screen flex items-center justify-center   ">
      <div className="bg-white w-96 flex flex-col p-5 gap-10 items-center rounded-md h-fit shadow-sm">
        <h1 className="text-3xl font-semibold">Registration</h1>
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
            <label htmlFor="fullName" className="text-sm mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Full name"
              className="border border-slate-400/30 rounded-sm p-2 outline-none focus:border-blue-500 focus:shadow-md transition-colors duration-300 capitalize"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
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
          <div className="w-full flex flex-col justify-center ">
            <label htmlFor="confirm_password" className="text-sm mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password..."
              className="border border-slate-400/30 rounded-sm p-2 outline-none focus:border-blue-500 focus:shadow-md transition-colors duration-300"
              name="confirm_password"
              value={formData.confirm_password || ""}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white h-10 rounded-sm mt-5  hover:bg-blue-700 cursor-pointer transition-colors duration-300 flex items-center justify-center"
          >
            Register
          </button>

          <p className="mt-5 mb-2 text-center">
            Do you have an account ?{" "}
            <Link
              href="/login"
              className="text-blue-500 hover:underline cursor-pointer "
            >
              Login now
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
