import './index.css'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'

class Home extends Component {
  onFindJobs = () => {
    const {history} = this.props
    history.replace('/jobs')
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <>
        <Header />
        <div className="home-container">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-para">
            Millions of people are searching for jobs, information, company
            reviews. Find the job that fits your abilities and potential.
          </p>
          <button
            onClick={this.onFindJobs}
            type="button"
            className="home-button"
          >
            Find Jobs
          </button>
        </div>
      </>
    )
  }
}

export default Home
