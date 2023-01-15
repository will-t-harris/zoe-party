import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import { Form, Outlet, useCatch, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import invariant from "tiny-invariant";
import Header from "~/components/header";
import { chooseRole, getRoleByName } from "~/models/role.server";
import { requireUser } from "~/session.server";
import { useUser } from "~/utils";

export async function loader({ params }: LoaderArgs) {
  invariant(params.name, "name not found");

  const role = await getRoleByName(params.name);

  if (!role) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ role });
}

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const roleName = body.get("roleName");
  const user = await requireUser(request);

  if (typeof roleName !== "string" || roleName.length === 0) {
    return json(
      { errors: { title: "Role name is required", body: null } },
      { status: 400 }
    );
  }

  await chooseRole(roleName, user.email);

  //TODO send email with unredacted image to user's email

  return redirect(`/roles/${roleName}/confirmation`);
}

export default function RoleDetailsPage() {
  const user = useUser();
  const data = useLoaderData<typeof loader>();

  const [isRoleTaken] = useState(data.role.userId !== null);

  return (
    <>
      <Header showBackButton />
      <div className="mt-8 flex flex-col justify-center">
        {!isRoleTaken && !user.roleName && (
          <div className="flex justify-center">
            <Form
              method="post"
              className="flex justify-center"
              onSubmit={(event) => {
                if (
                  !confirm(
                    "You will not be able to change your role without contacting Trevor or Zoe. Are you sure you want to select this role?"
                  )
                ) {
                  event.preventDefault();
                }
              }}
            >
              <input
                type="hidden"
                name="roleName"
                value={data.role.name}
                readOnly
              />
              <button
                name="_action"
                value="chooseRole"
                className="mb-8 rounded-md bg-white px-4 py-2"
              >
                Choose Role
              </button>
            </Form>
          </div>
        )}
        <img src={data.role.redactedImage} className="mx-auto max-w-lg" />
      </div>
      <Outlet />
    </>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Note not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
