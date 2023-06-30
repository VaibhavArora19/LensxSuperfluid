import Image from "next/image";
import { Inter } from "next/font/google";
import { getPublications } from "@/components/lens/utils";
const inter = Inter({ subsets: ["latin"] });
import Posts from "@/components/UI/Posts";
import { useEffect, useState } from "react";
export default function Home() {
  const [publication, setPublication] = useState([]);

  const getPublication = async () => {
    const publications = await getPublications();
    setPublication(publications as any);
  };

  useEffect(() => {
    getPublication();
  }, []);

  return (
    <div className="flex flex-col mx-24 mt-5">
      <h3 className="font-semibold text-[22px] mb-6 mt-2">
        Streamoor's Feed 🌊
      </h3>
      {publication && <Posts publication={publication} />}
    </div>
  );
}
