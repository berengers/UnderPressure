import React, { Dispatch, SetStateAction } from 'react'
import CodeEditor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-dark.css'

import './instructions.scss'

interface PropsInterface {
  editMode?: boolean
  value?: string
  onChange: Dispatch<SetStateAction<string | undefined>>
}

export default function Instructions({
  editMode = false,
  value,
  onChange
}: PropsInterface) {
  return (
    <div className="Instructions">
      <div className="CodeEditor-title">Instructions</div>
      {editMode ? (
        <CodeEditor
          className="Instructions-textarea"
          value={value || ''}
          onValueChange={onChange}
          highlight={text =>
            highlight(text, languages.javascript, 'javascript')
          }
          padding={15}
          tabSize={4}
        />
      ) : (
        <p>{value}</p>
      )}
    </div>
  )
}
