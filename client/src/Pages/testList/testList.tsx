import React from 'react'

import './testList.scss'
import { useGetAPI } from 'Services/hook/api'
import TestElement from 'Modules/testElement/testElement'
import Loader from 'Lib/loader/loader'

export interface TestInterface {
  id: number
  name: string
  questions?: Array<QuestionInterface>
}

export interface QuestionInterface {
  id: number
  testId: number
  asserts: string
  code?: string
  instructions?: string
  name: string
  order: number
}

export default function TestList() {
  const [tests, { isLoading }] = useGetAPI<Array<TestInterface>>('test', [])

  if (isLoading) return <Loader size="76" />

  return (
    <div className="TestList">
      <div className="TestList-container">
        {tests.map(test => (
          <div className="TestList-testElementContainer" key={test.id}>
            <TestElement test={test} />
          </div>
        ))}
      </div>
    </div>
  )
}
