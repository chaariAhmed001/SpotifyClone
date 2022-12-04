import React, { useEffect,useState} from 'react'
import { SearchCategory } from '../../Components/index'
import { useStateValue } from '../../Context/StateProvider';
import './Search.css'

const Search = ({spotify}) => {
    const [{ token }, dispatch] = useStateValue();
    const [categorys, setCategorys] = useState([])
    useEffect(() => {
      spotify.getCategories().then((data) => setCategorys(data?.categories?.items));
      dispatch({
        type:"SET_SEARCHINPUT",
        searchInput : true
      })
    }, [token,dispatch])
  return (
    <div className='categorys-container'>
        {categorys.map((categoty)=>(
            categoty?.name !== 'Top Lists' &&<SearchCategory key={categoty?.id} id={categoty?.id} spotify={spotify} title={categoty?.name === "Dance/Electronic" ? 'Dance/Elec': categoty?.name} img={categoty?.icons?.[0].url}/>
        )
        )
        }
        
    </div>
  )
}

export default Search