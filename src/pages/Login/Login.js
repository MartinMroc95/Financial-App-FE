import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { useMutation } from '@apollo/client'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'

import { useForm } from 'util/hooks'
import { AuthContext } from 'context/auth'
import { LOGIN_USER } from 'gql/mutations'

import { Button, Form } from 'semantic-ui-react'

import classes from './Login.module.scss'

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

	const formClassName = loading === true ? 'loading' : ''

	return (
		<div className={classes.wrapper}>
			<div className={classes.holder}>
				<Form onSubmit={onSubmit} noValidate className={formClassName}>
					<div className={classes.title}>{intl.formatMessage({ id: 'login.sign_in' })} </div>
					<Form.Input
						label={intl.formatMessage({ id: 'username' })}
						placeholder={intl.formatMessage({ id: 'type_username' })}
						name="username"
						type="text"
						error={errors.username !== undefined ? true : false}
						value={values.username}
						onChange={onChange}
					/>
					<Form.Input
						label={intl.formatMessage({ id: 'password' })}
						placeholder={intl.formatMessage({ id: 'type_password' })}
						name="password"
						type="password"
						error={errors.password !== undefined ? true : false}
						value={values.password}
						onChange={onChange}
					/>
					<Link
						className={classNames(classes.link, classes['link--forgot-password'])}
						to="/register"
					>
						{intl.formatMessage({ id: 'login.forgot_password' })}
					</Link>
					<Button className={classes.button} type="submit" primary>
						{intl.formatMessage({ id: 'submit' })}
					</Button>
					<div className={classes['sign-up']}>
						{intl.formatMessage({ id: 'login.not_member' })}
						<Link className={classes.link} to="/register">
							{intl.formatMessage({ id: 'login.sign_up' })}
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

export default Login
