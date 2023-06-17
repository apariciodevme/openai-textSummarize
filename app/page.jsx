import Image from "next/image";
import { Hero, Demo } from "./components";



export default function Home() {
  return (
    <main className="min-h-screen p-4 ">
      <div className="main ">
        <div className="gradient" />
      </div>
      <div className="app">
        <Hero />
        <Demo />
      </div>
    </main>
  );
}
