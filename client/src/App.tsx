import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { UserContext, CreateUserContext } from './Services/context/userContext'
import './App.scss'
import TestList from 'Pages/testList/testList'
import AppBar from 'Modules/appBar/appBar'
import CodeEditor from 'Pages/codeEditor/codeEditor'

function App() {
  const userContext = CreateUserContext()
  const { isLogged } = userContext

  return (
    <div className="App">
      <UserContext.Provider value={userContext}>
        <Router>
          {isLogged && <AppBar />}
          <div className="App-container">
            {isLogged ? (
              <Switch>
                <Route path="/shared">shared</Route>
                <Route exact path="/test/:testId/new_question">
                  <CodeEditor initMode />
                </Route>
                <Route path="/test/:testId/question/:questionId">
                  <CodeEditor />
                </Route>
                <Route path="/">
                  <TestList />
                </Route>
              </Switch>
            ) : (
              'login page'
            )}
          </div>
        </Router>
      </UserContext.Provider>
    </div>
  )
}

export default App
