import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import _isEqual from 'lodash/isEqual'
import _get from 'lodash/get'

import './codeEditor.scss'
import { useGetAPI, usePostAPI, usePutAPI } from 'Services/hook/api'
import { UserContext } from 'Services/context/userContext'
import Instructions from 'Modules/codeEditor/instructions/instructions'
import TestsOutput from 'Modules/codeEditor/testsOutput/testsOutput'
import Editor from 'Modules/codeEditor/editor/editor'
import Asserts from 'Modules/codeEditor/asserts/asserts'
import Button from 'Lib/buttons/button/button'
import { QuestionInterface, TestInterface } from 'Pages/testList/testList'
import Loader from 'Lib/loader/loader'

interface TestRunInterface {
  test: TestInterface
  uuid: string
}

interface PropsInterface {
  initMode?: boolean
  playerMode?: boolean
}

const codeDefault = `const moveZeros = (arr) => {
  // TODO: Program me
}`
const assertsDefault = `it(moveZeros([1,2,0,1,0,1,0,3,0,1]), [ 1, 2, 1, 1, 3, 1, 0, 0, 0, 0 ])
it(moveZeros([1,2,0,'1',0,1,'0',3,1]), [ 1, 2, 1, 1, 3, 1, 0, 0, 0 ])`
const instructionsDefault = `Write an algorithm that takes an array and moves all of the zeros to the end, preserving the order of the other elements.

moveZeros([false,1,0,1,2,0,1,3,"a"]) //returns[false,1,1,2,1,3,"a",0,0]`

export default function CodeEditor({
  initMode = false,
  playerMode = false
}: PropsInterface) {
  const { isLogged } = useContext(UserContext)
  const { page, questionId, testId, uuid: testRunUuid } = useParams<{
    page: string
    questionId: string
    testId: string
    uuid: string
  }>()
  const [loggedQuestion, { isLoading }] = useGetAPI<QuestionInterface>(
    `question/${questionId}`,
    {},
    initMode || playerMode
  )
  const [runTest, { isLoading: runTestLoading, error }] = useGetAPI<
    TestRunInterface
  >(`testRun/${testRunUuid}`, {}, !playerMode)
  const question = loggedQuestion.id
    ? loggedQuestion
    : _get(runTest, `test.questions[${page}]`, {})
  const [createQuestion] = usePostAPI('question', null, '/')
  const [updateQuestion] = usePutAPI(`question/${questionId}`, null, '/')
  const [testFinish] = usePutAPI(`testRun/${testRunUuid}`, null)
  const [testFnished, setTestFinished] = useState(false)

  const [asserts, setAsserts] = useState(assertsDefault)
  const [code, setCode] = useState(codeDefault)
  const [instructions, setInstructions] = useState(instructionsDefault)
  const [questionName, setQuestionName] = useState('')
  const [testResult, setTestResult] = useState<Array<[boolean, any, any]>>([])
  const [errorEval, setErrorEval] = useState<string>()

  const isTestsOk =
    testResult.length > 0 && testResult.every(([value]) => value)
  const toNextPage = `/test/${testRunUuid}/${Number.parseInt(page) + 1}`
  const displayNextButton =
    _get(runTest, `test.questions`, []).length > Number.parseInt(page) + 1

  useEffect(() => {
    if (!question.code || !question.instructions) return
    setAsserts(question.asserts)
    setCode(question.code)
    setInstructions(question.instructions)
    setQuestionName(question.name)
  }, [question])

  const [timeToFinish, setTimeToFinish] = useState(0)
  useEffect(() => {
    if (!testRunUuid) return

    const interval = setInterval(() => {
      setTimeToFinish(value => value + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const postQuestion = () => {
    const question = {
      asserts,
      code,
      instructions,
      name: questionName,
      testId
    }

    if (initMode) {
      createQuestion(question)
    } else {
      updateQuestion(question)
    }
  }

  const runTests = () => {
    setTestResult([])
    setErrorEval('')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const it = (result: any, expected: any) => {
      const isEqual = _isEqual(result, expected)
      setTestResult(arr => [...arr, [isEqual, result, expected]])
    }

    if (!code || !asserts) return

    try {
      eval(code + '\n' + asserts)
    } catch (error) {
      setErrorEval(error.message)
    }
  }

  const finish = () => {
    testFinish({ timeToComplete: timeToFinish * 1000 })
    setTestFinished(true)
  }

  if (error)
    // TODO - add component to display error
    return (
      <h2 style={{ textAlign: 'center' }}>
        <strong>Time limit exceeded</strong>
      </h2>
    )

  if (!initMode && (isLoading || runTestLoading)) return <Loader size="50" />

  if (testFnished)
    // TODO - add design to congrats player and give him the time to complete
    return (
      <h2 style={{ textAlign: 'center' }}>
        <strong>CONGRATS</strong>
      </h2>
    )

  return (
    <div className={`CodeEditor ${isLogged ? 'CodeEditor--logged' : ''}`}>
      <div className="CodeEditor-sidebar">
        <Instructions
          value={instructions}
          onChange={setInstructions}
          editMode={isLogged}
        >
          <div className="CodeEditor-inputQuestionNameContainer">
            {!playerMode ? (
              <input
                className="CodeEditor-inputQuestionName"
                name="setQuestionName"
                onChange={e => {
                  setQuestionName(e.target.value)
                }}
                placeholder="question name"
                type="text"
                value={questionName}
              />
            ) : (
              <p>{questionName}</p>
            )}
          </div>
        </Instructions>
        <TestsOutput value={testResult} error={errorEval} />
      </div>
      <div className="CodeEditor-content">
        <div className="CodeEditor-editor">
          <Editor value={code} onChange={setCode} />
        </div>
        <div className="CodeEditor-asserts">
          <Asserts editMode={isLogged} value={asserts} onChange={setAsserts} />
        </div>
        <div className="CodeEditor-buttons">
          {testRunUuid && <span>{timeToFinish}s</span>}
          <Button
            color="var(--color-info)"
            disable={!asserts || !questionName}
            onClick={postQuestion}
          >
            Save question
          </Button>
          <Button color="var(--color-info)" onClick={runTests}>
            Run Tests
          </Button>
          {testRunUuid && displayNextButton && (
            <Button
              color="var(--color-info)"
              disable={!isTestsOk}
              onClick={() => {
                setTestResult([])
              }}
              to={toNextPage}
            >
              NEXT
            </Button>
          )}
          {testRunUuid && !displayNextButton && (
            <Button
              color="var(--color-info)"
              disable={!isTestsOk}
              onClick={finish}
            >
              FINISH
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
