import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import _ from 'lodash';

const Chart = (props) => {

    const average = () => {
        return `Average: ${_.round(_.mean(props.data))}${props.unit}`;
    };

    return (
        <React.Fragment>
            <Sparklines 
                svgHeight={120} 
                svgWidth={200} 
                data={props.data}
            >
                <SparklinesLine color={props.color} />
            </Sparklines>
            <div className="text-center">{average()}</div>
        </React.Fragment>
    )
}

export default Chart
