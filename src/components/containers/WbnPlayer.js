import React from 'react'
import { ThemeProvider } from "styled-components"
import Video from '../Video'
import Playlist from '../containers/Playlist'
import StyledWbnPlayer from '../styles/StyledWbnPlayer'


const theme = {
    bgcolor: "#353535",
    bgColorItem: "#414141",
    bgColorItemActive: "#405c63",
    bgColorPlayed: "#526d4e",
    border: "none",
    borderPlayed: "none",
    color: "#fff"
}

const themeLight = {
    bgcolor: "#fff",
    bgColorItem: "#fff",
    bgColorItemActive: "#80a7b1",
    bgColorPlayed: "#7d9979",
    border: "1px solid #353535",
    borderPlayed: "none",
    color: "#353535"
}


const WbnPlayer = props => {
    return (
        <ThemeProvider theme= {state.nightMode ? theme : themeLight}>
            <StyledWbnPlayer>
                <Video />
                <Playlist />
            </StyledWbnPlayer>
        </ThemeProvider>
        
    )
}

export default WbnPlayer