import Link from "next/link";
import Form from "./Form";

function page() {
  return (
    <div className="dc min-h-screen ">
      <div className="w-96 p-6 rounded-2xl mx-auto mt-20 bg-white card">
        <h1 className="mb-4 text-2xl font-medium text-center">
          Create account
        </h1>

        <Form />

        <div className="mt-6 text-sm text-center">
          Already have an account,{" "}
          <Link href="/signin" className="link">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
