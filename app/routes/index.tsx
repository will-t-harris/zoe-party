import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 ">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-row shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <img
              className="h-full w-full object-cover"
              src="/roaring-20s.jpg"
              alt="Welcome to the roaring 20s image"
            />
            <div className="flex flex-col justify-center px-4 ">
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {user ? (
                  <Link
                    to="/roles"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                  >
                    View Roles
                  </Link>
                ) : (
                  <div className="space-y-4 sm:mx-auto">
                    <Link
                      to="/join"
                      className="flex w-max items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
                    >
                      Log In
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
