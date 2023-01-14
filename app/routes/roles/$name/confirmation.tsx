import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Header from "~/components/header";
import { useUser } from "~/utils";

export async function loader({ params }: LoaderArgs) {
  invariant(params.name, "name not found");

  const name = params.name;

  return json({ name });
}
export default function ConfirmationPage() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center px-10 pt-20">
        <p className="mb-4 text-white">{`You chose ${data.name}! 🎉`}</p>
        <p className="text-white">{`An email will be sent to ${user.email} with unredacted information about your character.`}</p>
      </div>
    </>
  );
}
