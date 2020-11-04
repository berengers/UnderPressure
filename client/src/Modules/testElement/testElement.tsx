import React from 'react'
import _upperFirst from 'lodash/upperFirst'

import './testElement.scss'
import { TestInterface } from 'Pages/testList/testList'
import Button from 'Lib/buttons/button/button'

interface PropsInterface {
  test: TestInterface
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
              key={question.id}
              to={`/test/${test.id}/question/${question.id}`}
            >
              <div className="TestElement-question-title">
                {_upperFirst(question.name)}
              </div>
              {question.instructions && (
                <div className="TestElement-question-instructions">
                  Instructions: {question.instructions}
                </div>
              )}
            </Button>
          ))}

          <Button
            color="var(--color-info)"
            fullWidth
            to={`test/${test.id}/new_question`}
          >
            + Add Question
          </Button>
        </div>
      )}
    </div>
  )
}
