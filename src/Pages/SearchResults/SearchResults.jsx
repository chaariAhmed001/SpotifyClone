import React from 'react'
import { FavoriteArtists,Album } from '../../Components';
import { useStateValue } from '../../Context/StateProvider';
import './SearchResults.css'
const SearchResults = ({spotify}) => {
  const [{ SearchResults,SearchResultsEp,SearchResultsSh }, dispatch] = useStateValue();

    const setTime = (ms) =>{
        const min = Math.floor((ms/60000) << 0);
        const sec = Math.floor((ms % 60000) / 1000).toFixed(0);
        return min+ ':' + (sec < 10 ? "0" : "") + sec
      }
  return (
    <div className='searchResult-container'>
        <div className='container1'>
            <div className='topResult-container'>
                <h2>Top result</h2>
                <div className='topResult-content'>
                    <img src={SearchResults?.artists?.items[0]?.images[2]?.url} alt="" />
                    <div className='artist-name'>
                        <h1>{SearchResults?.artists?.items[0].name}</h1>
                        <span className='artist'>Artist</span>
                    </div>
                    <span><strong>Genres:</strong>{SearchResults?.artists?.items[0].genres?.join('. ')}</span>
                </div>
            </div>
            <div className='songs-container'>
                <h2>Songs</h2>
                <div className='songs-content'>
                    {
                       SearchResults?.tracks?.items?.map((track,index)=>(
                        index <= 3 &&
                        <div className='track-container' key={index}>
                            <div className='leftSide'>
                                <img src={track?.album?.images[2].url} alt={track?.name}  />
                                <div className='track-details'>
                                    <h4>{track?.name}</h4>
                                    <span>{track?.album?.name}</span>
                                </div>
                            </div>
                            <span className='rigthSide'>{setTime(track?.duration_ms)}</span>
                        </div>
                       )) 
                    }
                </div>
            </div>
        </div>
        <div className='container'>
            <h2>Playlists</h2>
            <div className='albums-container'>
            {
              SearchResults?.playlists?.items?.map((playList,index)=>(
                index <=4 &&<Album  key={index} spotify={spotify} id={playList?.id} name={playList?.name} image={playList?.images?.[0].url} type='categoryPlayLists' by={playList?.owner?.display_name}/>
              ))
            }
            </div>
        </div>
        <div className='container'>
            <h2>Albums</h2>
            <div className='albums-container'>
            {
              SearchResults?.albums?.items?.map((album,index)=>(
                index <=4 &&<Album  key={index} spotify={spotify} id={album?.id} name={album?.name} image={album?.images?.[0].url} releaseDate={album?.release_date} type='categoryPlayLists' />
              ))
            }
            </div>
        </div>  
        <div className='container2'>
            <h2>Artists</h2>
            <FavoriteArtists topArtists={SearchResults?.artists?.items} />
        </div>
        <div className='container'>
            <h2>Episodes</h2>
            <div className='albums-container'>
            {
              SearchResultsEp?.items?.map((episode,index)=>(
                index <=4 &&<Album  key={index} spotify={spotify} id={episode?.id} name={episode?.name} image={episode?.images?.[0].url} releaseDate={episode?.release_date} type='episode' />
              ))
            }
            </div>
        </div>   
        <div className='container'>
            <h2>Podcasts</h2>
            <div className='albums-container'>
            {
              SearchResultsSh?.map((show,index)=>(
                index <=4 &&<Album  key={index} spotify={spotify} id={show?.id} name={show?.name} image={show?.images?.[1].url} by={show?.publisher} type='show' />
              ))
            }
            </div>
        </div>   
    </div>
  )
}

export default SearchResults