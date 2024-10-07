'use client'

import { useEffect, useState } from 'react'
import { signOut } from "next-auth/react";
import { Session } from 'next-auth';


const texts = [
  { language: 'English', text: 'Coming Soon' },
  { language: 'Español', text: 'Próximamente' },
  { language: '中文', text: '即将推出' },
  { language: 'Français', text: 'Bientôt Disponible' }
]

interface ComingSoonProps {
    session: Session | null; // Si tienes tipos específicos, puedes reemplazar 'any' con el tipo de sesión adecuado
  }

export default function ComingSoon({ session }: ComingSoonProps) {
  const [gradientPosition, setGradientPosition] = useState(0)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const gradientInterval = setInterval(() => {
      setGradientPosition((prevPosition) => (prevPosition + 1) % 100)
    }, 50)

    let charIndex = 0
    let pauseCounter = 0
    const animationInterval = setInterval(() => {
      const currentFullText = texts[currentTextIndex].text

      if (isPaused) {
        pauseCounter++
        if (pauseCounter > 20) { // 20 * 200ms = 4 seconds pause
          setIsPaused(false)
          setIsTyping(false)
          pauseCounter = 0
        }
      } else if (isTyping) {
        setDisplayText(currentFullText.slice(0, charIndex))
        charIndex++
        if (charIndex > currentFullText.length) {
          setIsPaused(true)
        }
      } else {
        setDisplayText(currentFullText.slice(0, charIndex))
        charIndex--
        if (charIndex < 0) {
          setIsTyping(true)
          charIndex = 0
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
        }
      }
    }, 100)

    return () => {
      clearInterval(gradientInterval)
      clearInterval(animationInterval)
    }
  }, [currentTextIndex, isTyping, isPaused])

  return (
    <>
      <style jsx>{`
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }

        @keyframes blink-animation {
          to {
            visibility: hidden;
          }
        }

        @keyframes buttonGlow {
          0% {
            box-shadow: 0 0 2px #FFFFFF;
          }
          50% {
            box-shadow: 0 0 5px #FFFFFF, 0 0 8px #FFFFFF;
          }
          100% {
            box-shadow: 0 0 2px #FFFFFF;
          }
        }

        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: black;
          padding: 1rem;
        }

        .coming-soon {
          font-size: clamp(2rem, 8vw, 4rem);
          font-weight: bold;
          background-image: linear-gradient(
            90deg,
            #90D5FB,
            #7576FF,
            #BF62FD,
            #DE58D1,
            #EF7EB0,
            #FA6661,
            #FD713B,
            #FE9712,
            #90D5FB,
            #7576FF,
            #BF62FD
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          animation: gradientAnimation 15s linear infinite;
          margin-bottom: 2rem;
          white-space: nowrap;
          text-align: center;
          width: 100%;
        }

        .cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background-color: #F2F2F2;
          margin-left: 2px;
          vertical-align: text-bottom;
        }

        .blink {
          animation: blink-animation 0.7s steps(2, start) infinite;
        }

        .language {
          position: absolute;
          top: 20px;
          left: 20px;
          color: #F2F2F2;
          font-size: 1rem;
        }

        .info-button {
          padding: 12px 24px;
          font-size: 1rem;
          color: white;
          background-color: transparent;
          border: 2px solid white;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 2rem;
          position: relative;
          overflow: hidden;
          animation: buttonGlow 2s ease-in-out infinite;
        }

        .info-button:hover {
          background-color: white;
          color: black;
          animation: none;
          box-shadow: 0 0 15px #FFFFFF, 0 0 25px #FFFFFF;
        }

        @media (max-width: 768px) {
          .language {
            top: 10px;
            left: 10px;
            font-size: 0.875rem;
          }

          .info-button {
            padding: 10px 20px;
            font-size: 0.875rem;
          }
        }
      `}</style>
      <div className="container">
        <div className="language">{texts[currentTextIndex].language}</div>
        <h1 className="coming-soon" style={{ backgroundPosition: `${gradientPosition}% 50%` }}>
          {displayText}
          <span className={`cursor ${isPaused ? 'blink' : ''}`}></span>
        </h1>
        {!!session && <button onClick={() =>{
            signOut();
        }} className="info-button">
          LogOut
        </button>}
        {!session &&  <button className="info-button">
          info@creto.com
        </button>}
      </div>
    </>
  )
}


