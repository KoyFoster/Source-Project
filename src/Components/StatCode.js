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

    render(){return(<Paper style={{width: this.props.width, margin: 4, padding: 4, display: 'flex', flexDirection: 'row'}}>

            <Button style={{width: "128px"}} onClick={() => this.copyCodeToClipboard()}>Copy Code</Button>

                <textarea ref={(textarea) => this.textArea = textarea} value={this.props.code}/>

        </Paper>)}
};

export default StatCode;