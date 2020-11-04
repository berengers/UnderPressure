import { useState, useEffect } from 'react'
import axios from 'axios'

interface ParamsInterface {
  isLoading: boolean
  isError: boolean
}

const baseUrl = 'http://localhost:4000/api/'

export function useGetAPI<T>(
  url: string,
  initialState: any = null,
  cancelQuery = false
): [T, ParamsInterface] {
  const [data, setData] = useState<any>(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)

      try {
        const result = await axios(baseUrl + url, {
          headers: { 'x-authenticate': localStorage.getItem('token') }
        })

        setData(result.data || null)
      } catch (error) {
        setIsError(true)
      }

      setIsLoading(false)
    }

    if (!cancelQuery) {
      fetchData()
    }
  }, [])

  return [data, { isLoading, isError }]
}

export function usePostAPI<T>(
  url: string,
  initialState: any = null
): [any, T, ParamsInterface] {
  const [data, setData] = useState<any>(initialState)
  const [body, setBody] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)

      try {
        const result = await axios.post(baseUrl + url, body, {
          headers: { 'x-authenticate': localStorage.getItem('token') }
        })

        setData(result.data || null)
      } catch (error) {
        setIsError(true)
      }

      setIsLoading(false)
    }

    if (body) {
      fetchData()
    }
  }, [body])

  return [setBody, data, { isLoading, isError }]
}

export function usePutAPI<T>(
  url: string,
  initialState: any = null
): [any, T, ParamsInterface] {
  const [data, setData] = useState<any>(initialState)
  const [body, setBody] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)

      try {
        const result = await axios.put(baseUrl + url, body, {
          headers: { 'x-authenticate': localStorage.getItem('token') }
        })

        setData(result.data || null)
      } catch (error) {
        setIsError(true)
      }

      setIsLoading(false)
    }

    if (body) {
      fetchData()
    }
  }, [body])

  return [setBody, data, { isLoading, isError }]
}
