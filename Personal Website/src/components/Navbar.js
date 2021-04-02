import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'
import NavbarItem from './NavbarItem'

const Navbar = ({ activeItem, setActiveItem }) => {
	const [width, setWidth] = useState(0)
	const navs = ["Home","About","Projects","Contact"]
	const navRef = useRef(null);

	useEffect(() => {
		if(navRef.current) {
			setWidth(navRef.current.offsetWidth)
		}
	},[])

    const Scroll = (name) => {
        document.getElementById(name)?.scrollIntoView({
            behavior: 'smooth'
        })
    }

	return (
		<Container 
			container
		>
			<Menu container justify="center">
				<Grid item container xs={0} lg={7} />
				<Grid item container xs={11} lg={5} style={{ position: 'relative' }} ref={navRef}>
					<Grid item container xs={3} justify="center" alignItems="center"
                        onClick={() => Scroll('Home')}
                    >
                        <NavbarItem 
                            title={navs[0]}
                            active={activeItem === navs[0]}
                            callBack={setActiveItem}
                        />
					</Grid>
					<Grid item container xs={3} justify="center" alignItems="center"
                        onClick={() => Scroll('About')}
                    >
                        <NavbarItem 
                            title={navs[1]}
                            active={activeItem === navs[1]}
                            callBack={setActiveItem}
                        />
					</Grid>
					<Grid item container xs={3} justify="center" alignItems="center"
                        onClick={() => Scroll('Projects')}
                    >
                        <NavbarItem 
                            title={navs[2]}
                            active={activeItem === navs[2]}
                            callBack={setActiveItem}
                        />
					</Grid>
					<Grid item container xs={3} justify="center" alignItems="center"
                        onClick={() => Scroll('Contact')}
                    >
                        <NavbarItem 
                            title={navs[3]}
                            active={activeItem === navs[3]}
                            callBack={setActiveItem}
                        />
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