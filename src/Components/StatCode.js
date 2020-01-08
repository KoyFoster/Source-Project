import React from "react";
import { Button, Paper, TextField, makeStyles, InputLabel, Divider } from '@material-ui/core';
import {Row, Col} from './Grid.js'

function CopyToClipboard(event)
{
    event.value = event.value;
    document.execCommand('copy');
};

class StatCode extends React.Component
{
    copyCodeToClipboard = () => 
    {
        const el = this.textArea
        el.select()
        document.execCommand("copy")
    };

    render(){return(<Paper style={{margin: 4, padding: 4, display: 'flex', flexDirection: 'row'}}>

            <Button style={{width: "128px"}} onClick={() => this.copyCodeToClipboard()}>Copy Code</Button>

            <TextField style={{display: "flex"}}>
            </TextField>

                <textarea ref={(textarea) => this.textArea = textarea} value="Example copy for the textarea."/>>

        </Paper>)}
};

export default StatCode;