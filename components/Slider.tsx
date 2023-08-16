import React, { useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

interface Props {
  sliderDataList: Array<any>;
}

const Slider = ({ sliderDataList }: Props) => {
  const [current, setCurrent] = useState(0);
  const length = sliderDataList.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(sliderDataList) || sliderDataList.length <= 0) {
    return null;
  }

  return (
    <div className="flex justify-center mb-[24px]">
      <div id="gallery" className='className="p-12 max-w-7xl"'>
        <h1 className="text-6xl font-bold my-7 ml-12">Key Focus Areas</h1>
        <div className="relative justify-center p-4 lg:flex hidden">
          {sliderDataList.map((sliderData, index) => {
            return (
              <div
                key={index}
                className={
                  index === current
                    ? "opacity[1] ease-in duration-1000"
                    : "opacity-0"
                }
              >
                <FaArrowCircleLeft
                  onClick={prevSlide}
                  className="absolute top-[50%] left-[90px] text-white/70 cursor-pointer select-none z-[2]"
                  size={50}
                />
                <div className="slide-content pb-12 min-w-full">
                  <div>
                    <div className="flex justify-center min-w-full">
                    {index === current && sliderData.image}
                    </div>
                    {/* circles that indicate which slide you're on */}
                    <div className="flex justify-center mt-4">
                      {sliderDataList.map((_, idx) => (
                        <div
                          onClick={() => setCurrent(idx)}
                          key={idx}
                          className={
                            idx === current
                              ? "w-4 h-4 bg-white rounded-full mx-2 cursor-pointer"
                              : "w-4 h-4 bg-white/50 rounded-full mx-2 cursor-pointer"
                          }
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                <FaArrowCircleRight
                  onClick={nextSlide}
                  className="absolute top-[50%] right-[90px] text-white/70 cursor-pointer select-none z-[2]"
                  size={50}
                />
              </div>
            );
          })}
        </div>
        
        <div className="lg:hidden">
          {
            sliderDataList.map((sliderData, index) => (
              <div key={index}>
                <div>
                  {sliderData.image}
                </div>
              </div>
            ))
          }
        </div>

        
      </div>
    </div>
  );
};

export default Slider;
