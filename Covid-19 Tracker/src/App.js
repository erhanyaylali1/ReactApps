import React from 'react'
import { Cards , Chart, CountryPicker } from './components'
import styles from './App.module.css'
import { fetchData, fetchCountryData } from './api'
import 'antd/dist/antd.css'

class App extends React.Component {

	state = {
		data: {},
		selectedCountry: '',
	}

	async componentDidMount() {
		const data = await fetchData()
		this.setState({ data })
	}

	handleSelectedCountryChange = async (selectedCountry) => {
		if(selectedCountry === "Global") {
			this.setState({ selectedCountry: ''})
		} else {
			const data = await fetchCountryData(selectedCountry)
			this.setState({ data, selectedCountry })
		}
	}
	
	render() {
		return (
			<div className={styles.container}>
				<Cards data={this.state.data} country={this.state.selectedCountry} />
				<CountryPicker handleSelectedCountryChange={this.handleSelectedCountryChange} />
				<Chart data={this.state.data} country={this.state.selectedCountry} />
			</div>
		)
	}
}

export default App