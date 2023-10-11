import Card from "@/components/Card";
import React, { useEffect, useState } from "react";

const token =
  "04678869830e558428de592832c540fbab0c703dfe4e53d5ec96dde2a7137b6c690f26d269bbd34b5c613fb0ae438047785386739026d949538ac5dc43d0c5f119ae7664ae691525e241e7e1272524289722047e2563a56081887ca00232546f446ffae9cb998ed257e8d0d9ce0c33c0b24c1281e8f022e26981298e874d2c4b";
const apiKey = process.env.NEXT_PUBLIC_ELEVEN_LABS_API_KEY;

const content = () => {
  const [articles, setArticles] = useState([]);
  const [voices, setVoices] = useState([]);
  const [selectedVoiceId, setSelectedVoiceId] = useState('21m00Tcm4TlvDq8ikWAM');

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

  return (
    <div>
      <div className="flex flex-column justify-center mt-20">
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
      <div className="flex flex-col sm:flex-row items-center justify-center h-90 mt-20">
        {articles &&
          articles.length > 0 &&
          articles.map((article: any) => (
            <div key={article.id} className="max-w-sm rounded overflow-hidden shadow-lgs m-5">
              <Card
                title={article.attributes.title}
                body={article.attributes.body}
                image={article.attributes.header_image.data ? `http://localhost:1337${article.attributes.header_image.data[0].attributes.url}` : ""}
                voiceId={selectedVoiceId}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default content;
