import Image from 'next/image'
import { Inter, Nunito } from 'next/font/google'
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import Slider from '@/components/Slider';
import Partners from '@/components/Partners';
import Footer from '@/components/Footer';
import CurrentState from '@/components/CurrentState';

const inter = Inter({ subsets: ['latin'] });
const nunito = Nunito({ subsets: ['latin'] });

// flex min-h-screen flex-col items-center justify-between p-24

const sliderDataList = [
  {
    id: 1,
    content: 'Generate age appropriate, culturally relevant mental health information',
    image: <Image src="/cycm-slider-1.png" alt="CYCM Circle" width={1200} height={400} objectFit='cover' />
  },
  {
    id: 2,
    content: 'Partner with trusted community organizations dedicated to supporting the wellbeing of youth to develop mental health focused programming and training',
    image: <Image src="/cycm-slider-2.png" alt="CYCM Circle" width={1200} height={400} objectFit='cover'/>
  },
  {
    id: 3,
    content: `Engage in research initiatives that aim to develop evidence-based interventions specifically targeting the unique mental health needs of diverse youth
    `,
    image: <Image src="/cycm-slider-3.png" alt="CYCM Circle" width={1200} height={400} objectFit='cover' />
  }
];

const partnersDataList : Array<any> = [
  {
    id: 1,
    image: <Image src="/img130.png" alt="CYCM Circle" width={200} height={200} objectFit='cover' />
  },
  {
    id: 2,
    image: <Image src="/we-belong.png" alt="CYCM Circle" width={200} height={200} objectFit='cover' />
  },
  {
    id: 3,
    image: <Image src="/bpc.png" alt="CYCM Circle" width={200} height={200} objectFit='cover' />
  },
]

export default function Home() {
  return (
    <main
      className={`${nunito.className}`}
    >
      <Hero heading="Empowering Teens with Mental Health Resources"/>
      <Mission/>
      <CurrentState />
      <Slider sliderDataList={sliderDataList} />
      <Partners partners={partnersDataList}/>
      <Footer />
    </main>
  )
}
