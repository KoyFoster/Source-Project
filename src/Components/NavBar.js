import React from 'react';
import { Button, Paper } from '@material-ui/core';

function NavBar(props)
{
    return(
    <Paper align='left' style={{width: props.width, padding: '5px'}}>
        STAT CARD
        {/*<Button style={{margin: '1px'}}>
            Home
    </Button>*/}
    </Paper>)
};

export default NavBar;