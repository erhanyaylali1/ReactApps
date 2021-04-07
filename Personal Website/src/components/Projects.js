import React, { useEffect } from 'react'
import { Tab } from 'semantic-ui-react'
import styled from 'styled-components'
import Project from './Project'
import 'swiper/swiper-bundle.css'
import WOW from "wow.js"
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
import p30 from '../assets/p3_0.png'
import p31 from '../assets/p3_1.png'
import p32 from '../assets/p3_2.png'
import p33 from '../assets/p3_3.png'
import p34 from '../assets/p3_4.png'
import p35 from '../assets/p3_5.png'
import p36 from '../assets/p3_6.png'
import p37 from '../assets/p3_7.png'
import p38 from '../assets/p3_8.png'
import p41 from '../assets/p4_1.png'
import p42 from '../assets/p4_2.png'
import p43 from '../assets/p4_3.png'
import p44 from '../assets/p4_4.png'
import p45 from '../assets/p4_5.png'
import p46 from '../assets/p4_6.png'
import p47 from '../assets/p4_7.png'
import p48 from '../assets/p4_8.png'

const Projects = () => {

    useEffect(() => {
		const wow = new WOW()
		wow.init();
	}, [])

	const panes = [
		{
		  	menuItem: 'Socialony',
		  	render: () => (
				<Tab.Pane attached={false} className="wow bounceInUp" data-wow-duration="1s" data-wow-delay="0.5s">
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
			<Tab.Pane attached={false} className="wow bounceInUp" data-wow-duration="1s" data-wow-delay="0.5s">
				<Project 
						title="Media Read"
						images={[p210,p211,p212,p213,p214,p215,p216,p217,p218]}
						features={["Python", "Flask", "Bootstrap", "JQuery", "MySQL"]}
						github="https://github.com/erhanyaylali1/MediaRead"
					/>
			</Tab.Pane>
		    ),
		},
        {
            menuItem: 'Weather App',
            render: () => (
              <Tab.Pane attached={false} className="wow bounceInUp" data-wow-duration="1s" data-wow-delay="0.5s">
                  <Project 
                        title="Weather App"
                        images={[p30, p31,p32,p33,p34,p35,p36,p37,p38]}
                        features={["React", "Redux", "Google Map API", "Wikipedia API", "OpenWeatherMap"]}
                        github="https://github.com/erhanyaylali1/ReactApps/tree/main/WeatherApp"
                        url="https://weatherapp-erhan.netlify.app"
                    />
              </Tab.Pane>
              ),
          },
          {
              menuItem: 'Amazon Website',
              render: () => (
                <Tab.Pane attached={false} className="wow bounceInUp" data-wow-duration="1s" data-wow-delay="0.5s">
                    <Project 
                          title="Amazon Website"
                          images={[p41,p42,p43,p44,p45,p46,p47, p48, p44]}
                          features={["React", "Redux", "Firebase", "Splash"]}
                          github="https://github.com/erhanyaylali1/ReactApps/tree/main/Amazon%20Clone"
                          url="https://ey1-f69b8.web.app"
                      />
                </Tab.Pane>
                ),
            },
	  ]

	return (
		<Container id="Projects">
			<Tab menu={{ secondary: true, pointing: true }} panes={panes}/>
		</Container>
	)
}


export default Projects

const Container = styled.div`
	background-color: #1aa39c;
`
