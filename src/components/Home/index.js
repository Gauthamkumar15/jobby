import './index.css'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'

class Home extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <>
        <Header />
        <div>
          <h1>Find The Job That Fits Your Life</h1>
          <p>
            Millions of people are searching for jobs, information, company
            reviews. Find the job that fits your abilities and potential.
          </p>
        </div>
      </>
    )
  }
}

export default Home
