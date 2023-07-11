import React, { useState } from 'react'
import Background from './Background'
import { makeStyles, Grid, Typography, Card, Button } from '@material-ui/core'
import { Form, DatePicker, Input } from 'antd'
import ImageSlide from './ImageSlider'
import TextArea from 'antd/lib/input/TextArea'
import AppleIcon from '@material-ui/icons/Apple'
import { Link } from 'react-router-dom'

const { RangePicker } = DatePicker;

const SignIn = () => {
	
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [address,setAddress] = useState('')
	const [email, setEmail] = useState('')
	const classes = useStyle()

	return (
    <div className={classes.root}>
      <Background isSignIn={true} />
      <div className={classes.img}>
        <ImageSlide />
      </div>
      <div className={classes.logo_title}>
        <Typography variant="h1">iPhone 11</Typography>
      </div>

      <Grid container justifyContent="center">
        <Grid item container md={6}>
          <Card className={classes.form}>
            <Link to="/" className={classes.logo}>
              <AppleIcon />
              <Typography variant="subtitle1">Apple</Typography>
            </Link>
            <Typography variant="h4" align="center" className={classes.title}>
              Sign Up
            </Typography>
            <Form>
              <Form.Item className={classes.form_item}>
                <Typography variant="body1">Name & Surname</Typography>
                <Input
                  className={classes.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                />
              </Form.Item>
              <Form.Item className={classes.form_item}>
                <Typography variant="body1">Phone</Typography>
                <Input
                  className={classes.input}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="number"
                />
              </Form.Item>
              <Form.Item className={classes.form_item}>
                <Typography variant="body1">Email</Typography>
                <Input
                  className={classes.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </Form.Item>
              <Form.Item className={classes.form_item}>
                <Typography variant="body1">Address</Typography>
                <TextArea
                  className={classes.input}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                />
              </Form.Item>
              <Form.Item className={classes.form_item}>
                <Grid container justifyContent="space-between">
                  <Grid item container direction="column" md={8}>
                    <Typography variant="body1">Avaible Dates</Typography>
                    <RangePicker
                      className={classes.input}
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                    />
                  </Grid>
                  <Grid
                    item
                    container
                    alignItems="flex-end"
                    justifyContent="flex-end"
                    md={3}
                  >
                    <Button
                      fullWidth
                      variant="outlined"
                      type="submit"
                      color="primary"
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form.Item>
            </Form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default SignIn

const useStyle = makeStyles({
	root: {
		paddingBottom: '50px',
		background: 'black'
	},
	img: {
		position: 'absolute',
		top: '30px',
		left: '50px',
		'& div:first-of-type': {
			width: '500px'
		}
	},
	logo: {
		position: 'absolute',
		left: '25px',
		top: '25px',
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center',
		"& svg": {
			color: 'black',
			fontSize: '40px',
			marginRight: '10px'
		},
		"&:hover h6": {
			opacity: '1',
			visibility: 'visible',
		},
		'& h6': {
			opacity: '0',
			visibility: 'hidden',
			marginTop: '5px',
			fontSize: '1.3rem',
			fontWeight: 'bold',
			transition: 'all 0.2s ease'
		}
	},
	logo_title: {
		position: 'absolute',
		top: '200px',
		right: '150px',
		'& h1': {
			color: 'white'
		}
	},
	title: {
		marginBottom: '15px'
	},
	form_item: {
		marginBottom: '30px !important',
		"& p": {
			marginBottom: '5px',
			fontWeight: 'bolder'
		},
		display: 'flex',

	},
	input: {
		border: '1px solid #333',
		background: 'transparent !important',
		padding: '5px 10px',
		fontSize: '15px'
	},
	form: {
		width: '100%',
		padding: '30px',
		position: 'relative'
	}
})