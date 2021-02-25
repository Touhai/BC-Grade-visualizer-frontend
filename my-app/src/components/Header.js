// Main header file in My App.

import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Header() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant='h6'>BC Provinical Exam Visualizer</Typography>
                </Toolbar>


            </AppBar>

        </div>
        //     <ul className = "navigation-bar">
        //        <li className = "navigation-bar-element">Home</li>
        //        <li className = "navigation-bar-element"><a href='https://github.com/Touhai/BC-provinical-grade-visualizer'>API</a></li>
        //    </ul>


    )
}

export default Header