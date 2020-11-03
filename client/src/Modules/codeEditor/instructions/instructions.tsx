import React, { useState } from 'react'
import CodeEditor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-dark.css'

import './instructions.scss'

interface PropsInterface {
  editMode?: boolean
  instructions?: string
}

const preview = `Write an algorithm that takes an array and moves all of the zeros to the end, preserving the order of the other elements.

moveZeros([false,1,0,1,2,0,1,3,"a"]) // returns[false,1,1,2,1,3,"a",0,0]`

export default function Instructions({
  editMode = false,
  instructions
}: PropsInterface) {
  const [text, setText] = useState(preview)

  return (
    <div className="Instructions">
      {editMode ? (
        <CodeEditor
          className="Instructions-textarea"
          value={text}
          onValueChange={setText}
          highlight={text =>
            highlight(text, languages.javascript, 'javascript')
          }
          padding={15}
          tabSize={4}
        />
      ) : (
        <p>{instructions}</p>
      )}
    </div>
  )
}
