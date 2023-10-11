import React, { useState, useEffect } from 'react';
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { TbProgress } from 'react-icons/tb';

interface CardProps {
  title: string;
  body: string;
  image: string;
  voiceId: string;
}

const Card: React.FC<CardProps> = ({ title, body, image, voiceId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sentences, setSentences] = useState<string[]>([]);
  const [audios, setAudios] = useState<HTMLAudioElement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

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
    setIsPaused(false);
    if (isPaused && audios[currentIndex]) {
      audios[currentIndex].play();
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

  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition duration-300">
      <img src={image} alt={title} className="object-cover w-full h-auto" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 z-10">
        <h2 className="text-white text-xl font-semibold mb-2">{title}</h2>
        <p className="text-white transition-opacity duration-500 opacity-1">
          {sentences[currentIndex]}
        </p>
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