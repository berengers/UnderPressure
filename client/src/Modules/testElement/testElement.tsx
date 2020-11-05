import React from 'react'
import _upperFirst from 'lodash/upperFirst'

import './testElement.scss'
import { TestInterface } from 'Pages/testList/testList'
import Button from 'Lib/buttons/button/button'

interface PropsInterface {
  test: TestInterface
  toggleModal: (number: number) => void
}

export default function TestElement({ test, toggleModal }: PropsInterface) {
  return (
    <div className="TestElement">
      <div className="TestElement-header">
        <div>{_upperFirst(test.name)}</div>
        {test.questions && test.questions.length > 0 && (
          <img
            className="TestElement-shareImage"
            onClick={() => {
              toggleModal(test.id)
            }}
            src={`${process.env.REACT_APP_BASE_URL}/icons/share.png`}
            width="30px"
          />
        )}
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
                  {question.instructions}
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
