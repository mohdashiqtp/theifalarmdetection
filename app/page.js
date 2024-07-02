import Obj from "@/components/object-detention";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-scr flex-col items-center p-8">
      <h1 className="gradient-title font-extrabold text-3xl md:text-6xl lg:text-8xl tracking-tighter md:px-6 text-center"
      >Theif Detetection Alarm</h1>
      <Obj />
    </main>
  );
}
