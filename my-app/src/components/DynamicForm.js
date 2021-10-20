import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import DynamicForm2 from './DynamicForm2'
import axios from 'axios'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const distNamesLink = "http://ec2-54-188-112-78.us-west-2.compute.amazonaws.com:3000/api/info"
const schoolYearLink = "http://ec2-54-188-112-78.us-west-2.compute.amazonaws.com:3000/api/info/year"
const requestOne = axios.get(distNamesLink)
const requestTwo = axios.get(schoolYearLink)




function DynamicForm() {
    const classes = useStyles();


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

        <div className="container">

            <Formik
                initialValues={{ distrct: '', year: '' }}
            >
                <div className="dist-name-field-container">
                    <FormControl className={classes.formControl}>
                        <InputLabel className="input-label" htmlFor="district-select">District Name</InputLabel>
                        <Select
                            name="district"
                            className="district-select-field"
                            onChange={handleDistrictChange}
                            inputProps={{
                                name: "district",
                                id: "district-select"
                            }}
                        >
                            {districtNames.map(distrct => {
                                return (<option key={distrct} value={distrct}>{distrct}</option>)
                            })}
                        </Select>

                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel className="input-label" htmlFor="year-select">Year</InputLabel>
                        <Select
                            name="year"
                            className="year-select-field"
                            onChange={handleYearChange}
                            inputProps={{
                                name: "year",
                                id: "year-select"
                            }}

                        >
                            {schoolYear.map(year => {
                                return (<option key={year} value={year}>{year}</option>)
                            })}


                        </Select>
                    </FormControl>




                </div>


            </Formik>
            <DynamicForm2 district={districtNameInput} year={yearInput} />


        </div>
    )
}







export default DynamicForm