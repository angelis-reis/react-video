import React from 'react'
import PlaylistHeader from '../PlaylistHeader'
import PlaylistItems from '../containers/PlaylistItems'
import NightMode from '../NightMode'
import styled from "styled-components"

const StyledPlaylist = styled.div `

    -webkit-box-flex: 1;
    -ms-flex: 1 1 450px;
    flex: 1 1 450px;
    overflow: hidden;
    color: white;

    @media screen and (max-width:1240px) {
        width: 100%;
        display: block;
    }
    
`

const Playlist = ({ videos, active, nightModeCallback, nightMode }) => {
    
    
    return (

        <StyledPlaylist >  {/* ao envolver os componentes em um styledComponent eu aplico o stilo   nos componenetes */}

            <NightMode nightModeCallback={nightModeCallback} nightMode={nightMode} />
            <PlaylistHeader active={active} total={videos.length}/>
            <PlaylistItems videos={videos} active={active} />

        </ StyledPlaylist >
    
    )



}


   


export default Playlist