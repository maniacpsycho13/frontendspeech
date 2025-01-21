import React, { useState, useEffect } from "react";
import Goku from "./Goku";
import NewGoku from "./NewGoku";


const FirstAppear = () => {
  const [text, setText] = useState("");
  const [showContent, setShowContent] = useState(true);
  const fullText = `I’m Goku, and I’m so excited to help you discover new things. 
    So get ready to use your imagination and dive into a world where learning is an adventure. 
    Let’s start this amazing journey together and see all the cool things you can do!`;

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          // Hide Goku and text box after 2 seconds
          setShowContent(false);
        }, 2000);
      }
    }, 50);


    return () => clearInterval(typingInterval);
  }, []);
  
  return (
    <div
      className={`relative w-screen h-screen  bg-cover bg-center bg-black ${
        showContent
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-20"
      }`}
      style={{
        backgroundImage: "url('https://source.unsplash.com/1600x900/?nature,learning')",
      }}
    >
     
      <div className="absolute inset-0 bg-black/40 "></div>

  
      <div className="relative flex justify-center items-center h-screen gap-20">

        <div
          className={`w-[30%] flex justify-end transition-all duration-1000 ease-in-out transform ${
            showContent
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-20"
          }`}
        >
          <NewGoku />
        </div>

 
        <div
          className={`w-[35%] bg-white/90 p-6 rounded-xl shadow-lg border-2 border-gray-200 transform transition-all duration-1000 ease-in-out ${
            showContent
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-20"
          }`}
        >
          <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center font-mono">
            Welcome to Our Magical Learning Adventure!
          </h1>
          <p className="text-base text-gray-700 leading-relaxed text-justify font-mono font-medium">
            {text}
            <span className="animate-pulse">|</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FirstAppear;
