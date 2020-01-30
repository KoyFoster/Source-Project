import React from 'react';
import { Button, Paper, Link } from '@material-ui/core';

function FootBar(props)
{
    return(
    <Paper align='center' style={{width: props.width, padding: '5px'}}>
            Privacy Policy -->
           | No Cookies |
        <Link href='https://github.com/KoyFoster/Diagram-Stat-Card'>
            <Button style={{margin: '1px'}}>
                Source
            </Button>
        </Link>
    </Paper>)
};

export default FootBar;