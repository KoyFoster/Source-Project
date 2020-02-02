import React from "react";
import {BrowserRouter as Router/*, Switch, Route*/} from 'react-router-dom'
import Diagram from "./Diagram.js";

//Stat Card
function StatCard(props)
{
    //Render and Logic 
    return( 
        <Router>
            {/*<Route path='/statcard' component={Diagram} />*/}
            <Diagram></Diagram>
        </Router>
    )
};

export default StatCard;