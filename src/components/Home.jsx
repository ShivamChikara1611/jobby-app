// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Header from './Header'

const Home = () => {
  const navigate = useNavigate()

  const onRedirectToJobs = () => {
    navigate('/jobs')
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <h1 className="home-heading">
          Find The Job That <br />
          Fits Your Life
        </h1>
        <p className="home-paragraph">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <button
          className="home-jobs-button"
          type="button"
          onClick={onRedirectToJobs}
        >
          Find Jobs
        </button>
      </div>
    </>
  )
}

export default Home
