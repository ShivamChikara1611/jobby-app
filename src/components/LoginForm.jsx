import React from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

const websiteLogoInForm = 'https://assets.ccbp.in/frontend/react-js/logo-img.png'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()

  const onSubmitSuccess = jwtToken => {
    // Save JWT token in cookies with expiration
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    // Redirect to the home page after successful login
    navigate('/')
  }

  const onSubmitFailure = errorMsg => {
    setShowSubmitError(true)
    setErrorMsg(errorMsg)
  }

  const onSubmitLoginForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  // Check if the user is already logged in by checking the presence of JWT token
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Navigate to="/" />
  }

  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <form className="border border-2 rounded-lg p-8" onSubmit={onSubmitLoginForm}>
        <div className='flex justify-center mb-8'>
          <img className='' src={websiteLogoInForm} alt="website logo" />
        </div>
        <label className="text-lg" htmlFor="username">
          Username
        </label>
        <br />
        <input
          className="bg-transparent border outline-none p-1 mt-2 px-2 rounded-md"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter here"
          id="username"
        />
        <br />
        <br />
        <label className="text-lg" htmlFor="password">
          Password
        </label>
        <br />
        <input
          className="bg-transparent border outline-none p-1 mt-2 px-2 rounded-md"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="password"
          id="password"
        />
        <br />
        <br />
        <button className="bg-blue-800 py-1 rounded-md w-full mt-5" type="submit">
          Login
        </button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  )
}

export default LoginForm
