import React from 'react'
import NewGoku from '../components/common/NewGoku'
import { Link } from 'react-router-dom'

const Test = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className='bg-white p-8  max-w-[550px] '>
        <div className='flex gap-8 items-center'>
          <div className='absolute left-[30%]'>
            <NewGoku />
          </div>
          <div className='bg-gray-50 p-6 rounded-xl shadow-xl flex-1 pr-8 border-[2px] border-gray-200 pl-48'>
            <div className='flex flex-col items-center text-lg font-sans text-gray-800'>
              <p className='text-xl text-gray-700 mb-6 '>
                "Hello Gigglio&apos;s! Let’s hop into the first level, where we’ll play with words and have a fun, magical adventure together!"
              </p>

              <div className='flex gap-6 items-center mt-4'>
                <Link to='/assignment' className='p-3 bg-blue-500 rounded-lg font-semibold text-white hover:bg-blue-600 transition ease-in-out duration-300'>
                  Assignment
                </Link>
                <Link to={'/level1'} className='p-3 bg-teal-500 rounded-lg font-semibold text-white hover:bg-teal-600 transition ease-in-out duration-300'>
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
