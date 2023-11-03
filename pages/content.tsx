import Card from "@/components/Card";
import React, { useEffect, useState } from "react";
import { GetServerSideProps } from 'next';

const token =
  process.env.NEXT_PUBLIC_STRAPY_TOKEN;
const apiKey = process.env.NEXT_PUBLIC_ELEVEN_LABS_API_KEY;
const voiceIds = [
  'D38z5RcWu1voky8WS1ja',
  '21m00Tcm4TlvDq8ikWAM',
  'EXAVITQu4vr4xnSDxMaL',
];
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    console.log(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?populate=*`);
    const articlesResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?populate=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const articlesData = await articlesResponse.json();
    console.log(articlesData);
    if (!apiKey) {
      return {
        props: {
          articles: articlesData.data,
          voices: [],
        },
      };
    }

    // const voicesResponse = await fetch('https://api.elevenlabs.io/v1/voices', {
    //   method: 'GET',
    //   headers: {
    //     'accept': 'application/json',
    //     'xi-api-key': apiKey,
    //   },
    // });
    // const voicesData = await voicesResponse.json();

    const voicesPromises = voiceIds.map((voiceId) =>
    fetch(`https://api.elevenlabs.io/v1/voices/${voiceId}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'xi-api-key': apiKey,
      },
    }).then((res) => res.json())
  );

  const voicesData = await Promise.all(voicesPromises);

    return {
      props: {
        articles: articlesData.data,
        voices: voicesData,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        articles: [],
        voices: [],
      },
    };
  }
};

interface ContentProps {
  articles: any[];
  voices: any[];
}

const Content = ({articles, voices} : ContentProps) => {
  console.log(voices);
  const [selectedVoiceId, setSelectedVoiceId] = useState('21m00Tcm4TlvDq8ikWAM');
  const [isExpandedArray, setIsExpandedArray] = useState<any>([]);

  // useEffect(() => {
  //   // fetch from localhost:1337/api/articles
  //   fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?populate=*`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((resp) => {
  //       setArticles(resp.data);
  //       setIsExpandedArray(new Array(resp.data.length).fill(false));
  //     });
  // }, []);

  // useEffect(() => {
  //   if (!apiKey) return;
  //   fetch('https://api.elevenlabs.io/v1/voices', {
  //     method: 'GET',
  //     headers: {
  //       'accept': 'application/json',
  //       'xi-api-key': apiKey,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((resp) => {
  //       setVoices(resp.voices);
  //     });
  // }, []);

  const handleVoiceChange = (event: any) => {
    console.log(event.target.value)
    setSelectedVoiceId(event.target.value);
  };

  const handleExpandCard = (index: number) => {
    setIsExpandedArray((prevArray: any) => {
      const newArray = [...prevArray];
      newArray[index] = !newArray[index];
      return newArray;
    });
  };

  return (
    <div>
      <div className="flex flex-column items-start justify-center mt-40">
        <select id="countries" onChange={handleVoiceChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {voices.map((voice: any) => (
            <option key={voice.voice_id} value={voice.voice_id}>
              {voice.name}
            </option>
          ))}
          {
            selectedVoiceId
          }
        </select>
      </div>
      <div className="flex flex-wrap justify-center">
        {articles && articles.length > 0 && articles.map((article: any, index: number) => (
          <div key={article.id} className={`rounded overflow-hidden shadow-lgs m-5 ${isExpandedArray[index] ? 'w-3/4' : 'max-w-sm'}`}>
            <Card
              id={article.id}
              title={article.attributes.title}
              body={article.attributes.body}
              image={article.attributes.header_image.data ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${article.attributes.header_image.data[0].attributes.url}` : ""}
              voiceId={selectedVoiceId}
              isExpanded={isExpandedArray[index]}
              manual_id={article.attributes.manual_id}
              setIsExpandedArray={() => handleExpandCard(index)}
              index={index}
            />
          </div>
        ))}
      </div>
      <div style={{
        height: 200
      }}/>
    </div>
  );
};

export default Content;
