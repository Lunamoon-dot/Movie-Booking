import React from 'react'
import { Calendar, Bell, Film, Sparkles } from 'lucide-react'

function ComingSoon() {
  return (
    <div className='min-h-screen bg-linear-to-br from-bg-gradient-from via-bg-gradient-via to-bg-gradient-to pt-30 pb-20 px-6 flex items-center justify-center'>
      <div className='max-w-4xl mx-auto text-center'>
        {/* Animated Icon */}
        <div className='relative mb-10'>
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='w-40 h-40 bg-primary/20 rounded-full animate-pulse' />
          </div>
          <div className='relative flex items-center justify-center'>
            <div className='w-32 h-32 bg-primary rounded-full flex items-center justify-center'>
              <Film className='w-16 h-16 text-white' />
            </div>
          </div>
          {/* Floating Sparkles */}
          <Sparkles className='absolute top-0 right-10 w-8 h-8 text-primary animate-bounce' />
          <Sparkles className='absolute bottom-0 left-10 w-6 h-6 text-primary-dull animate-bounce delay-200' />
        </div>

        {/* Main Heading */}
        <h1 className='text-6xl md:text-7xl font-bold text-white mb-6'>
          <span className='text-primary'>Coming</span> Soon
        </h1>

        {/* Subtitle */}
        <p className='text-2xl md:text-3xl text-gray-300 mb-8'>
          Something Amazing is on the Way
        </p>

        {/* Description */}
        <p className='text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed'>
          We're working hard to bring you an incredible experience. 
          This feature is currently under development and will be available soon. 
          Stay tuned for exciting updates!
        </p>

        {/* Feature Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
          <div className='bg-bg-card p-6 rounded-2xl hover:bg-bg-card-hover transition'>
            <Calendar className='w-12 h-12 text-primary mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-white mb-2'>Schedule Updates</h3>
            <p className='text-gray-400 text-sm'>
              Get notified about release dates
            </p>
          </div>
          
          <div className='bg-bg-card p-6 rounded-2xl hover:bg-bg-card-hover transition'>
            <Bell className='w-12 h-12 text-primary mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-white mb-2'>Early Access</h3>
            <p className='text-gray-400 text-sm'>
              Be the first to know when we launch
            </p>
          </div>
          
          <div className='bg-bg-card p-6 rounded-2xl hover:bg-bg-card-hover transition'>
            <Sparkles className='w-12 h-12 text-primary mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-white mb-2'>Exclusive Features</h3>
            <p className='text-gray-400 text-sm'>
              Amazing features waiting for you
            </p>
          </div>
        </div>

        {/* Email Notification Form */}
        <div className='bg-bg-card p-8 rounded-2xl max-w-xl mx-auto'>
          <h3 className='text-2xl font-bold text-white mb-4'>Stay Updated</h3>
          <p className='text-gray-400 mb-6'>
            Subscribe to get notified when this feature launches
          </p>
          <div className='flex flex-col sm:flex-row gap-3'>
            <input 
              type='email' 
              placeholder='Enter your email'
              className='flex-1 px-4 py-3 rounded-full bg-bg-section text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary transition'
            />
            <button className='px-8 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-dull transition whitespace-nowrap'>
              Notify Me
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className='mt-12'>
          <p className='text-gray-500 text-sm mb-3'>Development Progress</p>
          <div className='w-full max-w-md mx-auto bg-bg-card rounded-full h-3 overflow-hidden'>
            <div className='bg-linear-to-r from-primary to-primary-dull h-full rounded-full animate-pulse' 
                 style={{width: '65%'}} />
          </div>
          <p className='text-primary font-semibold mt-2'>65% Complete</p>
        </div>
      </div>
    </div>
  )
}

export default ComingSoon

