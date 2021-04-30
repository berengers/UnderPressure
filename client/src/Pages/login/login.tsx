import React, { FormEvent, useContext, useEffect, useState } from 'react'

import './login.scss'
import { usePostAPI } from 'Services/hook/api'
import { UserContext } from 'Services/context/userContext'

interface UserInterface {
  id: number
  email: string
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'email') {
      setEmail(event.target.value)
    } else {
      setPassword(event.target.value)
    }
  }

  const { setUserContext } = useContext(UserContext)
  const [login, data] = usePostAPI<{ token: string; user: UserInterface }>(
    'login'
  )
  const submit = (event: FormEvent<HTMLFormElement>) => {
    login({ email, password })
    event.preventDefault()
  }
  useEffect(() => {
    if (data) {
      localStorage.setItem('token', data.token)
      setUserContext(true, data.user.id, data.user.email)
    }
  }, [data])

  return (
    <div className="Login">
      <form onSubmit={submit}>
        <h2>Under Pressure</h2>
        <input
          name="email"
          onChange={handleChange}
          placeholder="email"
          type="email"
          value={email}
          data-e2e="input-email"
        />
        <br />
        <input
          name="password"
          onChange={handleChange}
          placeholder="password"
          type="password"
          value={password}
          data-e2e="input-password"
        />
        <button type="submit" data-e2e="button-login">
          Login
        </button>
      </form>
    </div>
  )
}
