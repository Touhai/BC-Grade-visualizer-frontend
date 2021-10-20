import React, { useState, useEffect, useRef } from 'react'
import { Formik } from 'formik';
import axios from 'axios'
import MainForm from './MainForm'
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

export default function DynamicForm2(props) {
    const classes = useStyles();

    const [schoolNames, setSchoolNames] = useState([]);
    const [nameInput, setNameInput] = useState('');
    const [subject, setSubjects] = useState([]);
    const [subjectInput, setSubjectInput] = useState([]);
    const [population, setPopulation] = useState([]);
    const [populationInput, setPopulationInput] = useState('');


    // Using prevProps to ensure the form only calls when it updates.

    const prevDistrictRef = useRef();
    useEffect(() => {
        console.log("use effect called")

        prevDistrictRef.current = props.district

        if (props.district !== prevDistrict) {
            axios.get("http://ec2-54-188-112-78.us-west-2.compute.amazonaws.com:3000/api/info/" + encodeURIComponent(props.district)).then((response) => {
                setSchoolNames(response.data.data)
            })
        }
    })
    const prevDistrict = prevDistrictRef.current;





    //once year and school Name is selected, allows user to add subjects.
    function handleSchoolNameChange(e) {
        setNameInput(e.target.value)
        axios.get("http://ec2-54-188-112-78.us-west-2.compute.amazonaws.com:3000/api/info/" + encodeURIComponent(e.target.value) + "/"
            + encodeURIComponent(props.year)).then((response) => {
                console.log(response.data.data)
                setSubjects(response.data.data)
            })
    }

    function handleSubjectChange(e) {
        setSubjectInput(e.target.value);

        axios.get("http://ec2-54-188-112-78.us-west-2.compute.amazonaws.com:3000/api/info/" + encodeURIComponent(nameInput) + "/"
            + encodeURIComponent(props.year) + "/" + encodeURIComponent(e.target.value)).then((response) => {
                console.log(response)
                setPopulation(response.data.data)
            })
    }

    function handlePopChange(e) {
        setPopulationInput(e.target.value)


    }



    return (
        <div>

            <Formik

                initialValues={{ schoolName: '', }}
            >
                <div className="school-subject-population">

                    <FormControl className={classes.formControl}>

                        <InputLabel htmlFor="schoolName-select">School Name</InputLabel>

                        <Select
                            name="schoolName"
                            onChange={handleSchoolNameChange}
                            className="school-select-field"
                            inputProps={{
                                name: "schoolName",
                                id: "schoolName-select"
                            }}


                        >

                            {schoolNames.map(schoolName => {
                                return (<option key={schoolName} value={schoolName}>{schoolName}</option>)

                            })}

                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>

                        <InputLabel htmlFor="subject-select">Subject</InputLabel>

                        <Select
                            name="subject"
                            onChange={handleSubjectChange}
                            className="subject-select-field"
                            inputProps={{
                                name: "subject",
                                id: "subject-select"
                            }}>
                            {subject.map(subject => {
                                return (<option key={subject} value={subject}>{subject}</option>)

                            })}


                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>

                        <InputLabel htmlFor="population-select">Population</InputLabel>

                        <Select
                            name="population"
                            onChange={handlePopChange}
                            className="population-select-field"
                            inputProps={{
                                name: "population",
                                id: "population-select"
                            }}>

                            {population.map(population => {
                                return (<option key={population} value={population}>{population}</option>)

                            })}


                        </Select>

                    </FormControl>







                </div>
            </Formik>

            <MainForm name={nameInput} subject={subjectInput} year={props.year} population={populationInput} />
        </div>
    )
}
