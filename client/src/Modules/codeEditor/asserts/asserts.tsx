import React, { Dispatch, SetStateAction } from 'react'
import CodeEditor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-dark.css'

import './asserts.scss'

interface PropsInterface {
  editMode: boolean
  value?: string
  onChange: Dispatch<SetStateAction<string>>
}

export default function Asserts({ editMode, value, onChange }: PropsInterface) {
  const changeValue = (event: SetStateAction<string>) => {
    if (!editMode) return
    onChange(event)
  }

  return (
    <div className="Asserts">
      <div className="CodeEditor-title">Tests</div>
      <CodeEditor
        className="Asserts-codeEditor"
        value={value || ''}
        onValueChange={changeValue}
        highlight={code => highlight(code, languages.javascript, 'javascript')}
        padding={15}
        tabSize={4}
      />
    </div>
  )
}
