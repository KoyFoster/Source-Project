import React from 'react';
import {Paper, Select} from '@material-ui/core'

function TemplateSelector(props)
{
    var OnTemplateChange = event =>
    {
        props.OnTemplateChange(event.target.value);
    }

    return(
        <Paper style={{width: '320px', margin: 4, padding: 4, display: 'flex', flexDirection: 'column'}}>
            Template <Select defaultValue={props.defaultValue} onChange={(event) => OnTemplateChange(event)}>{props.MenuItems}</Select>
        </Paper>
    )
};

export default TemplateSelector;