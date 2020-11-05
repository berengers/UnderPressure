import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import CodeEditor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-dark.css'

import './instructions.scss'

interface PropsInterface {
  children: ReactNode
  editMode?: boolean
  value?: string
  onChange: Dispatch<SetStateAction<string>>
}

export default function Instructions({
  editMode = false,
  children,
  value,
  onChange
}: PropsInterface) {
  const changeValue = (event: SetStateAction<string>) => {
    if (!editMode) return
    onChange(event)
  }

  return (
    <div className="Instructions">
      <div className="CodeEditor-title">Instructions</div>
      {children}
      <CodeEditor
        className="Instructions-textarea"
        value={value || ''}
        onValueChange={changeValue}
        highlight={text => highlight(text, languages.javascript, 'javascript')}
        padding={15}
        tabSize={4}
      />
    </div>
  )
}
