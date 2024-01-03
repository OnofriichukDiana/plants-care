import Image from "next/image";

export default async function NotFound() {
  return (
    <div className="dc">
      <div className="main-card flex flex-col items-center justify-center">
        <div className="w-3/5">
          <Image
            src={`/images/country.svg`}
            alt="icon"
            width={20}
            height={20}
            layout="responsive"
          />
        </div>
        <p className="h1">Sorry, this page not found</p>
      </div>
    </div>
  );
}
