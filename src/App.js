import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { IntlProvider } from 'react-intl'

import { AuthProvider } from './context/auth'

import AuthRoute from './util/AuthRoute'

import Register from './pages/Register/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import NotFound from './pages/NotFound/NotFound'

import 'semantic-ui-css/semantic.min.css'
import './App.scss'

import messages_sk from './languages/sk.json'
import messages_en from './languages/en.json'

const messages = {
	sk: messages_sk,
	en: messages_en,
}

const language = navigator.language.split(/[-_]/)[0] // language without region code

const DEFAULT_LANGUAGE = 'en'

const App = () => {
	return (
		<AuthProvider>
			<IntlProvider locale={DEFAULT_LANGUAGE} messages={messages[DEFAULT_LANGUAGE]}>
				<Router>
					<Switch>
						<Route exact path="/">
							<Redirect to="/login" />
						</Route>
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
						<AuthRoute path="/dashboard" component={Dashboard} />
						<Route path="*" component={NotFound} />
					</Switch>
				</Router>
			</IntlProvider>
		</AuthProvider>
	)
}

export default App
