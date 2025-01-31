import { Link } from 'react-router-dom'

function Logo() {
  return (
    <div className='logo-container'>
          <Link to={'/'} className="logo-link-home"><div className="logo"><img src='../src/images/catlogo.png' alt='catlogo' /></div></Link>
      </div>
  )
}

export default Logo