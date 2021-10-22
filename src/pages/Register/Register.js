import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/client'

import { useForm } from 'util/hooks'
import { AuthContext } from 'context/auth'
import { REGISTER_USER } from 'gql/mutations'

import { Button, Form } from 'semantic-ui-react'

import classes from './Register.module.scss'

const Register = props => {
	const context = useContext(AuthContext)

	const [errors, setErrors] = useState({})

	const registerUser = () => {
		addUser()
	}

	const { onChange, onSubmit, values } = useForm(registerUser, {
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(_, { data: { register: userData } }) {
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
				<Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
					<div className={classes.title}>Register</div>
					<Form.Input
						label="Username"
						placeholder="Type your username"
						name="username"
						type="text"
						error={errors.username !== undefined ? true : false}
						value={values.username}
						onChange={onChange}
					/>
					<Form.Input
						label="Email"
						placeholder="Type your email"
						name="email"
						type="email"
						error={errors.email !== undefined ? true : false}
						value={values.email}
						onChange={onChange}
					/>
					<Form.Input
						label="Password"
						placeholder="Type your password"
						name="password"
						type="password"
						error={errors.password !== undefined ? true : false}
						value={values.password}
						onChange={onChange}
					/>
					<Form.Input
						label="Confirm Password"
						placeholder="Type confirm password"
						name="confirmPassword"
						type="password"
						error={errors.confirmPassword !== undefined ? true : false}
						value={values.confirmPassword}
						onChange={onChange}
					/>
					<Button className={classes.button} type="submit" primary>
						Submit
					</Button>
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

export default Register
