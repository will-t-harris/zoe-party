import {  LoaderArgs,  } from "@remix-run/node";
import { json } from "@remix-run/node";
import {  Link, Outlet, useLoaderData } from "@remix-run/react";
import { partition } from "lodash";

import { useUser } from "~/utils";
import { getAllRoles } from "~/models/role.server";
import Header from "~/components/header";

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
      <Header />
      <main className="pb-14 text-white">
        <h1 className="flickering-text mb-4 mt-20 text-center text-xl">
          A party to die for
        </h1>
        <div className="text-background mx-auto mt-20 max-w-2xl p-8">
          <p className="mb-2">
            You've been invited to a murder mystery party set in a 1920's
            speakeasy. Guests are on a mission to uncover clues, discover
            secrets, and find the murderer... hopefully before becoming their
            next victim.
          </p>
          <p className="mb-2">
            <i> Bum bum buuuum!</i>
          </p>
          <p className="mb-2">
            To RSVP: claim a role, don your fanciest 20's attire, and prepare
            yourself for a night of jazz, cocktails/mocktails, and (scandalous!)
            rouged knees.
          </p>
          <p className="mb-2">
            Because everyone has secrets to hide, you won't see your full
            (unredacted) character card until you claim a role.
          </p>
          <p className="mb-2">
            You'll notice that roles are grouped into two categories, primary
            and secondary.{" "}
            <strong>
              If possible, please select from the primary roles until they are
              all claimed.
            </strong>{" "}
          </p>
          <p className="mb-2">
            If there are two people mentioned on your invitation, please log in
            and choose roles separately,{" "}
            <strong>with separate email addresses.</strong>
          </p>
          <p className="mb-2">
            Your secret-filled role card will be sent to the email address you
            provide as soon as your role is claimed.
          </p>
          <p className="mb-2">
            The guest who figures out the killer and their motive will win a
            prize, but of course the true reward is the thrill of the chase.{" "}
          </p>
          <p className="mb-2">Can't wait to see you there!</p>
        </div>
        <div className="flex-flex-col mt-14 mb-8 justify-center">
          <h2 className="mb-4 text-center text-xl font-extrabold tracking-tight sm:text-4xl lg:text-6xl">
            Primary Roles
          </h2>

          <ul className="mx-auto max-w-sm">
            {primaryRoles.map((role) => {
              return (
                <li key={role.id} className="flex content-center">
                  <Link
                    to={`/roles/${role.name}`}
                    className="underline visited:text-purple-400"
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

        <h2 className="mb-4 text-center text-xl font-extrabold tracking-tight sm:text-4xl lg:text-6xl">
          Secondary Roles
        </h2>

        <ul className="mx-auto max-w-sm">
          {secondaryRoles.map((role) => {
            return (
              <li key={role.id} className="flex content-center">
                <Link
                  to={`/roles/${decodeURIComponent(role.name)}`}
                  className="underline visited:text-purple-400"
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
