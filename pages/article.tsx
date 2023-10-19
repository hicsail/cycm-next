import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';

const token =
  "04678869830e558428de592832c540fbab0c703dfe4e53d5ec96dde2a7137b6c690f26d269bbd34b5c613fb0ae438047785386739026d949538ac5dc43d0c5f119ae7664ae691525e241e7e1272524289722047e2563a56081887ca00232546f446ffae9cb998ed257e8d0d9ce0c33c0b24c1281e8f022e26981298e874d2c4b";
const Article = () => {

  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/articles/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });
        const data = await response.json();
        console.log(data);
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <div className="flex flex-column justify-center mt-20">
        <div className="max-w-lg">
      <div className="header mt-20">
        <h2>
          {
            article.data.attributes.title
          }
        </h2>
        <h2>
          {
            article.data.attributes.published_date
          }
        </h2>
      </div>
      
      <div className="content mt-20">
        <p>
          {
            article.data.attributes.body
          }
        </p>
      </div>
      </div>
      </div>
    </div>
  )

}

export default Article;