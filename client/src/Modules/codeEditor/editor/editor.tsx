import React, { useState } from 'react'
import CodeEditor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-dark.css'

import './editor.scss'

const cocode = `var moveZeros = function (arr) {
  // TODO: Program me
}`

export default function Editor() {
  const [code, setCode] = useState(cocode)

  return (
    <div className="Editor">
      <CodeEditor
        className="Editor-codeEditor"
        value={code}
        onValueChange={setCode}
        highlight={code => highlight(code, languages.javascript, 'javascript')}
        padding={15}
        tabSize={4}
      />
    </div>
  )
}
