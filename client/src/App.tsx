import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { UserContext, CreateUserContext } from './Services/context/userContext'
import './App.scss'
import Login from 'Pages/login/login'
import TestList from 'Pages/testList/testList'
import AppBar from 'Modules/appBar/appBar'
import CodeEditor from 'Pages/codeEditor/codeEditor'
import Shared from 'Pages/shared/shared'

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
                <Route path="/shared">
                  <Shared />
                </Route>
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
              <Switch>
                <Route path="/test/:uuid/:page">
                  <CodeEditor playerMode />
                </Route>
                <Route path="/">
                  <Login />
                </Route>
              </Switch>
            )}
          </div>
        </Router>
      </UserContext.Provider>
    </div>
  )
}

export default App
