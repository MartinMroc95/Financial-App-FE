import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/client'
import { useIntl } from 'react-intl'

import { useForm } from 'util/hooks'
import { AuthContext } from 'context/auth'
import { LOGIN_USER } from 'gql/mutations'

import { Button, Form } from 'semantic-ui-react'

import classes from './Login.module.scss'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

const Login = props => {
	const intl = useIntl()

	const context = useContext(AuthContext)

	const [errors, setErrors] = useState({})

	const loginUserCallback = () => {
		loginUser()
	}

	const { onChange, onSubmit, values } = useForm(loginUserCallback, {
		username: '',
		password: '',
	})

	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(_, { data: { login: userData } }) {
			context.login(userData)
			props.history.push('/dashboard')
		},
		onError(error) {
			setErrors(error.graphQLErrors[0].extensions.errors)
		},
		variables: values,
	})

	if (context.user !== null) {
		props.history.push('/dashboard')
	}

	return (
		<div className={classes.wrapper}>
			<div className={classes.holder}>
				<Form onSubmit={onSubmit} noValidate className={loading === true ? 'loading' : ''}>
					<div className={classes.title}>{intl.formatMessage({ id: 'sign_in' })} </div>
					<Form.Input
						label="Username"
						placeholder="Type your username"
						name="username"
						type="text"
						error={errors.username !== undefined ? true : false}
						value={values.username}
						onChange={onChange}
						className={classes.input}
					/>
					<Form.Input
						label="Password"
						placeholder="Type your password"
						name="password"
						type="password"
						error={errors.password !== undefined ? true : false}
						value={values.password}
						onChange={onChange}
						className={classes.input}
					/>
					<Link
						className={classNames(classes.link, classes['link--forgot-password'])}
						to="/register"
					>
						Forgot password?
					</Link>
					<Button className={classes.button} type="submit" primary>
						Login
					</Button>
					<div className={classes['sign-up']}>
						Not a member?
						<Link className={classes.link} to="/register">
							Signup
						</Link>
					</div>
				</Form>
				{Object.keys(errors).length > 0 && (
					<div className="ui error message">
						<ul className="list">
							{Object.values(errors).map(value => (
								<li key={value}>{value}</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	)
}

Login.propTypes = {}

export default Login
