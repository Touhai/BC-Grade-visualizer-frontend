//Component for forms

import React, { useState, useEffect } from 'react';
import { Formik, useFormik } from 'formik';
import BarChart from './BarChart'


function MainForm() {


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
            updateData(values.number1, values.number2, values.number3)
        }

    })

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

    return (<div>


        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="number1">number1</label>
            <input
                id='number1'
                name='number1'
                type="number1"
                onChange={formik.handleChange}
                value={formik.values.number1}>
            </input>

            <label htmlFor="number1">number2</label>

            <input
                id='number2'
                name='number2'
                type="number2"
                onChange={formik.handleChange}
                value={formik.values.number2}>
            </input>
            <label htmlFor="number1">number3</label>

            <input
                id='number3'
                name='number3'
                type="number3"
                onChange={formik.handleChange}
                value={formik.values.number3}>
            </input>




            <button type="submit">Submit</button>
        </form>


        <BarChart data={chartData} />
    </div>

    )
}


export default MainForm