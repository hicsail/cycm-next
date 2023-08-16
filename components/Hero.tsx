import React from "react";

interface Props {
  heading: string
}

const Hero = ({ heading }: Props) => {
  return (
    <div className="flex items-center justify-center h-screen mb-[48px] bg-fixed bg-center bg-cover custom-img">
      {/* Overlay */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-[2]">
        {/* Content */}
        <div className="p-5 text-white z[2] ml-52 mt-52 max-w-xl">
          <h1 className="text-7xl font-bold">
            { heading }
          </h1>
          <button className="px-8 py-2 border border mt-12">Navigate to Content</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
