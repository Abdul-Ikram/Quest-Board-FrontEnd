import { Chrome } from "lucide-react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="h-screen w-full bg-white">
      <div className="flex h-full flex-col items-center justify-center px-4 py-10 sm:px-6 lg:px-20">
        <div className="flex w-full max-w-md flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-bold text-primary sm:text-5xl">
           WebKamai
          </h1>

          <div className="text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Sign Up</h2>
            <p className="mt-1 text-sm text-[#525252]">
              Create your account to get started
            </p>
          </div>

          <div className="w-full">
            <Link
              to=""
              className="flex h-12 w-full items-center justify-center rounded-full border border-gray-300 bg-white text-sm shadow-sm transition hover:bg-gray-100"
            >
              <Chrome className="mr-2 h-5 w-5" />
              Sign Up with <strong className="ml-1">Google</strong>
            </Link>
          </div>

          <fieldset className="w-full border-t border-gray-300 text-center">
            <legend className="mx-auto px-4 text-sm font-medium text-gray-500">
              Or sign up with email
            </legend>
          </fieldset>

          <div className="flex w-full flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              className="h-12 w-full rounded-full border border-gray-300 px-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              placeholder="Email"
              className="h-12 w-full rounded-full border border-gray-300 px-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="password"
              placeholder="Password"
              className="h-12 w-full rounded-full border border-gray-300 px-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button className="h-12 w-full rounded-full bg-primary px-5 text-white shadow-sm transition hover:bg-primary/90">
            Sign Up
          </button>

          <p className="text-sm text-[#525252]">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
