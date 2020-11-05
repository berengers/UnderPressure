import React from 'react'

import './shared.scss'
import { msToMinutes } from 'Services/time'
import { TestInterface } from 'Pages/testList/testList'
import { useGetAPI } from 'Services/hook/api'

interface TestRunInterface {
  test: TestInterface
  uuid: string
  maxTimeToComplete: number
  playerName: string
  startedDate: Date
  timeToComplete: number
}

export default function Shared() {
  const [tests] = useGetAPI<Array<TestRunInterface>>('testRun', [])

  return (
    <div className="Shared">
      {tests.map(test => (
        <div className="Shared-testRun" key={test.uuid}>
          <div>
            <span>Player : {test.playerName}</span>
            <span>Test: {test.test.name}</span>
            <span>Max time : {msToMinutes(test.maxTimeToComplete)} min</span>
          </div>
          <div>
            <span>Start Date : {new Date(test.startedDate).toUTCString()}</span>
            {test.timeToComplete && (
              <span>
                Time to complete : {msToMinutes(test.timeToComplete)} min
              </span>
            )}
          </div>
          <div>{`${process.env.REACT_APP_BASE_URL}/test/${test.uuid}/0`}</div>
        </div>
      ))}
    </div>
  )
}
