import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { Menu } from 'semantic-ui-react'

import { AuthContext } from 'context/auth'

const Navigation = () => {
	const { user, logout } = useContext(AuthContext)

	const pathName = window.location.pathname
	const path = pathName === '/' ? 'dashboard' : pathName.substr(1)

	const [activeItem, setActiveItem] = useState(path)

	const handleItemClick = (e, { name }) => setActiveItem(name)

	const renderMenuBar = () => {
		if (user !== null) {
			return (
				<Menu pointing secondary>
					<Menu.Item
						name="dashboard"
						active={activeItem === 'dashboard'}
						onClick={handleItemClick}
						as={Link}
						to="/"
					/>
					<Menu.Menu position="right">
						<Menu.Item name="logout" active={activeItem === 'logout'} onClick={logout} />
					</Menu.Menu>
				</Menu>
			)
		}

		return null
	}

	return renderMenuBar()
}

Navigation.propTypes = {
	user: PropTypes.object,
	logout: PropTypes.func,
}

export default Navigation
