import React, { useEffect, useState } from "react";

const MediumBlog = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const apiKey = process.env.REACT_APP_RSS2JSON_API_KEY;
        if (!apiKey) {
          throw new Error("API key is missing");
        }
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/tag/ai&api_key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "ok") {
          const blogsWithImages = data.items.filter((item) => {
            return item.thumbnail || item.content.includes("<img");
          });

          if (blogsWithImages.length === 0) {
            throw new Error("No blogs with images found");
          }

          const randomIndex = Math.floor(
            Math.random() * blogsWithImages.length
          );
          const selectedBlog = blogsWithImages[randomIndex];

          setBlog({
            title: selectedBlog.title,
            link: selectedBlog.link,
            content: selectedBlog.content || selectedBlog.description,
          });
          setLoading(false);
        } else {
          throw new Error("Failed to fetch blog");
        }
      } catch (err) {
        console.error("Error fetching Medium blog:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlog();
  }, []);

  useEffect(() => {
    const images = document.querySelectorAll(".blog-content img");
    images.forEach((img) => {
      img.classList.add("w-full", "h-[70vh]", "object-cover", "rounded-md");
    });
  }, [blog]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-gray-100 text-black p-4 rounded-md">
      {blog && (
        <>
          <h1 className="font-bold text-4xl">{blog.title}</h1>

          <div
            className="blog-content mt-2"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>
          <a
            href={blog.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 mt-2 inline-block"
          >
            Read more...
          </a>
        </>
      )}
    </div>
  );
};

export default MediumBlog;
