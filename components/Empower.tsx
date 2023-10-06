import Image from "next/image";

interface EmpowerProps {
  title: string;
  description: string;
  source: string;
  image: string;
}

const Empower = ({ title, description, image }: EmpowerProps) => {
  return (
    <div className="flex justify-center my-16">
      <div className="p-12 max-w-7xl grid grid-cols-2 gap-16">
        <div className="flex flex-col items-start justify-center">
          <span className="text-lg font-bold font-sans mb-4">Empower</span>
          <h5 className="text-5xl font-bold font-sans mb-6">{title}</h5>
          <p className="text-lg font-sans mb-6">{description}</p>
          <button
            type="button"
            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Learn More
          </button>
        </div>
        <div>
          <Image src={image} alt="CYCM Circle" width={800} height={600} />
        </div>
      </div>
    </div>
  );
};

export default Empower;
