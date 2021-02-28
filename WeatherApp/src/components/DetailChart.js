import React from 'react'
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineMarkSeries, Crosshair } from 'react-vis';

const DetailChart = ({data, unit}) => {

    const [selected, setSelected] = React.useState(null);
    
    return (
        <div>
            <XYPlot xType="time" width={700} height={400}>
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis 
                            title="Time"
                            tickFormat={function tickFormat(d){
                                const date = new Date(d)
                                return date.toUTCString().substring(5,12);
                            }}
                        />
                        <YAxis
                            title={unit}
                            tickFormat={function tickFormat(d){
                                return `${d}`;
                            }}
                        />
                        <LineMarkSeries
                            className="linemark-series-example"
                            style={{
                                strokeWidth: '1px',
                            }}
                            data={data}
                            onNearestX={v => setSelected([v])}
                            onValueMouseOut={() => setSelected(null)}
                        />
                        <Crosshair
                            values={selected}   
                        >
                            <div
                                style={{
                                    background: '#3A3A48',
                                    borderRadius: "10px",
                                    minWidth: '7em',
                                    padding: '0.8em',
                                    fontSize: '14px',
                                    color: 'white'
                                  }}
                            >
                                <h5>{selected && selected[0].x.toUTCString().substring(0, 16)}</h5>
                            </div>
                        </Crosshair>
            </XYPlot>
        </div>
    )
}

export default DetailChart
