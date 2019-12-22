import React from "react";
import {Button, Icon, Card, Grid, Box, CardMedia}  from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProfileHeaderBG from "../assets/steam/ProfileHeader.png";

function ProfileHeader(props)
{
    return(
    <header class="Header-profile">
        <Box width="978px" height="225px" >
            <CardMedia image={ProfileHeaderBG} >
                <div class="Div-row" style={{padding: "32px"}}>
                    <img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/a8/a85b40194ebe701cee80b3bfd48715292956cb38_full.jpg" style={{border: "2px solid lightBlue", marginRight: "32px" }} alt="[Avatar]"/>
                    <div>
                        <div style={{display: "flex"}}>
                            <text style={{fontSize: "24px" }}>Koy Foster</text>
                        </div>
                        <text style={{verticalAlign: "middle", marginRight: "8px"}}>Koy Foster</text><img src="https://steamcommunity-a.akamaihd.net/public/images/countryflags/us.gif" style={{verticalAlign: "middle", marginRight: "2px"}} alt="[Nation]"/><text style={{verticalAlign: "middle"}}>Austin, Texas, United States</text>
                        <div style={{marginTop: "32px"}}>
                            <img src="https://steamcommunity-a.akamaihd.net/economy/emoticon/bonfire2" alt=":bonfire2:" class="emoticon"/>
                            <img src="https://steamcommunity-a.akamaihd.net/economy/emoticon/ebonyivory" alt=":ebonyivory:" class="emoticon"/>
                            <img src="https://steamcommunity-a.akamaihd.net/economy/emoticon/estusempty" alt=":estusempty:" class="emoticon"/>
                            <img src="https://steamcommunity-a.akamaihd.net/economy/emoticon/redqueen" alt=":redqueen:" class="emoticon"/>
                            <img src="https://steamcommunity-a.akamaihd.net/economy/emoticon/bloodstain2" alt=":bloodstain2:" class="emoticon"/>
                            <img src="https://steamcommunity-a.akamaihd.net/economy/emoticon/os_ram" alt=":os_ram:" class="emoticon"/>
                            <img src="https://steamcommunity-a.akamaihd.net/economy/emoticon/flowey" alt=":flowey:" class="emoticon"/>
                            <img src="https://steamcommunity-a.akamaihd.net/economy/emoticon/dmc5_red_orb" alt=":dmc5_red_orb:" class="emoticon"/>
                            <img src="https://steamcommunity-a.akamaihd.net/economy/emoticon/dmc5_white_orb" alt=":dmc5_white_orb:" class="emoticon"/>
                            <img src="https://steamcommunity-a.akamaihd.net/economy/emoticon/dmc5_purple_orb" alt=":dmc5_purple_orb:" class="emoticon"/>
                        </div>
                    </div>
                    <Box flexGrow={1}></Box>
                    <div style={{display: "inline"}}>
                        <Box width="268px">
                            <text style={{fontSize: 24}}>Level
                                <text style={{borderRadius: "50%", display:"inline-block", padding: "4px", backgroundColor: "#cd5843"}}>
                                    <text style={{fontSize: 16, borderRadius: "50%", display:"inline-block", backgroundColor: "white"}}>
                                        <Box width="24px" height="24px"> 26</Box>
                                    </text>
                                </text>
                            </text>
                        </Box>
                        <Card style={{display: "flex", padding: "8px", marginTop: "16px", alignItems: "center", color: "white", background: "#171a21"}}>
                        <img width="54px" height="54px" src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/items/601150/c921dc5cfb1d0607a4bd3a7b748f7409dccbe746.png"></img>
                        <div style={{display: "inline"}}>
                            <text>DMC5 StylishRank SS</text>
                            <text> - 500 XP</text>                            
                        </div>
                        </Card>
                    </div>
                </div>                
            </CardMedia>
        </Box>
    </header>)
}

export default ProfileHeader;