import React, { Dispatch, SetStateAction } from 'react'
import CodeEditor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-dark.css'

import './editor.scss'

interface PropsInterface {
  value?: string
  onChange: Dispatch<SetStateAction<string | undefined>>
}

export default function Editor({ value, onChange }: PropsInterface) {
  return (
    <div className="Editor">
      <div className="CodeEditor-title">Code editor</div>
      <CodeEditor
        className="Editor-codeEditor"
        value={value || ''}
        onValueChange={onChange}
        highlight={code => highlight(code, languages.javascript, 'javascript')}
        padding={15}
        tabSize={4}
      />
    </div>
  )
}
