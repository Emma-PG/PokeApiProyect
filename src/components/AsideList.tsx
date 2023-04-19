import {useEffect,useState } from 'react'
import {ElementProps,Props} from '../types'


const AsideList = ({handleClick}:Props)=>{
    const [listP, setListP] = useState([])

    useEffect(() => {
        const abortController = new AbortController()
    
        fetchList({ signal: abortController.signal })
          .then(data => {
            setListP(data.results)
          })
    
        return () => {
          abortController.abort()
        }
      }, [])

      const fetchList = async ({ signal }: RequestInit) => {
        return await fetch('https://pokeapi.co/api/v2/pokemon?limit=1200&offset=0', {
          signal
        }).then(res => res.json())
      }

    return(
        <aside className='col-3 col-lg-2 p-3 overflow-auto List'>
        <h3 className='text-center'>Pokemon 0 - 150</h3>
        <ul>
          {
            listP?.map((ele: ElementProps): JSX.Element => {
              return (
                <li
                  className='PokemonName'
                  key={ele.name}
                  onClick={handleClick}>
                  {
                    ele.name.slice(0, 1).toUpperCase() + ele.name.slice(1)
                  }
                </li>
              )
            }
            )
          }
        </ul>
      </aside>
    )
}

export default AsideList