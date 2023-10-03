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
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // set sentences
  useEffect(() => {
    setSentences(body.split('.'));
  }, [body]);

  useEffect(() => {
    if (audio) {
      audio.onended = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sentences.length);
      };
    }
  }, [audio]);

  useEffect(() => {
    if (currentIndex !== 0) {
      handlePlayClick();
    }
  }, [currentIndex]);

  const handlePlayClick = async () => {
    setIsLoading(true);
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
          "text": sentences[currentIndex],
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
        setIsLoading(false);
        return;
      }
    
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const newAudio = new Audio(url);
      setAudio(newAudio);
      newAudio.play();
      setIsLoading(false);
    } catch (error) {
      console.error('Error occurred while making request:', error);
      setIsLoading(false);
    }
  };

  const handlePauseClick = () => {
    if (audio) {
      audio.pause();
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
              audio && !audio.paused ?
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