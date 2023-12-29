import Image from "next/image";

export default async function NotFoundPage() {
  return (
    <div className="dc min-h-screen ">
      <div className="main-card flex items-center justify-center">
        <div className=" w-1/2">
          <Image
            src={`/images/country.svg`}
            alt="icon"
            width={20}
            height={20}
            layout="responsive"
          />
        </div>
      </div>
    </div>
  );
}
