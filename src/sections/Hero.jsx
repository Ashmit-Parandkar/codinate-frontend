import React from 'react';
import { arrowRight } from '../assets/icons';
import Button from '../components/Button';

const Hero = ({setshowModal}) => {
  return (
    <section id='home' className='w-full flex justify-evenly items-center m-auto h-[600px]'>
    <div className='flex flex-col gap-9 justify-center items-center'>
    <Button label="Create Room" setshowModal={setshowModal} ></Button>
    <Button label="Join Room" setshowModal={setshowModal}></Button>
    <Button label="View the projects" iconURL={arrowRight} ></Button>

    
    </div>
    <div className='text-white flex flex-col justify-center items-center'>
      <h1 className=' text-8xl'>Code <span className='text-cyan-300'>together</span></h1>
     <p className='mt-7 w-[700px] text-slate-300 text-lg text-center'>Now, you no longer have to share your screen with fellow coders or rely on Zoom. Instead, use <span className='text-cyan-300 font-bold text-xl'>Codinate</span>, a platform where coders collaborate, communicate effortlessly through text or voice chat and build projects together in the same code editor.</p>
    </div>

   
    </section>
  )
}

export default Hero
