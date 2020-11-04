import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import _isEqual from 'lodash/isEqual'

import './codeEditor.scss'
import { useGetAPI, usePostAPI, usePutAPI } from 'Services/hook/api'
import { UserContext } from 'Services/context/userContext'
import Instructions from 'Modules/codeEditor/instructions/instructions'
import TestsOutput from 'Modules/codeEditor/testsOutput/testsOutput'
import Editor from 'Modules/codeEditor/editor/editor'
import Asserts from 'Modules/codeEditor/asserts/asserts'
import Button from 'Lib/buttons/button/button'
import { QuestionInterface } from 'Pages/testList/testList'
import Loader from 'Lib/loader/loader'

interface PropsInterface {
  initMode?: boolean
}

export default function CodeEditor({ initMode = false }: PropsInterface) {
  const { isLogged } = useContext(UserContext)
  const { questionId, testId } = useParams<{
    questionId: string
    testId: string
  }>()
  const [question, { isLoading }] = useGetAPI<QuestionInterface>(
    `question/${questionId}`,
    {},
    initMode
  )
  const [createQuestion] = usePostAPI('question')
  const [updateQuestion] = usePutAPI(`question/${questionId}`)
  const [asserts, setAsserts] = useState(question.asserts)
  const [code, setCode] = useState(question.code)
  const [instructions, setInstructions] = useState(question.instructions)
  const [testResult, setTestResult] = useState<Array<[boolean, any, any]>>([])
  const [errorEval, setErrorEval] = useState<string>()

  useEffect(() => {
    setAsserts(question.asserts)
    setCode(question.code)
    setInstructions(question.instructions)
  }, [question])

  const postQuestion = () => {
    const question = {
      asserts,
      code,
      instructions,
      name: 'question created by app 2',
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

  if (!initMode && isLoading) return <Loader size="50" />

  return (
    <div className={`CodeEditor ${isLogged ? 'CodeEditor--logged' : ''}`}>
      <div className="CodeEditor-sidebar">
        <Instructions
          value={instructions}
          onChange={setInstructions}
          editMode={isLogged}
        />
        <TestsOutput value={testResult} error={errorEval} />
      </div>
      <div className="CodeEditor-content">
        <div className="CodeEditor-editor">
          <Editor value={code} onChange={setCode} />
        </div>
        <div className="CodeEditor-asserts">
          <Asserts value={asserts} onChange={setAsserts} />
        </div>
        <div className="CodeEditor-buttons">
          <Button color="var(--color-info)" light onClick={postQuestion}>
            Save question
          </Button>
          <Button color="var(--color-info)" light onClick={runTests}>
            Run Tests
          </Button>
        </div>
      </div>
    </div>
  )
}
