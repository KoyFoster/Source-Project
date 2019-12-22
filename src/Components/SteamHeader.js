import React from "react";
import {Button, Card, Grid, Box}  from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


/*Components*/
const LeftSection=()=>
(
  <Box display="flex" alignItems="center">
    <img src ="https://steamcommunity-a.akamaihd.net/public/shared/images/header/globalheader_logo.png?t=962016" width="176" height="44" alt="Steam" />
    <Box><Button class="Button">STORE</Button><Button class="Button">COMMUNITY</Button><Button class="Button">ABOUT</Button><Button class="Button">SUPPORT</Button></Box>
  </Box>
);
const RightSection=()=>
(
  <Box display="inline" alignItems="center">
    <Button class="Button-install"
      icon="https://steamcommunity-a.akamaihd.net/public/shared/images/header/globalheader_logo.png?t=962016"
      href="https://store.steampowered.com/about/">
      Install Steam
    </Button>
    <a class="font-default" href="https://steamcommunity.com/login/home/?goto=id%2FKoy_Foster%2F">login</a>
    <text> | </text>
    <text class="font-default" href="">language</text>
  </Box>
);

/* Material-UI CSS Styles */
const useStyles = makeStyles({
    card: {
        justify: 'top',
        minWidth: 2,
    },
    grid: {
        verticalAlign: 'top',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
});

function SteamHeader(props)
{    
 const classes = useStyles();

 return (<header class="Header-default">
<div class="Div-row">

<LeftSection/>
<Box justifyContent="Center" width="200px"></Box>
<RightSection/>

</div>
</header>)
}

export default SteamHeader;