import React from 'react'
import Link from "next/link";

const Footer = () => {
  return (

    <footer className='h-32 absolute bg-dark w-full'>
      <div className=''>
        {/* container icons */}
        <div className='flex w-full'>
          <div className='w-3/5 flex justify-start  mt-4'>
            <Link href={'/'} className='ml-4 mr-4 md:mr-10'>
                <img src="https://cdn1.iconfinder.com/data/icons/unicons-line-vol-4/24/home-256.png" className='w-9 sm:w-8 ' alt="home" title='Home'/>
            </Link>

            <Link href={'/videojuegos'} className='mr-4 md:mr-10'>
                <img src="https://cdn2.iconfinder.com/data/icons/round-set-vol-2/120/gamepad-256.png" alt="videojuegos" className='w-9 sm:w-8' title='Videojuegos'/>
            </Link>

            <Link href={'/seriesypeliculas'} className='mr-4 md:mr-10'>
                <img src="https://cdn1.iconfinder.com/data/icons/lifestyle-entertainment-vol-3/512/tv_television_show_series-256.png" className='w-9 sm:w-8 ' alt="Series y Peliculas" title='Series y Peliculas'/>
            </Link>

            <Link href={'/tecnologia'} className='mr-4 md:mr-10'>
                <img src="https://cdn4.iconfinder.com/data/icons/artificial-intelligence-line-filled/123/Cloud_Intelligence__Circuit__cloud__computing__tecnology-256.png" className='w-9 sm:w-8 ' alt="Tecnologia" title='Tecnologia'/>
            </Link>
          </div>
          <div className='w-2/5 flex justify-end  mt-4'>
            <Link href={'https://github.com/Jaal97'} target='__blank' className='mr-4 md:mr-10'>
              <img src="https://cdn3.iconfinder.com/data/icons/social-media-2068/64/_github-256.png" className='w-9 sm:w-8 ' alt="github" />
            </Link>
            <Link href={'https://mail.google.com/mail/u/1/#inbox?compose=CllgCJvkXQBgrtClcwbvzdJslWPdCtcmHWfRxkJvVDLGsTDgfTvgfhwXkjZmhwWWFHgSwhWrgdB'} target='__blank' className='mr-4 md:mr-10'>
              <img src="https://cdn4.iconfinder.com/data/icons/free-colorful-icons/128/gmail.png" className='w-9 sm:w-8' alt="gmail" />
            </Link>
            <Link href={'https://jaaltechnology.shop/'} target='__blank' className='mr-4 md:mr-10'>
              <img src="https://cdn3.iconfinder.com/data/icons/social-media-circle-long-shadow/1024/longShadow-256.png" className='w-9 sm:w-8' alt="www" />
            </Link>

          </div>
         

        </div>
        <hr className=' text-white mt-6'/>
        <div className='flex justify-center text-white mt-3  '>
       
          <p className=' text-center text-sm sm:text-md'>© 2024 JAAL97. All Rights Reserved.</p>
        </div>
      </div>

    </footer>

  )
}

export default Footer