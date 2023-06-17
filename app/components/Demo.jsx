"use client";
import Image from "next/image";
import { useLazyGetSummaryQuery } from "../ReduxGlobal/article";

import { useState, useEffect } from "react";
import { BoltIcon } from "@heroicons/react/24/outline";

import { copy, link, loader, tick } from "../../public";

const Demo = () => {
  const [article, setarticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);

  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updateddArticles = [newArticle, ...allArticles];

      setarticle(newArticle);
      setAllArticles(updateddArticles);

      localStorage.setItem("articles", JSON.stringify(updateddArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="w-full max-w-xl mt-16">
      <div className="flex flex-col w-full gap-2">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center justify-center"
        >
          <Image
            src={"/link.svg"}
            width={20}
            height={20}
            alt=" link_icon"
            className="absolute left-0 my-2 ml-3"
          />

          <input
            type="url"
            placeholder="enter url"
            value={article.url}
            onChange={(e) =>
              setarticle({
                ...article,
                url: e.target.value,
              })
            }
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-700"
          >
            <BoltIcon className="w-6 text-neutral-400" />
          </button>
        </form>

        {/*Browse URL history*/}
        <div className="flex flex-col gap-1 overflow-y-auto max-h-60">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setarticle(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <Image
                  src={copied === item.url ? tick : copy}
                  width={20}
                  height={20}
                  alt="copy_icon"
                  className="contain"
                />
              </div>
              <p className="flex-1 text-sm font-medium text-blue-500 truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Result */}
      <div className="flex items-center justify-center max-w-full my-10">
        {isFetching ? (
          <img src={loader} alt="loader" className="object-contain w-20 h-20" />
        ) : error ? (
          <p className="font-bold text-center text-black font-inter">
            Well, that wasn't supposed to happen...
            <br />
            <span className="font-normal text-gray-700 font-satoshi">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-bold text-gray-600 font-satoshi">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="text-sm font-medium text-gray-700 font-inter">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
