import React from 'react';
import { Button, Paper } from '@material-ui/core';
import {HashRouter, Link, Route} from 'react-router-dom'
import StatCard from './StatCard';
import {Row} from './DivGrid'

function NavBar(props)
{
    return(
        //style={{border: '1px solid red', width: '100%', height: '100%', align: 'center'}}
    <Paper align='left' style={{...props.style, width: props.width, margin: 'none', padding: '5px'}}>
        <HashRouter basename='/' >
                <Row justifyContent = 'left'>
                    <Link to="/">
                    <Button style={{margin: '1px'}}>
                        Home
                    </Button>
                    </Link>
                <Link to="/StatCard">
                    <Button style={{margin: '1px'}}>
                        Stat Card
                    </Button>
                    </Link>
                </Row>
            <hr style={{display: 'none'}} />
            
            <div >
                <Route exact path="/" />
                <Route path="/StatCard" component={StatCard} />
            </div>
        </HashRouter>
    </Paper>)
};

export default NavBar;