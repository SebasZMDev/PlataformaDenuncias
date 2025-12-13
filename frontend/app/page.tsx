"use client";
import TextType from "../components/ui/TextType";
import BlurText from "../components/ui/BlurText";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };
  const router = useRouter();

  return (
    <main className="bg-gray-850 min-h-screen flex flex-col justify-center items-center text-white px-4">
      <div className="flex space-x-4 mb-8">
        <BlurText
          text="Alerta Peru"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-5xl font-bold"
        />
      </div>

      <TextType
        text={[
          "Envía tus denuncias con geolocalización y seguimiento del caso.",
          "Protege tu identidad mientras contribuyes a la seguridad ciudadana.",
          "Monitorea el estado de tus denuncias y contribuye a la confianza pública.",
        ]}
        typingSpeed={75}
        pauseDuration={1500}
        showCursor={true}
        cursorCharacter="|"
        className="text-2xl text-center max-w-2xl relative overflow-hidden h-32"
      />

      <br />

      <button
        onClick={() => router.push("/dashboard")}
        className="bg-transparent border-2 border-blue-600 text-blue-600 py-3 px-8 rounded-full text-lg font-semibold tracking-wider transition-all duration-300 transform hover:bg-blue-600 hover:text-white hover:scale-105 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        INGRESAR
      </button>
    </main>
  );
}
