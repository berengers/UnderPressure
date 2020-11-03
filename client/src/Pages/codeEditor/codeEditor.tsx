import React, { useContext } from 'react'

import './codeEditor.scss'
import { UserContext } from 'Services/context/userContext'
import Instructions from 'Modules/codeEditor/instructions/instructions'
import Editor from 'Modules/codeEditor/editor/editor'
import Asserts from 'Modules/codeEditor/asserts/asserts'
import Button from 'Lib/buttons/button/button'

export default function CodeEditor() {
  const { isLogged } = useContext(UserContext)

  return (
    <div className={`CodeEditor ${isLogged ? 'CodeEditor--logged' : ''}`}>
      <div className="CodeEditor-sidebar">
        <Instructions editMode={isLogged} />
      </div>
      <div className="CodeEditor-content">
        <div className="CodeEditor-editor">
          <Editor />
        </div>
        <div className="CodeEditor-asserts">
          <Asserts />
        </div>
        <div className="CodeEditor-buttons">
          <Button
            color="var(--color-info)"
            light
            onClick={() => {
              console.log(666)
            }}
          >
            Test
          </Button>
        </div>
      </div>
    </div>
  )
}
