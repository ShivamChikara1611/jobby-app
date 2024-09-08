import React from 'react'
import Header from './Header'

const notFoundImage =
  'https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png'

const NotFound = () => (
  <>
    <Header />
    <div className="h-[75vh] flex flex-col justify-center ">
      <div className='flex justify-center'>
        <img className="not-found-image" src={notFoundImage} alt="not found" />
      </div>
      <h1 className="text-red-600 text-2xl font-semibold text-center mt-4 mb-2">Page Not Found</h1>
      <p className="text-xs text-center">
        we’re sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
