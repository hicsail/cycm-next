import React from "react";

interface Props {
  heading: string;
}

const Hero = ({ heading }: Props) => {
  return (
    <div className="flex items-center justify-center h-screen mb-16 bg-fixed bg-center bg-cover custom-img">
      {/* Overlay */}
      <div className="flex items-center w-full h-screen bg-black/50 z-[2]">
        {/* Content */}
        <div className="p-5 text-white z[2] max-w-2xl md:ml-[10%]">
          <h1 className="text-5xl font-sans font-bold md:text-7xl">{heading}</h1>
          <p className="text-xl mt-6 md:text-2xl">
            Discover a wealth of articles, tools, and support for teenage mental health.
          </p>
          <button className="px-8 py-2 border border mt-12">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
