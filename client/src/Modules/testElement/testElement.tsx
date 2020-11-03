import React from 'react'
import _upperFirst from 'lodash/upperFirst'

import './testElement.scss'
import Button from 'Lib/buttons/button/button'

interface QuestionInterface {
  uuid: number
  testId: number
  asserts: string
  code?: string
  instructions?: string
  name: string
  order: number
}

interface PropsInterface {
  test: {
    name: string
    questions?: Array<QuestionInterface>
  }
}

export default function TestElement({ test }: PropsInterface) {
  return (
    <div className="TestElement">
      <div className="TestElement-header">
        <div>{_upperFirst(test.name)}</div>
      </div>
      {test.questions && (
        <div className="TestElement-questionsContainer">
          {test.questions?.map(question => (
            <Button
              color="var(--color-primary)"
              className="TestElement-question"
              fullWidth
              key={question.uuid}
              to={`/question/${question.uuid}`}
            >
              <div className="TestElement-question-title">
                {_upperFirst(question.name)}
              </div>
              <div>Instructions: {question.instructions}</div>
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
