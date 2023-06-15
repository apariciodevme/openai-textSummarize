"use client";
import Image from "next/image";

import { useState, useEffect } from "react";
import { BoltIcon } from "@heroicons/react/24/outline";

import { copy, link, loader, tick } from "../public";

const Demo = () => {
  const [article, setarticle] = useState({
    url: "",
    summary: "",
  });

  const handleSubmit = async (e) => {
    
  }

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
            onChange={(e) => setarticle({
              ...article, url: e.target.value
            })}
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
      </div>

      {/*Display Results*/}
    </section>
  );
};

export default Demo;
