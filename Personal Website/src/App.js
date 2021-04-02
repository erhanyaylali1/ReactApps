import React from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Credentials from './components/Credentials';
import Projects from './components/Projects';
import { Grid } from '@material-ui/core'
import 'antd/dist/antd.css'; 
import 'semantic-ui-css/semantic.min.css'

function App() {
    return (
		<Grid container style={{ position: 'relative' }}> 
			<Grid container item xs={12} style={{ position: 'sticky', top: '0px', zIndex: 99999  }}>
				<Navbar />
			</Grid>
			<Grid item xs={12}>
				<Home />
			</Grid>
			<Grid item xs={12}>
				<Credentials />
			</Grid>
			<Grid item xs={12}>
				<Projects />
			</Grid>
		</Grid>
    );
}

export default App;