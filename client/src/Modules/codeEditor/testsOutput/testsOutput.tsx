import React from 'react'

import './testsOutput.scss'

interface PropsInterface {
  error?: string
  value: Array<[boolean, any, any]>
}

export default function TestsOutput({ error, value }: PropsInterface) {
  return (
    <div className={`TestsOutput ${error ? 'TestsOutput--error' : ''}`}>
      <div className="CodeEditor-title">Output</div>

      {error ? (
        <p className="TestsOutput-errorMessage">{error}</p>
      ) : (
        <div>
          {value.map(([isValid, result, expected], index) => {
            return (
              <div
                className={
                  isValid
                    ? 'TestOutput-element--valid'
                    : 'TestOutput-element--unvalid'
                }
                key={index}
              >
                {isValid ? (
                  <div>
                    Test Passed: Value =={' '}
                    <span className="TestOutput-value">
                      {JSON.stringify(result)}
                    </span>
                  </div>
                ) : (
                  <div>
                    Expected:{' '}
                    <span className="TestOutput-value">
                      {JSON.stringify(expected)}
                    </span>
                    , instead got:{' '}
                    <span className="TestOutput-value">
                      {JSON.stringify(result)}
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
