"use client";
import Link from "next/link";
import TextType from "../components/ui/TextType";
import BlurText from "../components/ui/BlurText";


export default function HomePage() {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

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
        className="text-2xl text-center max-w-2xl"
      />
      <br />
      <Link
        href="/auth/login"
        className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition"
      >
        Iniciar Sesión
      </Link>
    </main>
  );
}
