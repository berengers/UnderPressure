import React, { useState } from 'react'

interface UserContextInterface {
  isLogged: boolean
  userId: number
  email: string
  setUserContext: (isLogged: boolean, userId?: number, email?: string) => void
}

export const CreateUserContext = (): UserContextInterface => {
  const tokenExist = Boolean(localStorage.getItem('token'))
  const contextLocal = JSON.parse(localStorage.getItem('userContext') as string)
  const [isLogged, setIsLogged] = useState(tokenExist)
  const [userId, setUserId] = useState(
    contextLocal ? contextLocal.userId : null
  )
  const [email, setEmail] = useState(contextLocal ? contextLocal.email : '')

  const setUserContext = (
    isLogged: boolean,
    userId?: number,
    email?: string
  ) => {
    setIsLogged(isLogged)

    if (isLogged) {
      if (userId) setUserId(userId)
      if (email) setEmail(email)

      localStorage.setItem(
        'userContext',
        JSON.stringify({ isLogged, userId, email })
      )
    } else {
      setUserId(null)
      setEmail('')
      localStorage.removeItem('userContext')
    }
  }

  return {
    isLogged,
    userId,
    email,
    setUserContext
  }
}

export const UserContext = React.createContext({} as UserContextInterface)
