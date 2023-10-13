import Image from "next/image";
import { Inter, Nunito } from "next/font/google";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Slider from "@/components/Slider";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import CurrentState from "@/components/CurrentState";
import Empower from "@/components/Empower";
import ResourceCard from "@/components/ResourceCard";
import Discover from "@/components/Discover";

const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"] });

// flex min-h-screen flex-col items-center justify-between p-24
const resources = [
  {
    title: "Explore Informative Articles on Mental Health",
    description: "Find the support you need in our welcoming community.",
    image: "/cycm-slider-1.png",
    action: { text: "Learn More", link: "" },
  },
  {
    title: "Connect with Others in a Supportive Community",
    description: "Share your experiences and learn from others.",
    image: "/cycm-slider-2.png",
    action: { text: "Join Now", link: "" },
  },
  {
    title: "Access a Variety of Mental Health Resources",
    description: "Find articles, videos, and tools to support your mental well-being.",
    image: "/cycm-slider-3.png",
    action: { text: "Get Started", link: "" },
  },
];

const sliderDataList = [
  {
    id: 1,
    content: "Generate age appropriate, culturally relevant mental health information",
    image: <Image src="/cycm-slider-1.png" alt="CYCM Circle" width={1200} height={400} objectFit="cover" />,
  },
  {
    id: 2,
    content:
      "Partner with trusted community organizations dedicated to supporting the wellbeing of youth to develop mental health focused programming and training",
    image: <Image src="/cycm-slider-2.png" alt="CYCM Circle" width={1200} height={400} objectFit="cover" />,
  },
  {
    id: 3,
    content: `Engage in research initiatives that aim to develop evidence-based interventions specifically targeting the unique mental health needs of diverse youth
    `,
    image: <Image src="/cycm-slider-3.png" alt="CYCM Circle" width={1200} height={400} objectFit="cover" />,
  },
];

const partnersDataList: Array<any> = [
  {
    id: 1,
    image: <Image src="/img130.png" alt="CYCM Circle" width={200} height={200} objectFit="cover" />,
  },
  {
    id: 2,
    image: <Image src="/we-belong.png" alt="CYCM Circle" width={200} height={200} objectFit="cover" />,
  },
  {
    id: 3,
    image: <Image src="/bpc.png" alt="CYCM Circle" width={200} height={200} objectFit="cover" />,
  },
];

export default function Home() {
  return (
    <main className={`${nunito.className}`}>
      <Hero heading="Empowering Teens with Mental Health Resources" />
      <Empower
        title="Supporting Teens Through Mental Health Awareness"
        description="Discover helpful resources and articles to promote mental health awareness and support for teens. Together, we can create a safe and nurturing environment for their well-being."
        source=""
        image="/cycm-circle.jpg"
      />
      <div className="flex flex-col items-center my-16">
        <h5 className="text-center font-bold font-sans mb-12 max-w-7xl px-8 text-4xl md:px-12 md:text-5xl">
          Discover Mental Health Resources for Teens
        </h5>
        <div className="flex max-w-7xl gap-10 px-8 flex-col md:px-12 md:flex-row">
          {resources.map((resource) => (
            <ResourceCard
              title={resource.title}
              description={resource.description}
              image={resource.image}
              action={resource.action}
            />
          ))}
        </div>
      </div>
      <Discover />
      {/* <Mission/> */}
      {/* <CurrentState /> */}
      {/* <Slider sliderDataList={sliderDataList} /> */}
      {/* <Partners partners={partnersDataList} /> */}
      {/* <Footer /> */}
    </main>
  );
}
