const Discover = () => {
  return (
    <div className=" flex justify-center my-16">
      <div className="p-12 max-w-7xl grid grid-cols-4 gap-16">
        <div className="col-span-3 flex flex-col items-start justify-center">
          <h5 className="text-5xl font-bold font-sans mb-6">Discover Mental Health Resources for Teens</h5>
          <p className="text-lg font-sans mb-6">Explore our wide range of articles and resources for teens.</p>
        </div>
        <div>
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Learn More
          </button>

          <button
            type="button"
            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Discover;
