import React, { useEffect, useState } from 'react'
import { FormControl } from '@material-ui/core'
import { fetchCountry } from '../../api' 
import styles from './CountryPicker.module.css'
import { Select } from 'antd';


const CountryPicker = ({ handleSelectedCountryChange }) => {

	const [countries, setCountries] = useState([])
	const { Option } = Select;

	useEffect(() => {
		const runAPI = async () => {
			setCountries(await fetchCountry())
		}
		runAPI()
	},[setCountries])

	const renderCountries = () => {
		if(countries.length) {
			return countries.map((country, index) => {
				return(
					<Option value={country} key={index}>
						{country}
					</Option>
				)
			})
		}
	}

	return (
		<FormControl className={styles.formControl}>
			<Select 
				showSearch
				placeholder="Select a Country"
				onChange={(e) => handleSelectedCountryChange(e)}
			>
				<Option value="Global">Global</Option>
				{renderCountries()}
			</Select>
		</FormControl>
	)
}

export default CountryPicker