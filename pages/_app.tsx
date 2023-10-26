import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';



import {
  setupIonicReact,
  IonApp,
  IonContent,
} from "@ionic/react";
import { useEffect } from "react";

setupIonicReact();

export default function App({ Component, pageProps }: AppProps) {

  // add dark to body
  useEffect(() => {
    document.body.classList.toggle('dark', true);
  }, []);
  return (
    <>
      <IonApp>
        <IonContent color={"dark"}>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </IonContent>
      </IonApp>
    </>
  );
}
