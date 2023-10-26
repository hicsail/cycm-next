import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonSpinner,
  IonIcon,
  IonFab,
  IonFabButton,
  IonText,
} from '@ionic/react';

import { share, shareOutline, playCircle, add, closeCircle, pauseCircle } from 'ionicons/icons';


interface Props {
  title: string;
  sentences: string[];
  id: string;
  voiceId: string;
}

const CardModal: React.FC<Props> = ({ title, sentences, id, voiceId }) => {

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const modal = useRef<any>(null);
  const input = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef(null);
  const [audioLoading, setAudioLoading] = useState<boolean>(false);

  const fetchAudio = async (sentence: string) => {
    // ... existing fetchAudio code ...
    const apiKey = process.env.NEXT_PUBLIC_ELEVEN_LABS_API_KEY;

    if (!apiKey) {
      throw new Error('ELEVEN_LABS_API_KEY is not defined');
    }

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
        method: 'POST',
        headers: {
          'accept': 'audio/mpeg',
          'xi-api-key': apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "text": sentence,
          "model_id": "eleven_monolingual_v1",
          "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.5
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from server:', errorData);
        return null;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      return new Audio(url);
    } catch (error) {
      console.error('Error occurred while making request:', error);
      return null;
    }
  };
  
  // Create a new state variable to store the audio streams
  const [audios, setAudios] = useState<HTMLAudioElement[]>([]);
  
  // Fetch the audio streams when the sentences prop changes
  useEffect(() => {
    const fetchAudios = async () => {
      const fetchedAudios: (HTMLAudioElement | null)[] = [];
      setAudioLoading(true);
      for (const sentence of sentences) {
        const audio : any = await fetchAudio(sentence);
        if (audio) {
          fetchedAudios.push(audio);
        }
      }
      setAudioLoading(false);
      setAudios(fetchedAudios as HTMLAudioElement[]);
    };
    if (isPlaying) fetchAudios();
  }, [sentences, isPlaying]);
  
  // Modify the useEffect hook that handles the isPlaying state variable
  useEffect(() => {
    if (isPlaying && currentIndex < sentences.length) {
      const currentAudio = audios[currentIndex];
      if (currentAudio) {
        currentAudio.onended = () => {
          setCurrentIndex(prevIndex => prevIndex + 1);
        };
        currentAudio.play();
      }
    } else if (currentIndex === sentences.length) {
      setIsPlaying(false); // Set isPlaying to false when the last sentence has been played
    }
  }, [isPlaying, currentIndex, sentences.length, audios]);

  useEffect(() => {
    if (currentIndex > 0) {
      const container: any = containerRef.current;
      setTimeout(() => {
        const highlightedElement = container.querySelector('.highlight');
        if (highlightedElement) {
          const containerHeight = container.clientHeight;
          const highlightedTop = highlightedElement.offsetTop;
          const highlightedHeight = highlightedElement.offsetHeight;
          const scrollTo = highlightedTop - containerHeight / 2 + highlightedHeight / 2;
          container.scrollTo({
            top: scrollTo,
            behavior: 'smooth',
          });
        }
      }, 0);
    }
  }, [currentIndex]);


  const [message, setMessage] = useState(
    'This modal example uses triggers to automatically open a modal when the button is clicked.'
  );

  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }

  function onWillDismiss(ev: CustomEvent<any>) {
    if (ev.detail.role === 'confirm') {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <IonButton id={`${id}open-modal`} expand="block" fill='outline'>
        Open
      </IonButton>
      <IonModal keepContentsMounted={true} ref={modal} trigger={`${id}open-modal`} color={'dark'}>
        <IonHeader translucent={true}>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => modal.current?.dismiss()}>
                <IonIcon icon={closeCircle} ></IonIcon>
              </IonButton>
            </IonButtons>
            <IonTitle>{title}</IonTitle>
            <IonButtons slot="end">
              <IonButton strong={true} onClick={confirm}>
                <IonIcon icon={shareOutline}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" color={'dark'}>
          <div ref={containerRef} style={{
            maxHeight: '100vh',
          }}>
            {sentences.map((sentence,index) => (
              <IonText className={index == currentIndex ? 'highlight' : ''} color={index <= currentIndex ? "success" : "medium"} key={index}>
                <h3>{sentence}</h3>
              </IonText>
            ))}
          </div>
        </IonContent>
        <IonFab horizontal='end' vertical='bottom'>
            <IonFabButton onClick={() => {
              console.log('hit', isPlaying);
              setIsPlaying(prev => !prev)
            }}>
              {audioLoading ? <IonSpinner name="crescent" /> :
              <IonIcon icon={isPlaying ? pauseCircle : playCircle}></IonIcon>}
            </IonFabButton>
          </IonFab>
      </IonModal>
    </>
  )
}

export default CardModal