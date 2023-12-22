"use server";

import Image from "next/image";
import Search from "../components/Search";

export default async function Main() {
  return (
    <div className="dc min-h-screen ">
      <div className="main-card">
        <Search />
        <div className="w-4/5 mx-auto">
          <div className="flex justify-between items-center mb-7 md:mb-20">
            <strong className="h4 w-1/2">
              Grow Together: Your Ultimate Plants Care Community!
            </strong>
            <div className="w-1/2">
              <Image
                src={`/images/dreamer.svg`}
                alt="icon"
                width={20}
                height={20}
                layout="responsive"
              />
            </div>
          </div>
          <div className="flex justify-between items-center mb-7 md:mb-20">
            <div className=" w-1/2">
              <Image
                src={`/images/counting_stars.svg`}
                alt="icon"
                width={20}
                height={20}
                layout="responsive"
              />
            </div>
            <strong className="h4 w-1/2">
              Green Vibes Only: Unite with Plant Lovers Worldwide!
            </strong>
          </div>
          <div className="flex justify-between items-center mb-7 md:mb-20">
            <strong className="h4 w-1/2">
              From Expert Tips to Plant Shops: Dive into Our Plants Care
              Collective!
            </strong>

            <div className=" w-1/2">
              <Image
                src={`/images/social.svg`}
                alt="icon"
                width={20}
                height={20}
                layout="responsive"
              />
            </div>
          </div>
          <div className="flex justify-between items-center mb-7 md:mb-20">
            <div className=" w-1/2">
              <Image
                src={`/images/hello.svg`}
                alt="icon"
                width={20}
                height={20}
                layout="responsive"
              />
            </div>
            <strong className="h4 w-1/2">
              Where Plants Thrive and Connections Bloom: Join Us Today!
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
