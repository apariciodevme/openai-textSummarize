import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <header className="flex flex-col items-center justify-center w-full">
      <nav className="flex items-center justify-between w-full mb-10">
        <h1 className="text-2xl font-extrabold tracking-tighter">OpenAI Summarizer</h1>
        <button className="px-6 py-1 text-sm font-semibold bg-neutral-900 text-neutral-100 rounded-3xl">
        <Link href='https://github.com/apariciodevme/openai-textSummarize'>Gitub</Link>
        </button>
      </nav>

      <h1 className="head_text">
        Summarize articles with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        {" "}
        Simplify your reading with Sumis, an open-source article summarizer that
        transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  );
};

export default Hero;
