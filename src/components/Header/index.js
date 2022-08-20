import './index.css'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const onLogoutButtonClicked = () => {
    console.log(Cookies)
    const {history} = props
    console.log(props)
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  return (
    <div className="header-container">
      <div>
        <Link to="/">
          {' '}
          <img
            className="header-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
      </div>
      <div className="header-link-container-lg">
        <Link className="header-link" to="/">
          Home
        </Link>
        <Link className="header-link" to="/jobs">
          Jobs
        </Link>
      </div>
      <button
        onClick={onLogoutButtonClicked}
        className="header-button-lg"
        type="button"
      >
        Logout
      </button>
      <div className="header-link-container-sm">
        <Link className="header-link-sm" to="/">
          <AiFillHome />
        </Link>
        <Link className="header-link-sm" to="/jobs">
          <BsFillBriefcaseFill />
        </Link>
        <button
          onClick={onLogoutButtonClicked}
          className="header-button-sm"
          type="button"
        >
          <FiLogOut />
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
