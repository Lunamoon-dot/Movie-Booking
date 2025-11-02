import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="px-6 pt-8 md:px-16 lg:px-36 w-full mt-60 text-gray-300">
          <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-10">
              <div className="md:max-w-100">
                 <Link to="/" className='max-md:flex-1 flex items-end gap-2'>
                    <img src='/image.png' alt=""  className='w-10 h-auto'/>
                    <div className='flex flex-col items-end justify-end h-full'>
                        <p className='text-2xl font-medium'> <span className='text-3xl font-bold' style={{ backgroundImage: 'linear-gradient(to right, var(--color-primary), var(--color-second))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', display: 'inline-block' }}>Owl</span>Cinema</p>
                    </div>
               </Link>
                  <p className="mt-6 text-sm">
                    OwlCinema is a group project developed by second-year students from the University of Transport and Communications. This website focuses on the process of booking movie tickets. Not only that, admins can also add new shows, manage revenue, and track various related activities within the system.
                  </p>
              </div>
              <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
                  <div>
                      <h2 className="font-semibold mb-5">Company</h2>
                      <ul className="text-sm space-y-2">
                         
                        <li><a href="#">About us</a></li>
                        <li><a href="#">References</a></li>
                        <li><a href="#">Contact us</a></li>
                        <li><a href="#">Privacy policy</a></li>
                      </ul>
                  </div>
                  <div>
                      <h2 className="font-semibold mb-5">Get in touch</h2>
                      <div className="text-sm space-y-2">
                          <p>+3636363636</p>
                          <p>OwlCinema@gmail.com</p>
                      </div>
                  </div>
              </div>
          </div>
          <p className="pt-4 text-center text-sm pb-5">
              Copyright {new Date().getFullYear()} © <a href="https://prebuiltui.com">OwlCinema</a>. All Right Reserved.
          </p>
      </footer>
  )
}

export default Footer
