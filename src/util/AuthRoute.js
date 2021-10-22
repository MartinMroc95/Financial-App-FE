import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthContext } from '../context/auth'

const AuthRouter = ({ component: Component, ...rest }) => {
	const { user } = useContext(AuthContext)

	return (
		<Route
			{...rest}
			render={props => {
				if (user === null) {
					// not logged in so redirect to auth page with the return url
					return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
				}

				// authorized so return component
				return <Component {...props} />
			}}
		/>
	)
}

export default AuthRouter
