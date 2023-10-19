import Card from "@/components/Card";
import React, { useEffect, useState } from "react";

const token =
  "04678869830e558428de592832c540fbab0c703dfe4e53d5ec96dde2a7137b6c690f26d269bbd34b5c613fb0ae438047785386739026d949538ac5dc43d0c5f119ae7664ae691525e241e7e1272524289722047e2563a56081887ca00232546f446ffae9cb998ed257e8d0d9ce0c33c0b24c1281e8f022e26981298e874d2c4b";
const apiKey = process.env.NEXT_PUBLIC_ELEVEN_LABS_API_KEY;

const Content = () => {
  const [articles, setArticles] = useState([]);
  const [voices, setVoices] = useState([]);
  const [selectedVoiceId, setSelectedVoiceId] = useState('21m00Tcm4TlvDq8ikWAM');
  const [isExpandedArray, setIsExpandedArray] = useState<any>([]);

  useEffect(() => {
    // fetch from localhost:1337/api/articles
    fetch("http://localhost:1337/api/articles?populate=*", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp.data)
        setArticles(resp.data);
        setIsExpandedArray(new Array(resp.data.length).fill(false));
      });

    if (!apiKey) return;
    fetch('https://api.elevenlabs.io/v1/voices', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'xi-api-key': apiKey,
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        setVoices(resp.voices);
      });
  }, []);

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
      <div className="flex flex-column items-start justify-center mt-20">
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
      <div className="flex flex-wrap">
        {articles.map((article: any, index: number) => (
          <div key={article.id} className={`rounded overflow-hidden shadow-lgs m-5 ${isExpandedArray[index] ? 'w-3/4' : 'max-w-sm'}`}>
            <Card
              id={article.id}
              title={article.attributes.title}
              body={article.attributes.body}
              image={article.attributes.header_image.data ? `http://localhost:1337${article.attributes.header_image.data[0].attributes.url}` : ""}
              voiceId={selectedVoiceId}
              isExpanded={isExpandedArray[index]}
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
