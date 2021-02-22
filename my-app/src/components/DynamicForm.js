import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import DynamicForm2 from './DynamicForm2'
import axios from 'axios'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';



const distNamesLink = "http://ec2-54-165-217-77.compute-1.amazonaws.com:3000/api/info"
const schoolYearLink = "http://ec2-54-165-217-77.compute-1.amazonaws.com:3000/api/info/year"
const requestOne = axios.get(distNamesLink)
const requestTwo = axios.get(schoolYearLink)




function DynamicForm() {


    const [districtNames, setDistrictNames] = useState([]);
    const [schoolYear, setSchoolYear] = useState([]);



    // obtain the form data from api
    useEffect(() => {
        axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
            setDistrictNames(responses[0].data.data)
            setSchoolYear(responses[1].data.data)
        }
        ))
    }, [])


    const [districtNameInput, setDistrctNameInput] = useState('');
    const [yearInput, setYearInput] = useState('');

    function handleDistrictChange(e) {
        console.log(e.target.value)
        setDistrctNameInput(e.target.value)
    }

    function handleYearChange(e) {
        console.log(e.target.value);
        setYearInput(e.target.value)
    }


    return (

        <div>

            <Formik
                initialValues={{ distrct: '', year: '' }}
            >
                <div>
                    <InputLabel htmlFor="district-select">District Name</InputLabel>
                    <Select
                        name="district"
                        onChange={handleDistrictChange}
                        inputProps={{
                            name:"district",
                            id:"district-select"
                        }}
                        

                    >
                        {districtNames.map(distrct => {
                            return (<option key={distrct} value={distrct}>{distrct}</option>)
                        })}
                    </Select>
                    

                    <InputLabel htmlFor="year-select">Year</InputLabel>
                    <Select
                        name="year"
                        onChange={handleYearChange}
                        inputProps={{
                            name:"year",
                            id:"year-select"
                        }}

                    >
                        {schoolYear.map(year => {
                            return (<option key={year} value={year}>{year}</option>)
                        })}


                    </Select>

                </div>


            </Formik>
            {/* testing */}
            <DynamicForm2 district ={districtNameInput} year = {yearInput} />


        </div>
    )
}







export default DynamicForm