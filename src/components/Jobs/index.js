import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import {BiSearch} from 'react-icons/bi'
import Header from '../Header'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {profileData: {}, profileSuccess: false}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.setState({profileData: data, profileSuccess: true})
    }
  }

  render() {
    const {profileData, profileSuccess} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="profile-and-filter">
            {profileSuccess && (
              <div className="profile-background">
                <img
                  className="profile-image"
                  src={profileData.profile_details.profile_image_url}
                  alt="profile"
                />
                <h1 className="profile-name">
                  {profileData.profile_details.name}
                </h1>
                <p className="profile-info">
                  {profileData.profile_details.short_bio}
                </p>
              </div>
            )}
            <hr className="horizontal-line" />

            <p>Type of Employment</p>

            <ul className="employment-list">
              {employmentTypesList.map(eachItem => (
                <li key={eachItem.employmentTypeId}>
                  <div className="check-and-para">
                    <input className="employment-check" type="checkbox" />
                    <p> {eachItem.label}</p>
                  </div>
                </li>
              ))}
            </ul>
            <hr className="horizontal-line" />
            <p>Salary Range</p>

            <ul className="employment-list">
              {salaryRangesList.map(eachItem => (
                <li key={eachItem.salaryRangeId}>
                  <div className="check-and-para">
                    <input className="employment-check" type="radio" />
                    <p> {eachItem.label}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="search-and-jobs">
            <input className="search" type="search" placeholder="Search" />

            <button className="search-button" type="button">
              <BiSearch />
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
