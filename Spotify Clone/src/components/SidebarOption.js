import React from 'react';
import './styles/SidebarOption.css'

const SidebarOption = ({Icon, title}) => {
    return (
        <div className="sidebarOption">
            {Icon ? (
                <React.Fragment>
                <Icon className="sidebarOption__icon" />
                <h3>{title}</h3>
                </React.Fragment>
            ):(
                <p>{ title }</p>
            )}
            
        </div>
    )
}

export default SidebarOption
