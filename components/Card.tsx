import React, { useState, useEffect } from 'react';
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { FaExpand } from 'react-icons/fa';
import { TbProgress } from 'react-icons/tb';
import { useRouter } from 'next/router';
import CardModal from './CardModal';
import { GetServerSideProps } from 'next';

interface CardProps {
  id: string;
  title: string;
  body: string;
  image: string;
  voiceId: string;
  isExpanded: boolean;
  setIsExpandedArray: any;
  index: number
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const apiKey = process.env.NEXT_PUBLIC_ELEVEN_LABS_API_KEY;

//   if (!apiKey) {
//     throw new Error('ELEVEN_LABS_API_KEY is not defined');
//   }

//   try {
//     const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
//       method: 'POST',
//       headers: {
//         'accept': 'audio/mpeg',
//         'xi-api-key': apiKey,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         "text": sentence,
//         "model_id": "eleven_monolingual_v1",
//         "voice_settings": {
//           "stability": 0.5,
//           "similarity_boost": 0.5
//         }
//       })
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error('Error response from server:', errorData);
//       return null;
//     }

//     const blob = await response.blob();
//     const url = URL.createObjectURL(blob);
//     return new Audio(url);
//   } catch (error) {
//     console.error('Error occurred while making request:', error);
//     return null;
//   }
// };

const Card: React.FC<CardProps> = ({ id, title, body, image, voiceId, isExpanded, setIsExpandedArray, index }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sentences, setSentences] = useState<string[]>([]);
  const [audios, setAudios] = useState<HTMLAudioElement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  //const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // set sentences
  useEffect(() => {
    setSentences(body.split('.'));
  }, [body]);

  useEffect(() => {
    audios.forEach((audio, index) => {
      audio.onended = () => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % sentences.length;
          if (nextIndex === 0) {
            setIsPaused(true);
            return 0;
          }
          if (audios[nextIndex]) {
            audios[nextIndex].play();
          }
          return nextIndex;
        });
      };
    });
  }, [audios]);

  const fetchAudio = async (sentence: string) => {
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

  const handlePlayClick = async () => {
    if (isPaused && audios[currentIndex]) {
      audios[currentIndex].play();
      setIsPaused(false);
    } else {
      setIsLoading(true);
      const fetchedAudios: (HTMLAudioElement | null)[] = [];
      for (const sentence of sentences) {
        const audio = await fetchAudio(sentence);
        if (audio) {
          fetchedAudios.push(audio);
        }
      }
      setAudios(fetchedAudios as HTMLAudioElement[]);
      setIsLoading(false);
      if (fetchedAudios[0]) {
        fetchedAudios[0].play();
      }
    }
  };

  const handlePauseClick = () => {
    const audio = audios[currentIndex];
    if (audio) {
      audio.pause();
      setIsPaused(true);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={`relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition duration-300 ${isExpanded ? 'w-full' : ''}`} style={isExpanded ? {
      minHeight: 500,
      minWidth: "100%"
    }
      :
      {
        minHeight: 320,
        minWidth: 360
      }
    }>
      <img src={image.length > 0 ? image : "/black-background.png"} alt={title} className={`object-cover w-full`} style={isExpanded ? {
        minHeight: 500
      }
        :
        {
          minHeight: 320
        }} />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 z-10">
        <h2 className="text-white text-xl font-semibold mb-2">{title}</h2>
        {isExpanded && currentIndex > 0 && <p className="text-white">{sentences[currentIndex - 1]}</p>}
        <p className="text-white font-bold">{sentences[currentIndex]}</p>
        {isExpanded && currentIndex < sentences.length - 1 && <p className="text-white">{sentences[currentIndex + 1]}</p>}
      </div>
      <div className="absolute top-0 right-20 p-4 z-30">
        <button onClick={() => router.push(`/article?id=${id}`)}>
          See full article
        </button>
      </div>
      <div className="absolute top-0 right-0 p-4 z-30">
        <FaExpand className="text-4xl text-white" onClick={() => {
          // set the value at position index to opposite of the set boolean value
          setIsExpandedArray((prevArray: any) => {
            const newArray = [...prevArray];
            newArray[index] = !newArray[index];
            return newArray;
          });
        }} />
        <CardModal title={title} sentences={sentences} id={id} voiceId={voiceId} />
      </div>
      <div className="absolute top-0 left-0 right-0 bg-transparent p-4 z-20">
        {
          isLoading ?
            <TbProgress className="text-4xl" /> :
            (
              !isPaused ?
                <AiFillPauseCircle
                  className="text-4xl"
                  onClick={handlePauseClick}
                /> :
                <AiFillPlayCircle
                  className="text-4xl"
                  onClick={handlePlayClick}
                />
            )
        }
      </div>
    </div>
  );
};

export default Card;