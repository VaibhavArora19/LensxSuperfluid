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
    <div className="flex flex-col mx-20 mt-5">
      {publication && <Posts publication={publication} />}
    </div>
  );
}
