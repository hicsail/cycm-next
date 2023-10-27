import DualColumnImageText from "@/components/DualColumnImageText";
import DualColumnText from "@/components/DualColumnText";
import Profile from "@/components/Profile";

export default function Feed() {
  const profiles = [
    {
      name: "John Doe",
      title: "Mental Health Specialist",
      description: "John is a licensed therapist with over 10 years of experience in helping teens.",
      socials: [
        { name: "linkedin", link: "#" },
        { name: "twitter", link: "#" },
      ],
    },
    {
      name: "Jane Smith",
      title: "Youth Counselor",
      description:
        "Jane is dedicated to providing support and guidance to young individuals facing mental health challenges.",
      socials: [
        { name: "linkedin", link: "#" },
        { name: "twitter", link: "#" },
      ],
    },
    {
      name: "Michael Johnson",
      title: "Psychiatrist",
      description: "Michael specializes in diagnosing and treating mental health disorders in adolescents",
      socials: [
        { name: "linkedin", link: "#" },
        { name: "twitter", link: "#" },
      ],
    },
    {
      name: "Emily Davis",
      title: "Social Worker",
      description: "Emily is passionate about advocating for the mental well-being of teenagers.",
      socials: [
        { name: "linkedin", link: "#" },
        { name: "twitter", link: "#" },
      ],
    },
    {
      name: "David Thompson",
      title: "School Counselor",
      description: "David provides guidance and support to students dealing with mental health issue.",
      socials: [
        { name: "linkedin", link: "#" },
        { name: "twitter", link: "#" },
      ],
    },
    {
      name: "Sarah Miller",
      title: "Peer Support Specialist",
      description: "Sarah uses her own experiences to connect with and empower teens on their mental health journey.",
      socials: [
        { name: "linkedin", link: "#" },
        { name: "twitter", link: "#" },
      ],
    },
  ];

  return (
    <div className="pt-12">
      <DualColumnText
        tagline="Empowering"
        title="Supporting Teen Mental Health"
        description="Welcome to our website dedicated to providing resources and articles for teens about mental health. We believe in the importance of supporting and empowering teenagers in their mental well-being journey. Explore our content to find valuable information, tips, and advice on various mental health topics."
        actions={[
          { text: "Learn More", link: "#" },
          { text: "Sign Up", link: "#" },
        ]}
      />
      <DualColumnImageText
        title="Our Mission, Vision, and Values"
        description="We are dedicated to providing resources and articles for teens to support their mental health. Our Mission is to create a safe and inclusive space where young people can find information, guidance, and support, We believe in the power of education and awareness to break the stigma surrounding mental health and empower teens to prioritize their well-being."
        image={{ source: "/cycm-mission.png", position: "left" }}
        actions={[
          { text: "Learn More", link: "#" },
          { text: "Sign Up", link: "#" },
        ]}
      />
      <div className="flex justify-center my-16">
        <div className="p-8 max-w-7xl md:p-12 w-full">
          <div className="flex flex-col items-start justify-center">
            <span className="text-lg font-bold font-sans mb-2 md:mb-4">Empowering</span>
            <h5 className="font-bold font-sans mb-6 text-4xl md:text-5xl">Meet Our Team</h5>
          </div>
          <p className="text-md font-sans mb-4 md:mb-6 md:text-lg">
            get to know the experts behind our mental health resources
          </p>
          <div className="grid gap-8 md:grid-cols-4 md:mb-16">
            {profiles.map((profile) => (
              <Profile
                name={profile.name}
                title={profile.title}
                description={profile.description}
                socials={profile.socials}
              />
            ))}
          </div>
          <div className="flex flex-col items-start justify-center">
            <h5 className="text-4xl font-bold font-sans mb-4 md:mb-6 md:text-4xl">We're hiring!</h5>
            <p className="text-md font-sans mb-4 md:mb-6 md:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <button
              type="button"
              className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-md px-5 py-2.5 text-center mr-2"
            >
              Open Positions
            </button>
          </div>
        </div>
      </div>
      <DualColumnText
        title="Explore Our Mental Health Resources"
        description="Discover a wealth of resources and articles on mental specifically curated for teans."
        actions={[
          { text: "Learn More", link: "#" },
          { text: "Sign Up", link: "#" },
        ]}
      />
    </div>
  );
}
