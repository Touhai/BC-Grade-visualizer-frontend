//Component for forms

import React, {useState} from 'react';
import {useFormik } from 'formik';
import BarChart from './BarChart'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  


function MainForm(props) {
    const classes = useStyles();


    const [chartData, setChartData] = useState({

        labels: ['Course Grade', 'Provincal Exam Grade', 'Overall Grade'],
        datasets: [
            {
                label: "Grades in %",
                data: [15, 20, 30],
                backgroundColor: ['red', 'green', 'blue']
            }
        ]
    })



    const formik = useFormik({
        initialValues: {
            number1: 0,
            number2: 0,
            number3: 0,
        },
        onSubmit: values => {
            fetchData();
            // updateData(values.number1, values.number2, values.number3);
        }

    })

    //Does all the logic of fetching and processing data
    function fetchData() {
        axios.get("http://ec2-54-188-112-78.us-west-2.compute.amazonaws.com:3000/api/grades" + "/"
            + encodeURIComponent(props.name) + "/" + encodeURIComponent(props.year)
            + "/" + encodeURIComponent(props.subject) + "/"
            + encodeURIComponent(props.population)).then((response) => {
                console.log(response.data.data)
                processData(response.data.data)
            })
    }
    //helper function that process the data in the front end.
    function processData(arr) {
        let n1;
        let n2;
        let n3;

        for (let obj of arr) {
            if (obj["MARK_TYPE"] === "COURSE_MARKS") {
                n1 = obj["AVERAGE_PERCENT"]
            }
            if (obj["MARK_TYPE"] === "EXAM_MARKS") {
                n2 = obj["AVERAGE_PERCENT"]
            }
            if (obj["MARK_TYPE"] === "FINAL_MARKS") {
                n3 = obj["AVERAGE_PERCENT"]
            }
        }
        updateData(convertValues(n1),
            convertValues(n2),
            convertValues(n3))

    }

    function convertValues(number) {
        if (number === "Msk") {
            return 0;
        } else {

            return parseFloat(number);
        }

    }

    // updates the value from the form.
    function updateData(n1, n2, n3) {
        setChartData(
            {
                labels: ['Course Grade', 'Provincal Exam Grade', 'Overall Grade'],
                datasets: [
                    {
                        label: "Grades in %",
                        data: [n1, n2, n3],
                        backgroundColor: ['red', 'green', 'blue']
                    }
                ]
            }
        )
    }

    return (
        <div className={classes.root}>


            <form onSubmit={formik.handleSubmit}>

                <Button variant="contained" color="secondary" type="submit" >Submit</Button>
            </form>

            <BarChart data={chartData} />

        </div>

    )
}


export default MainForm