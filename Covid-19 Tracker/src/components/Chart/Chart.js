import React, { useState, useEffect } from 'react'
import { fetchDailyDate } from '../../api'
import { Line, Bar } from 'react-chartjs-2'
import styles from './Chart.module.css'

const Chart = ({ data: { confirmed, recovered, deaths}, country }) => {
	
	const [dailyData, setDailyData] = useState([])

	useEffect(() => {
		const runAPI = async () => {
			setDailyData(await fetchDailyDate())
		} 
		runAPI()
	},[])

	const lineChart = () =>{
		if(dailyData.length) {
			return(
				<Line 
					data={{
						labels: dailyData.map(({ date }) => date ),
						datasets: [{
							data: dailyData.map(({ confirmed }) => confirmed ),
							label: 'Infected',
							borderColor: 'rgba(0, 0, 255, .5)',
							fill: true
						},{
							data: dailyData.map(({ deaths }) => deaths ),
							label: 'Deaths',
							borderColor: 'rgba(255, 0, 0, .5)',
							fill: true
						}]
					}}
				/>
			)	
		}
	}

	const barChart = () => {
		if(confirmed) {
			return (
				<Bar 
					data={{
						labels: ["Infected", "Recovered", "Deaths"],
						datasets: [{
							label: "People",
							backgroundColor:[
								"rgba(0, 255, 0, .5)",
								"rgba(0, 0, 255, .5)",
								"rgba(255, 0, 0, .5)",
							],
							data: [confirmed.value, recovered.value, deaths.value]
						}]
					}}
					options={{
						legend: { display: false },
						title: { 
							display: true,
							text: `Current Case in ${country}`
						}
					}}
				/>	
			)
		}
	}

	return (
		<div className={styles.container}>
			{!country ? lineChart():barChart()}			
		</div>
	)
}

export default Chart