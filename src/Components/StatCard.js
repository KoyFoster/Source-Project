import React from "react";
import {BrowserRouter as Router, Route/*, Switch*/} from 'react-router-dom'
import Diagram from "./Diagram.js";

//Stat Card
function StatCard(props)
{
    //Render and Logic 
    return( 
        <Router>
            {<Route path='/' component={Diagram} />}
        </Router>
    )
};

export default StatCard;