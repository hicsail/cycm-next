import React from "react";
import Image from "next/image";

const Mission = () => {
  return (
    <div className="flex justify-center mb-[48px]" id="about">
      <div className="p-12 max-w-7xl">
        <h1 className="text-7xl font-bold my-7">Mission</h1>
        <div className="flex">
          <div className="mt-4">
            <ul>
              <li className="text-3xl my-12">
                <div className="max-w-sm rounded overflow-hidden shadow-lg border-red-400">
                - A multifaceted approach to address the growing mental health
                crisis among youth of color and LGBTQ youth
                </div>
              </li>
              <li className="text-3xl">
                - The initiative aims to advance mental health literacy and
                awareness for youth of color in communities surrounding BMC and
                beyond
              </li>
            </ul>
          </div>
          <div className="ml-24 hidden lg:block">
            {/* image cycm-circle.jpg from public folder */}
            <Image
              src="/cycm-circle.jpg"
              alt="CYCM Circle"
              width={600}
              height={600}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
