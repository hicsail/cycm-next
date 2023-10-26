import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';

const token =
  process.env.NEXT_PUBLIC_STRAPY_TOKEN;
const Article = () => {

  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles/${id}`, {
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