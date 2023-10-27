import Image from "next/image";

interface DualColumnImageTextProps {
  tagline?: string;
  title: string;
  description: string;
  image: { source: string; position: "left" | "right" };
  actions?: { text: string; link: string }[];
}

const DualColumnImageText = ({ tagline, title, description, image, actions = [] }: DualColumnImageTextProps) => {
  return (
    <div className="flex justify-center my-16">
      <div className="p-8 max-w-7xl grid gap-8 md:gap-16 md:grid-cols-2 md:p-12">
        <div className="flex flex-col items-start justify-center">
          {tagline && <span className="text-lg font-bold font-sans mb-2 md:mb-4">{tagline}</span>}
          <h5 className="text-4xl font-bold font-sans mb-4 md:mb-6 md:text-5xl">{title}</h5>
          <p className="text-md font-sans mb-4 md:mb-6 md:text-lg">{description}</p>
          <div>
            {actions.length === 1 && (
              <button
                type="button"
                className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-md px-5 py-2.5 text-center mr-2"
              >
                {actions[0].text}
              </button>
            )}
            {actions.length >= 2 &&
              actions?.map((action, index) => (
                <button
                  key={action.text}
                  type="button"
                  className={`${
                    index % 2 === 0
                      ? "text-white bg-gray-800"
                      : "text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900"
                  }  focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-md px-5 py-2.5 text-center mr-2`}
                >
                  {action.text}
                </button>
              ))}
          </div>
        </div>
        <div className={image.position === "left" ? "md:order-first" : ""}>
          <Image src={image.source} alt="CYCM Circle" width={800} height={600} />
        </div>
      </div>
    </div>
  );
};

export default DualColumnImageText;
