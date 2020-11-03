import React from 'react'

import TestElement from 'Modules/testElement/testElement'
import './testList.scss'

export default function TestList() {
  const tests = [
    {
      testId: 1,
      name: 'double 1',
      questions: [
        {
          uuid: 1,
          testId: 1,
          asserts: 'asserts(4)',
          code: 'function (value) {\n\n\n}',
          instructions: 'You have to return double value',
          name: 'double',
          order: 1
        },
        {
          uuid: 2,
          testId: 1,
          asserts: 'asserts(4)',
          code: 'function (value) {\n\n\n}',
          instructions: 'You have to return double value',
          name: 'square',
          order: 3
        },
        {
          uuid: 3,
          testId: 1,
          asserts: 'asserts(4)',
          code: 'function (value) {\n\n\n}',
          instructions: 'You have to return double value',
          name: 'double',
          order: 4
        },
        {
          uuid: 4,
          testId: 1,
          asserts: 'asserts(4)',
          code: 'function (value) {\n\n\n}',
          instructions: 'You have to return double value',
          name: 'square',
          order: 2
        }
      ],
      userId: 1
    },
    {
      testId: 2,
      name: 'square 2',
      userId: 1
    },
    {
      testId: 3,
      name: 'square 3',
      userId: 1
    },
    {
      testId: 4,
      name: 'square 4',
      userId: 1
    }
  ]

  return (
    <div className="TestList">
      {tests.map(test => (
        <div className="TestList-testElementContainer" key={test.testId}>
          <TestElement test={test} />
        </div>
      ))}
    </div>
  )
}
