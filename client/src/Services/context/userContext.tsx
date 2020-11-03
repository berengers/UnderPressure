import React, { useState } from 'react'

interface UserContextInterface {
  isLogged: boolean
  userId: number
  username: string
  name: string
  profilePicture?: string
  setUserContext: (
    isLogged: boolean,
    userId?: number,
    username?: string,
    name?: string,
    profilePicture?: string
  ) => void
}

export const CreateUserContext = (): UserContextInterface => {
  const tokenExist = Boolean(localStorage.getItem('token'))
  const contextLocal = JSON.parse(localStorage.getItem('userContext') as string)
  const [isLogged, setIsLogged] = useState(tokenExist)
  const [userId, setUserId] = useState(
    contextLocal ? contextLocal.userId : null
  )
  const [username, setUsername] = useState(
    contextLocal ? contextLocal.username : ''
  )
  const [name, setName] = useState(contextLocal ? contextLocal.name : '')
  const [profilePicture, setProfilePicture] = useState(
    contextLocal ? contextLocal.profilePicture : ''
  )

  const setUserContext = (
    isLogged: boolean,
    userId?: number,
    username?: string,
    name?: string,
    profilePicture?: string
  ) => {
    setIsLogged(isLogged)

    if (isLogged) {
      if (userId) setUserId(userId)
      if (username) setUsername(username)
      if (name) setName(name)
      if (profilePicture) setProfilePicture(profilePicture)

      localStorage.setItem(
        'userContext',
        JSON.stringify({ isLogged, userId, username, name, profilePicture })
      )
    } else {
      setUserId(null)
      setUsername('')
      setName('')
      setProfilePicture('')
      localStorage.removeItem('userContext')
    }
  }

  return {
    isLogged,
    userId,
    username,
    name,
    profilePicture,
    setUserContext
  }
}

export const UserContext = React.createContext({} as UserContextInterface)
