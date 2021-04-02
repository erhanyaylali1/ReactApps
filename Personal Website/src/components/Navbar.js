import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'
import NavbarItem from './NavbarItem'

const Navbar = () => {
	const [activeItem, setActiveItem] = useState('Home')
	const [width, setWidth] = useState(0)
	const navs = ["Home","About","Projects","Contact"]
	const navRef = useRef(null);

	useEffect(() => {
		if(navRef.current) {
			setWidth(navRef.current.offsetWidth)
		}
	},[])

	return (
		<Container 
			container
		>
			<Menu container justify="center">
				<Grid item container xs={0} lg={7} />
				<Grid item container xs={11} lg={5} style={{ position: 'relative' }} ref={navRef}>
					<Grid item container xs={3} justify="center" alignItems="center">
                        <a href="#Home">
                            <NavbarItem 
                                title={navs[0]}
                                active={activeItem === navs[0]}
                                callBack={setActiveItem}
                            />
                        </a>
					</Grid>
					<Grid item container xs={3} justify="center" alignItems="center">
                        <a href="#About">
                            <NavbarItem 
                                title={navs[1]}
                                active={activeItem === navs[1]}
                                callBack={setActiveItem}
                            />
                        </a>
					</Grid>
					<Grid item container xs={3} justify="center" alignItems="center">
                        <a href="#Projects">
                            <NavbarItem 
                                title={navs[2]}
                                active={activeItem === navs[2]}
                                callBack={setActiveItem}
                            />
                        </a>
					</Grid>
					<Grid item container xs={3} justify="center" alignItems="center">
                        <a href="#Contact">
                            <NavbarItem 
                                title={navs[3]}
                                active={activeItem === navs[3]}
                                callBack={setActiveItem}
                            />
                        </a>
					</Grid>
					<Line 
						style={{ left: width * navs.indexOf(activeItem) / 4, width: width / 4 }}
					/>
				</Grid>
			</Menu>
		</Container>
	)
}

export default Navbar

const Container = styled(Grid)`
	position: absolute;
    top: 0;
    background-color: #1aa39c;
`
const Menu = styled(Grid)`
	display: flex;
	transition: all ease-in 0.4s;
	cursor: pointer;
`
const Line = styled.div`
	position: absolute;
	bottom: 0;
	height: 2px;
	background-color: white;
	transition: all ease 0.3s;
`