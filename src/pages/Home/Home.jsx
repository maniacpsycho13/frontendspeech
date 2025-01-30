import React, { useEffect, useState } from 'react'
import Navbar from '../../components/common/Header/Navbar'
import Goku from '../../components/common/Goku'
import { GroupImage, level1Image } from '../../assets/common'
import { Link } from 'react-router-dom'
import FirstAppear from "../../components/common/FirstAppear"

const Home = () => {

  const [firstTime, setFirstTime] = useState(false);

  useEffect(() => {
    const flag = localStorage.getItem("flag");

    if (!flag) {
      setFirstTime(true);
      localStorage.setItem("flag", "done");
    }
  }, []);


  return (
    <div className='w-full bg-[#F4F4F4] overflow-y-auto overflow-hidden'>
        <div className='absolute z-[100] overflow-hidden'>
          {firstTime && <FirstAppear />}
        </div>
  
        <div className='flex w-full mt-20 px-12 pt-16'>
            <div className='w-[60%] flex justify-center mt-10  items-center h-[30%]'>
                <Goku/>
            </div>
            <div className=' w-[40%] relative mt-24'>
                <div className='bg-[#5B9CF9] rotate-12  absolute z-[10] w-[70%] h-[90%] top-[0.8rem]   rounded-xl'>
                </div>
                <div className='bg-white text-base text-black z-[20] absolute w-[70%] h-[90%] border-4 border-[#5B9CF9] rounded-xl p-10 top-4'>
                    <p className='text-center font-semibold text-3xl font-gilroy'>Hello <span className='text-[#5B9CF9] font-bold text-5xl'>Goku</span> Here</p>
                    <div className='mt-6 text-2xl font-medium font-gilroy'>
                        Welcome to our magical learning adventure! I’m Goku, and I’m so excited to help you discover new things.
                        So get ready to use your imagination and dive into a world where learning is an adventure.
                        Let’s start this amazing journey together and see all the cool things you can do!
                    </div>
                </div>
                
            </div>
      </div>


      <div className='px-56 w-[100%] mt-52 font-gilroy'>
                <p className='text-3xl font-bold text-[#5B9CF9] mb-2 '>DIVE INTO THE JOY OF LEARNING</p>
                <div>
                    <p className='text-7xl font-semibold'>Discover the Magic of</p>
                    <p className='text-7xl font-semibold text-[#5B9CF9] ' >Learning</p>
                    <p className='text-7xl font-semibold'>And Watch Your</p>
                    <p className='text-7xl font-semibold underline'> Imagination Soar!</p>
                    <p className='text-lg mt-2'>Explore, Play, and Learn Where every day is a new adventure!</p>
                </div>
      </div>
    
    <div className='px-12 mt-40 font-gilroy'>
        <p className='text-2xl  font-semibold text-center'>CLICK ON THE LEVEL TO PLAY</p>
        <div className='flex-col'>
            <div className='flex gap-6  justify-center items-center'>
                <div className='w-[30%] min-h-[20rem] relative flex items-center justify-center'>
                    <div className='bg-[#5B9CF9]  absolute z-20 w-[55%] h-[100%] top-2 rounded-full shadow-lg'>
                    </div> 
                    <div className="text-center text-black border-4 border-[#5B9CF9] bg-white font-bold absolute w-[45%] h-[75%] z-30 ml-20 mb-12 shadow-lg rounded-xl text-[2.5rem] p-6">
                        <p className='absolute text-7xl rotate-12 '>A</p>
                        <p className='absolute text-7xl rotate-12 ml-20 mt-4'>B</p>
                        <p className='absolute text-7xl rotate-12 ml-40 '>C</p>
                        <p className='absolute text-7xl rotate-12 ml-12 mt-24'>D</p>
                        <p className='absolute text-7xl rotate-12 ml-32 mt-24'>E</p>
                    </div>
                </div>
                <div className='flex flex-col items-center w-[20%] mt-8'>
                    <div className='rounded-full w-6 h-6 border-2 border-black bg-[#5B9CF9]' >
                    </div>
                    <div className='h-[28rem]  bg-black w-2  '>
                    </div>
                </div>

                <div className='bg-white text-base p-6 rounded-xl border-4 border-[#5B9CF9] w-[30%]'>
                    <p className='text-[#5B9CF9] font-bold text-3xl' >LEVEL 01</p>
                    <p className='mt-4 font-semibold text-2xl '>The Power of Phonemes :</p>
                    <p className='text-xl mb-10  mt-2 font-medium text-justify'>Start your adventure by learning how to pronounce basic sounds, called phonemes! Get ready for fun challenges that help you build the foundations of language, setting you up for success as you progress through the game.</p>
                    <div className='flex justify-end'>
                        <Link to={'/level1'} className='bg-[#5B9CF9] text-white p-4 mb-2 rounded-xl font-bold text-xl'>PLAY NOW</Link>
                    </div>
                </div>
            </div>

            <div className='flex gap-6  justify-center items-center'>
                <div className='bg-white text-base p-6 border-4 border-[#5B9CF9] rounded-xl w-[30%]'>
                    <div  className='text-[#5B9CF9] font-bold text-3xl' >LEVEL 02</div>
                    <p className='mt-4 font-semibold text-2xl '>Play With Words :</p>
                    <p className='text-xl  mt-2 font-medium text-justify'>Take your pronunciation skills to the next level by exploring full words! Practice saying complete words, understanding how sounds combine to form them.</p>
                    <div className='flex justify-end'>
                        <Link to={'/level2'} className='bg-[#5B9CF9] text-white p-4 mb-2 rounded-xl font-bold text-xl'>PLAY NOW</Link>
                    </div>
                </div>
                <div className='flex flex-col items-center w-[20%]'>
                    <div className='rounded-full w-6 h-6 border-2 border-black bg-[#5B9CF9]' >
                    </div>
                    <div className='h-[28rem]  bg-black w-2  '>
                    </div>
                </div>
                <div className='w-[30%] min-h-[20rem] relative flex items-center justify-center'>
                    <div className='bg-[#5B9CF9]  absolute z-20 w-[55%] h-[70%] top-4 rounded-xl shadow-lg'>
                    </div> 
                    <div className="text-center text-black border-4 border-[#5B9CF9] bg-white font-bold absolute w-[55%] h-[70%] z-30 ml-20 mb-32 shadow-lg rounded-xl text-[2.5rem] p-4">HELLO HERE YOU LEARN WORDS</div>
                </div>
            </div>

            <div className='flex gap-6  justify-center items-center'>
                <div className='w-[30%] min-h-[20rem] relative flex items-center justify-center'>
                    <div className='bg-[#5B9CF9]  absolute z-20 w-[55%] h-[100%] top-4 rounded-full shadow-lg'>
                    </div> 
                    <div className="text-center uppercase text-black border-4 border-[#5B9CF9] bg-white font-bold absolute w-[50%] h-[78%] z-30 ml-20 mb-12 shadow-lg rounded-xl text-[2.1rem] p-6 ">
                        Play With Some More Tough Words
                    </div>
                </div>
                <div className='flex flex-col items-center w-[20%] '>
                    <div className='rounded-full w-6 h-6 border-2 border-black bg-[#5B9CF9]' >
                    </div>
                    <div className='h-[28rem]  bg-black w-2  '>
                    </div>
                </div>

                <div className='bg-white text-base border-4 border-[#5B9CF9] p-6 rounded-xl w-[30%]'>
                    <div className='text-[#5B9CF9] font-bold text-3xl' >LEVEL 03</div>
                    <p className='mt-4 font-semibold text-2xl '>The Power of Phonemes :</p>
                    <p className='text-xl  mt-2 font-medium text-justify'>Start your adventure by learning how to pronounce basic sounds, called phonemes! Get ready for fun challenges that help you build the foundations of language, setting you up for success as you progress through the game.</p>
                    <div className='flex justify-end'>
                        <Link to={'/level3'} className='bg-[#5B9CF9] text-white p-4 mb-2 rounded-xl font-bold text-xl'>PLAY NOW</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>
  )
}

export default Home