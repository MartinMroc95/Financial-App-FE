import React, { Fragment } from 'react'

import Navigation from 'components/Navigation'

/* const routes = [
    {
        path: '/',
        exact: true,
        main: () => <Login />,
    },
    {
        path: '/dashboard',
        main: () => <Dashboard />,
    },
    {
        path: '*',
        main: () => <NotFound />,
    },
] */

const Dashboard = () => {
	return (
		<Fragment>
			<Navigation />
			<h1>Content</h1>
		</Fragment>
	)
}

export default Dashboard
