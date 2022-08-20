import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import DisplayJobs from '../DisplayJobs'

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

const employmentList = []

class Jobs extends Component {
  state = {
    profileData: {},
    profileSuccess: false,
    isLoadingProfile: true,
    isLoadingJobs: true,
    profileFailure: false,
    search: '',
    employment: '',
    minPackage: '',
    jobsList: [],
    jobSuccess: false,
    jobFailure: false,
    jobsListLengthIsZero: false,
  }

  componentDidMount() {
    this.getProfile()
    this.onSearch()
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
      this.setState({
        profileData: data,
        profileSuccess: true,
        isLoadingProfile: false,
      })
    } else if (response.status_code === 404) {
      this.setState({
        profileSuccess: false,
        isLoadingProfile: false,
        profileFailure: true,
      })
    }
  }

  onSearchChange = event => {
    this.setState({search: event.target.value})
  }

  onSearchLoading = () => {
    this.setState(
      {isLoadingJobs: true, jobsListLengthIsZero: false},
      this.onSearch,
    )
  }

  onSearch = async () => {
    const {search, minPackage, employment} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${employment}&minimum_package=${minPackage}&search=${search}`,
      options,
    )
    const data = await response.json()
    console.log(response)
    if (response.ok === true) {
      if (data.jobs.length > 0) {
        this.setState({
          jobsList: data.jobs,
          isLoadingJobs: false,
          jobSuccess: true,
          jobsListLengthIsZero: false,
        })
      } else if (data.jobs.length === 0) {
        this.setState({
          jobsList: data.jobs,
          isLoadingJobs: false,
          jobSuccess: true,
          jobsListLengthIsZero: true,
        })
      }
    } else {
      this.setState({isLoadingJobs: false, jobFailure: true})
    }
  }

  onChangeEmployment = event => {
    if (event.target.checked === true) {
      employmentList.push(event.target.value)
    } else if (event.target.checked === false) {
      const index = employmentList.indexOf(event.target.value)
      employmentList.splice(index, 1)
    }
    const string = employmentList.join(',')
    this.setState({employment: string}, this.onSearchLoading)
  }

  onChangeSalary = event => {
    this.setState({minPackage: event.target.value}, this.onSearchLoading)
  }

  render() {
    const {
      profileData,
      profileSuccess,
      isLoadingProfile,
      profileFailure,
      jobsList,
      isLoadingJobs,
      jobSuccess,
      jobFailure,
      jobsListLengthIsZero,
    } = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="profile-and-filter">
            {isLoadingProfile && (
              <div className="loader-container justify-loader" testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            )}
            {profileFailure && (
              <div className="retry-button-container">
                <button
                  onClick={this.getProfile}
                  className="retry-button"
                  type="button"
                >
                  Retry
                </button>
              </div>
            )}
            {profileSuccess && !isLoadingProfile && (
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
                    <input
                      value={eachItem.employmentTypeId}
                      onChange={this.onChangeEmployment}
                      className="employment-check"
                      type="checkbox"
                    />
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
                    <input
                      onChange={this.onChangeSalary}
                      value={eachItem.salaryRangeId}
                      name="salary"
                      className="employment-check"
                      type="radio"
                    />
                    <p> {eachItem.label}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="jobs-container-2">
            <div className="search-and-jobs">
              <div>
                <input
                  onChange={this.onSearchChange}
                  className="search"
                  type="search"
                  placeholder="Search"
                />
              </div>
              <div>
                <button
                  className="search-button"
                  type="button"
                  testid="searchButton"
                  onClick={this.onSearchLoading}
                >
                  <BsSearch />
                </button>
              </div>
            </div>
            {isLoadingJobs && (
              <div className="loader-container justify-loader" testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            )}
            {!isLoadingJobs && jobSuccess && !jobsListLengthIsZero && (
              <ul className="job-display-list">
                {jobsList.map(eachItem => (
                  <DisplayJobs key={eachItem.id} eachItem={eachItem} />
                ))}
              </ul>
            )}
            {jobsListLengthIsZero && (
              <div className="jobs-not-found">
                <img
                  className="jobs-not-found-image"
                  src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
                  alt="no jobs"
                />
                <h1>No Jobs Found</h1>
                <p>We could not find any jobs. Try other filters.</p>
              </div>
            )}
            {jobFailure && (
              <div className="jobs-api-failure">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                  alt="failure view"
                />
                <h1>Oops! Something Went Wrong</h1>
                <p>We cannot seem to find the page you are looking for.</p>
                <button
                  onClick={this.onSearchLoading}
                  className="jobs-api-failure-button"
                  type="button"
                >
                  Retry
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
