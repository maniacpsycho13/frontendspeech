import React from 'react'
import NewGoku from '../components/common/NewGoku'
import { Link } from 'react-router-dom'

const Test = () => {
  return (
    <div className='h-screen font-gilroy w-screen flex justify-center items-center'>
      <div className='border-4 rounded-xl bg-[#5B9CF9]  p-8 h-[700px]   max-w-[900px] '>
      <div className='text-5xl font-gilroy font-bold text-left text-white'>LEVEL 1</div>
        <div className='flex flex-col   gap-8 items-center'>
        
          <div className=' left-[30%]'>
            <NewGoku />
          </div>
          <div className=' pb-3 p-6 rounded-xl  flex-1  '>
            <div className='flex flex-col  justify-center items-center text-lg font-sans text-gray-800'>
              <p className='text-xl font-gilroy font-medium text-white mb-6 '>
                "Hello Gigglio&apos;s! Let’s hop into the first level, where we’ll play with words and have a fun, magical adventure together!"
              </p>

              <div className='flex gap-6 font-gilroy items-center mt-4'>
                <Link to='/assignment' className='px-10 py-6 bg-blue-500 rounded-lg font-semibold text-white hover:bg-blue-600 transition ease-in-out duration-300'>
                  Assignment
                </Link>
                <Link to={'/level1'} className='px-10 py-6 bg-teal-500 rounded-lg font-semibold text-white hover:bg-teal-600 transition ease-in-out duration-300'>
                  Practice
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Test
