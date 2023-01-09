import { json, LoaderArgs } from "@remix-run/node";
import { Form, Link, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getRoleByName } from "~/models/role.server";
import { useUser } from "~/utils";

export async function loader({ params }: LoaderArgs) {
  invariant(params.name, "name not found");

  const role = await getRoleByName(params.name);
  if (!role) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ role });
}

export default function RoleDetailsPage() {
  const user = useUser();
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <header className="flex items-center justify-between bg-yellow-50 p-4 text-black opacity-70">
        <p>{user.email}</p>
        <div className="flex gap-4">
          <Link to={"/roles"}>
            <button
              type="submit"
              className="rounded bg-blue-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
            >
              Back
            </button>
          </Link>
          <Form action="/logout" method="post">
            <button
              type="submit"
              className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
            >
              Logout
            </button>
          </Form>
        </div>
      </header>
      <div className="mt-8 flex flex-col justify-center">
        <img src={data.role.redactedImage} className="mx-auto max-w-lg" />
        <Form method="post"></Form>
      </div>
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
