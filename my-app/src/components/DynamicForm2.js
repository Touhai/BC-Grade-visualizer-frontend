import React, { useState, useEffect, useRef } from 'react'
import { Formik } from 'formik';
import axios from 'axios'

export default function DynamicForm2(props) {

    const [schoolNames, setSchoolNames] = useState([]);
    const [population,setPopulation] = useState([])

        
        // Using prevProps to ensure the form only calls when it updates.

        const prevDistrictRef = useRef();
        useEffect(() =>{
             console.log("use effect called")

             prevDistrictRef.current = props.district

             if(props.district !== prevDistrict){
                axios.get("http://ec2-54-165-217-77.compute-1.amazonaws.com:3000/api/info/" + encodeURIComponent(props.district) ).then((response) =>{
                    setSchoolNames(response.data.data)
                })
             }
        })
        const prevDistrict = prevDistrictRef.current;

    
    //once year and school Name is selected, allows user to add subjects.
    function handleSchoolNameChange(e){
        console.log(e.target.value)
        axios.get("http://ec2-54-165-217-77.compute-1.amazonaws.com:3000/api/info/" + encodeURIComponent(e.target.value)+"/" + encodeURIComponent(props.year) ).then((response) =>{
                    console.log(response.data.data)
                    setPopulation(response.data.data)
                })


    }



    return (
        <div>

            <Formik

                initialValues={{ schoolName:'', }}
            >
                <div>

                <select
                name="schoolName"
                onChange={handleSchoolNameChange}>

                    {schoolNames.map(schoolName =>{
                 return (<option key={schoolName} value={schoolName}>{schoolName}</option>)

                    })}

                </select>


                <select
                name="population">
                        {population.map(population =>{
                 return (<option key={population} value={population}>{population}</option>)

                    })}


                </select>

                </div>
            </Formik>

        </div>
    )
}
