import React, {useState} from 'react';
import {Paper, Select, MenuItem} from '@material-ui/core'

function TemplateSelector(props)
{
    var OnTemplateChange = event =>
    {
        props.OnTemplateChange(event.target.value);
    }

    return(
        <Paper style={{width: '320px', margin: 4, padding: 4, display: 'flex', flexDirection: 'column'}}>
            Template <Select onChange={(event) => OnTemplateChange(event)}>{props.MenuItems}</Select>
        </Paper>
    )
};

export default TemplateSelector;