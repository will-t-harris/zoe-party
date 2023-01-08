import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import { getAllRoles } from "~/models/role.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  //TODO replace with logic to get all redacted roles
  const roles = await getAllRoles();
  return json({ roles });
}

export default function RolesPage() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
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

      <main className="flex h-full bg-white">
        <h1 className="text-center text-6xl font-extrabold tracking-tight text-black sm:text-8xl lg:text-9xl">
          Roles
        </h1>
        <div>
          {data.roles.map((role) => {
            return (
              <div>
                <p>{role.name}</p>
                <img src={role.redactedImage} />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
