import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";

import { useUser } from "~/utils";
import { getAllRoles } from "~/models/role.server";
import { partition } from "lodash";

export async function loader({ request: _request }: LoaderArgs) {
  const roles = await getAllRoles();
  return json({ roles });
}

export default function RolesPage() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  const [primaryRoles, secondaryRoles] = partition(
    data.roles,
    (role) => role.type === "primary"
  );

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-yellow-50 p-4 text-black opacity-70">
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <main>
        <div className="flex-flex-col mt-14 justify-center">
          <h2 className="mb-4 text-center text-xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-6xl">
            Primary Roles
          </h2>

          <ul className="mx-auto max-w-sm">
            {primaryRoles.map((role) => {
              return (
                <li key={role.id} className="flex content-center">
                  <Link
                    to={`/roles/${decodeURIComponent(role.name)}`}
                    className="text-white underline visited:text-purple-400"
                  >
                    {role.name}
                  </Link>
                  {role.userId ? (
                    <p className="ml-4 text-red-400">
                      <i>Taken</i>
                    </p>
                  ) : (
                    <p className="ml-4 text-green-400">
                      <i>Available</i>
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <h2 className="text-center text-xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-6xl">
          Secondary Roles
        </h2>

        <ul className="mx-auto max-w-sm">
          {secondaryRoles.map((role) => {
            return (
              <li key={role.id} className="flex content-center">
                <Link
                  to={`/roles/${decodeURIComponent(role.name)}`}
                  className="text-white underline visited:text-purple-400"
                >
                  {role.name}
                </Link>
                {role.userId ? (
                  <p className="ml-4 text-red-400">
                    <i>Taken</i>
                  </p>
                ) : (
                  <p className="ml-4 text-green-400">
                    <i>Available</i>
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </main>
      <Outlet />
    </div>
  );
}
