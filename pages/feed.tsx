export default function Feed() {
  return (
    <div>
      <div className="flex justify-center mt-28 mb-16">
        <div className="p-8 max-w-7xl grid gap-8 md:gap-16 md:grid-cols-3 md:p-12">
          <div className="col-span-2 flex flex-col items-start justify-center">
            <span className="text-lg font-bold font-sans mb-2 md:mb-4">Tagline</span>
            <h5 className="text-4xl font-bold font-sans mb-4 md:mb-6 md:text-5xl">Short Heading Here</h5>
            <p className="text-md font-sans mb-4 md:mb-6 md:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
              tristique.
            </p>
            <div>
              <button
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-md px-5 py-2.5 text-center mr-2"
              >
                Button 1
              </button>
              <button
                type="button"
                className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-md px-5 py-2.5 text-center mr-2"
              >
                Button 2
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-16">
        <div className="p-8 max-w-7xl md:p-12 w-full">
          <span className="text-lg font-bold font-sans mb-4 md:mb-6">Blog</span>
          <h5 className="font-bold font-sans mb-6 text-4xl md:text-4xl">Short Heading Gose Here</h5>
          <p className="text-md font-sans mb-4 md:mb-6 md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
            tristique.
          </p>
          {/* Card Goes Here */}
        </div>
      </div>
      <div className="flex justify-center my-16">
        <div className="p-8 max-w-7xl grid gap-8 md:gap-16 md:grid-cols-2 md:p-12">
          <div className="flex flex-col items-start justify-center">
            <h5 className="text-4xl font-bold font-sans mb-4 md:mb-6 md:text-5xl">Medium Length Heading Goes Here</h5>
          </div>
          <div>
            <p className="text-md font-sans mb-4 md:mb-6 md:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
              tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae
              erat.
            </p>
            <div>
              <button
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-md px-5 py-2.5 text-center mr-2"
              >
                Button 1
              </button>
              <button
                type="button"
                className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-md px-5 py-2.5 text-center mr-2"
              >
                Button 2
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
