import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Header from "~/components/header";
import { IMAGE_MAP } from "~/constants";

export async function loader({ params }: LoaderArgs) {
  invariant(params.name, "name not found");

  const name = params.name;

  return json({ name });
}
export default function ConfirmationPage() {
  const data = useLoaderData<typeof loader>();

  const handleDownload = async () => {
    const imageUrl = (IMAGE_MAP as any)[data.name];
    const blob = await fetch(imageUrl).then((res) => res.blob());
    const objectURL = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.style.display = "none";
    link.href = objectURL;
    link.download = `${data.name.split(" ").join("")}_Unredacted.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <Header showBackButton />
      <div className="flex flex-col items-center justify-center px-10 pt-20">
        <p className="mb-4 text-white">{`You chose ${data.name}! 🎉`}</p>
        <p className="mb-4 text-white">
          Please click the button to save an unredacted description of your
          character.
        </p>
        <button
          type="button"
          onClick={handleDownload}
          className="max-w-md rounded-lg bg-blue-600 py-4 px-8 text-blue-100"
        >
          Download Unredacted Image
        </button>
      </div>
    </>
  );
}
