import Link from "next/link";

export default function Loign() {
  return (
    <div className="bg-slate-100 h-screen flex items-center justify-center   ">
      {/* Login */}
      <div
        className={` bg-white w-96 flex flex-col p-5 gap-10 items-center rounded-md h-fit shadow-sm`}
      >
        <h1 className="text-3xl font-semibold">Login</h1>
        <form action="#" className="w-full flex flex-col gap-3">
          <div className="w-full flex flex-col justify-center">
            <label htmlFor="email" className="text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Your email"
              className="border border-slate-400/30 rounded-sm p-2 outline-none focus:border-blue-500 focus:shadow-md transition-colors duration-300"
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
            />
          </div>
          <Link
            href="/login"
            className="bg-blue-500 text-white h-10 rounded-sm mt-5  hover:bg-blue-700 cursor-pointer transition-colors duration-300 flex items-center justify-center"
          >
            Login
          </Link>

          <p className="mt-5 mb-2 text-center">
            You do not have an account ?{" "}
            <Link
              href="/register"
              className="text-blue-500 hover:underline cursor-pointer "
            >
              Registor now
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
