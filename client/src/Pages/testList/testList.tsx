import React, { useState } from 'react'

import './testList.scss'
import { useGetAPI } from 'Services/hook/api'
import TestElement from 'Modules/testElement/testElement'
import Loader from 'Lib/loader/loader'
import Modal from 'Lib/modal/modal'
import ShareTestForm from 'Modules/shareTestForm/shareTestForm'

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
  const [shareModal, toggleShareModal] = useState(false)
  const [testIdSelected, setTestIdSelected] = useState<number>()
  const [tests, { isLoading }] = useGetAPI<Array<TestInterface>>('test', [])

  const openShareModal = (testId: number) => {
    toggleShareModal(true)
    setTestIdSelected(testId)
  }

  if (isLoading) return <Loader size="76" />

  return (
    <div className="TestList">
      <div className="TestList-container">
        {tests.map(test => (
          <div className="TestList-testElementContainer" key={test.id}>
            <TestElement test={test} toggleModal={openShareModal} />
          </div>
        ))}
      </div>

      {testIdSelected && (
        <Modal display={shareModal} setDisplay={toggleShareModal}>
          <ShareTestForm testId={testIdSelected} />
        </Modal>
      )}
    </div>
  )
}
