import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { Form, Input } from 'antd';
import { Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import 'semantic-ui-css/semantic.min.css';

const Register = () => {
	const classes = useStyle();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [name, setName] = useState('');
	const [lastname, setLastname] = useState('');
	return (
		<div>
			<Grid container className={classes.root}>
				<Grid item xs={1} lg={3} />
				<Grid item xs={10} lg={6}>
					<Typography variant="body1" align="center" className={classes.register}>
						Register
					</Typography>
					<Divider />
					<Form className={classes.form}>
						<Form.Item
							className={classes.formInput}
							label="Email"
							rules={[
								{
									required: true,
									message: 'Please input your email!',
								},
							]}
						>
							<Input 
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Form.Item>

						<Form.Item
							className={classes.formInput}
							label="Password"
							rules={[
								{
									required: true,
									message: 'Please input your password!',
								},
							]}
						>
							<Input.Password 
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Form.Item>

						<Form.Item
							className={classes.formInput}
							label="Username"
							rules={[
								{
									required: true,
									message: 'Please input your username!',
								},
							]}
						>
							<Input 
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</Form.Item>

						<Form.Item
							className={classes.formInput}
							label="First Name"
							rules={[
								{
									required: true,
									message: 'Please input your First Name!',
								},
							]}
						>
							<Input 
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Form.Item>

						<Form.Item
							className={classes.formInput}
							label="Last Name"
							rules={[
								{
									required: true,
									message: 'Please input your Last Name!',
								},
							]}
						>
							<Input 
								type="text"
								value={lastname}
								onChange={(e) => setLastname(e.target.value)}
							/>
						</Form.Item>

						<Form.Item className={classes.button}>						
							<Button variant="contained" size="medium" color="primary" htmlType="submit">
								Login
							</Button>
						</Form.Item>
					</Form>
					<Divider horizontal>OR</Divider>
					<Typography align="center" varianth="body1" className={classes.link}>
						<Link to="/login">
							Already have an account? Login
						</Link>
					</Typography>
				</Grid>
				<Grid item xs={1} lg={3} />
			</Grid>
		</div>
	)
}

export default Register

const useStyle = makeStyles((themes) => ({
	root: {
		paddingTop: "50px",
		paddingBottom: "70px"
	},
	register: {
		fontSize: "2rem",
		color: "#555555",
		fontWeight: "700"
	},
	button: {
		textAlign: "end"
	},
	form: {
		paddingTop: "30px"
	},
	link: {
		marginTop: "10px",
		fontSize: "1.3rem"
	}
}))