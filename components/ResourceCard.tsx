import Image from "next/image";

interface ResourceCardProps {
  title: string;
  description: string;
  image: string;
  action: { text: string; link: string };
}

const ResourceCard = ({ title, description, image, action }: ResourceCardProps) => {
  return (
    <div className="text-center">
      <img src={image} alt="CYCM Circle" style={{ maxHeight: "240px", width: "auto", display: "inline" }} />
      <h5 className="text-2xl font-bold font-sans my-2">{title}</h5>
      <p className="text-md font-sans my-2">{description}</p>
      <button
        type="button"
        className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-md px-5 py-2 text-center my-2"
      >
        {action.text}
      </button>
    </div>
  );
};

export default ResourceCard;
