//Component for forms

import React, {useState} from 'react';
import { useFormik } from 'formik';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';


function MainForm() {

    const [data, setData] = useState([
        { number: 1, grade: 50 },
        { number: 2, grade: 75 },
        { number: 3, grade: 90 },

    ])

    const formik = useFormik({
        initialValues: {
            number1: 0,
            number2: 0,
            number3: 0,
        },
        onSubmit: values => {
            setData(prevData => alert(prevData) )
            alert(data[0].grade)

        }

    })

  

    return (<div>

        <h1>this is a main form</h1>
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

        <VictoryChart
            domainPadding={20}>
            <VictoryAxis
                tickFormat={["Number1", "Number2", "Number3"]} />


            <VictoryBar
                data={data}
                x="number"
                y="grade"
            />
        </VictoryChart>

    </div>

    )
}



// class MainForm extends React.Component{

//     constructor(){
//         super()
//     }

//     handleSubmit(){
//         // Do something
//     }


//    render(){
//     return(
//         <h1>this is a form whatever</h1>
//     )
//    }
// }

export default MainForm