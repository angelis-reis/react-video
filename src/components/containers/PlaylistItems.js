import React from 'react'
import PlaylistItem from '../PlaylistItem'
import withLink from '../hoc/withLink'
import styled from 'styled-components'

const StyledPlaylistItems = styled.div `

    padding: 0 20px;
    overflow-y: auto;
    height: 28vw;
    max-height: 500px;

    ::-webkit-scrollbar {
        width: 5px;
    }
    ::webkit-scrollbar-track {
        background: transparent;
    }
    ::webkit-scrollbar-thumb {
        background: #888;
        border-radius: 2px;
    }
    ::webkit-scrollbar-thumb:hover {
        background: #555;
    }    
`

const PlaylistItemWithLink = withLink(PlaylistItem)

const PlaylistItems = ({ videos, active }) => {

	return (
		<StyledPlaylistItems>
			{videos.map(video => (
				<PlaylistItemWithLink
					key={video.id}
					video={video}
					active={video.id === active.id ? true : false}
					played={video.played}
				/>
			))}
		</StyledPlaylistItems>
	)
}

export default PlaylistItems