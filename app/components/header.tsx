import { Form, Link } from "@remix-run/react";
import { useUser } from "~/utils";

interface Props {
  showBackButton: boolean;
}

export default function Header({ showBackButton }: Props) {
  const user = useUser();
  return (
    <header className="header-background flex items-center justify-between p-4 text-black">
      <p>{user.email}</p>
      <div className="flex gap-4">
        {showBackButton && (
          <Link to={"/roles"}>
            <button
              type="submit"
              className="rounded bg-blue-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
            >
              Back
            </button>
          </Link>
        )}
        <Form action="/logout" method="post">
          <button
            type="submit"
            name="_action"
            value="logout"
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </div>
    </header>
  );
}
