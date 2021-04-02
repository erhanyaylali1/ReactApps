import React from 'react'
import { Tab } from 'semantic-ui-react'
import styled from 'styled-components'
import Project from './Project'
import 'swiper/swiper-bundle.css'
import './style.css'
import p11 from '../assets/p1_1.png'
import p12 from '../assets/p1_2.png'
import p13 from '../assets/p1_3.png'
import p14 from '../assets/p1_4.png'
import p15 from '../assets/p1_5.png'
import p16 from '../assets/p1_6.png'
import p17 from '../assets/p1_7.png'
import p18 from '../assets/p1_8.png'
import p19 from '../assets/p1_9.png'
import p210 from '../assets/p2_10.png'
import p211 from '../assets/p2_11.png'
import p212 from '../assets/p2_12.png'
import p213 from '../assets/p2_13.png'
import p214 from '../assets/p2_14.png'
import p215 from '../assets/p2_15.png'
import p216 from '../assets/p2_16.png'
import p217 from '../assets/p2_17.png'
import p218 from '../assets/p2_18.png'


const Projects = () => {

	const panes = [
		{
		  	menuItem: 'Socialony',
		  	render: () => (
				<Tab.Pane attached={false}>
					<Project 
						title="Socialony - Social Media"
						images={[p11,p12,p13,p14,p15,p16,p17,p18,p19]}
						features={["React", "Redux", "Material-UI", "Firebase", "Express.js","Ant-Design", "Grommet", "Semantic UI"]}
						github="https://github.com/erhanyaylali1/Socialony-SocialMedia"
						url="https://socialony.web.app/"
					/>
				</Tab.Pane>
			),
		},
		{
		  menuItem: 'Media Read',
		  render: () => (
			<Tab.Pane attached={false}>
				<Project 
						title="Media Read"
						images={[p210,p211,p212,p213,p214,p215,p216,p217,p218]}
						features={["Python", "Flask", "Bootstrap", "JQuery", "MySQL"]}
						github="https://github.com/erhanyaylali1/MediaRead"
					/>
			</Tab.Pane>
		),
		},
	  ]

	return (
		<Container>
			<Tab menu={{ secondary: true, pointing: true }} panes={panes} />
		</Container>
	)
}

export default Projects

const Container = styled.div`
	background-color: #438ca2
`