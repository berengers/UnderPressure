import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

interface ParamsInterface {
  isLoading: boolean
  error: string
}

const baseUrl = 'http://localhost:4000/api/'

export function useGetAPI<T>(
  url: string,
  initialState: any = null,
  cancelQuery = false
): [T, ParamsInterface] {
  const [data, setData] = useState<any>(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setError('')
      setIsLoading(true)

      try {
        const result = await axios(baseUrl + url, {
          headers: { 'x-authenticate': localStorage.getItem('token') }
        })

        setData(result.data || null)
      } catch (error) {
        setError(error.message)
      }

      setIsLoading(false)
    }

    if (!cancelQuery) {
      fetchData()
    }
  }, [])

  return [data, { isLoading, error }]
}

export function usePostAPI<T>(
  url: string,
  initialState: any = null,
  redirect?: string
): [any, T, ParamsInterface] {
  const [data, setData] = useState<any>(initialState)
  const [body, setBody] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      setError('')
      setIsLoading(true)

      try {
        const result = await axios.post(baseUrl + url, body, {
          headers: { 'x-authenticate': localStorage.getItem('token') }
        })

        setData(() => result.data || null)
      } catch (error) {
        setError(error.message)
      }

      setIsLoading(false)

      if (redirect) {
        history.push(redirect)
      }
    }

    if (body) {
      fetchData()
    }
  }, [body])

  return [setBody, data, { isLoading, error }]
}

export function useDeleteAPI<T>(
  initialState: any = null
): [any, T, ParamsInterface] {
  const [url, setUrl] = useState('')
  const [data, setData] = useState<any>(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setError('')
      setIsLoading(true)

      try {
        const result = await axios.delete(baseUrl + url, {
          headers: { 'x-authenticate': localStorage.getItem('token') }
        })

        setData(result.data || null)
      } catch (error) {
        setError(error.message)
      }

      setIsLoading(false)
    }

    if (url) {
      fetchData()
    }
  }, [])

  return [setUrl, data, { isLoading, error }]
}

export function usePutAPI<T>(
  url: string,
  initialState: any = null,
  redirect?: string
): [any, T, ParamsInterface] {
  const [data, setData] = useState<any>(initialState)
  const [body, setBody] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      setError('')
      setIsLoading(true)

      try {
        const result = await axios.put(baseUrl + url, body, {
          headers: { 'x-authenticate': localStorage.getItem('token') }
        })

        setData(result.data || null)
      } catch (error) {
        setError(error.message)
      }

      setIsLoading(false)

      if (redirect) {
        history.push(redirect)
      }
    }

    if (body) {
      fetchData()
    }
  }, [body])

  return [setBody, data, { isLoading, error }]
}
