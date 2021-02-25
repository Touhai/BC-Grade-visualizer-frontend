import React from 'react'
import {Bar} from 'react-chartjs-2'


function BarChart (props){
    return(
        <div className= 'chart-container'>


        <Bar
        
        data={props.data}
            height={400}
            width={600}
            options={{
                maintainAspectRatio:false,
                responsive:true,
                scales:{
                    yAxes:[{
                        ticks:{
                            beginAtZero:true
                        }
                    }]
                }
            }}
        
        
        
        
        
        />




        </div>
    )
}

export default BarChart