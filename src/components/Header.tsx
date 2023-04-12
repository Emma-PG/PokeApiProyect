import logo from '../assets/logo2.png'
import {Props} from '../types'

const Header = ({handleSubmit,handleChange}:Props)=>{
    return (
        <header className='d-flex justify-content-between align-items-center col-12 p-3 '>
        <img src={logo} alt="Logo" />
        <form className='d-flex gap-2'>
          <input id='searchBar' type="text" onChange={handleChange} />
          <button onClick={handleSubmit}>Search</button>
        </form>
      </header>
    )
}

export default Header