import './index.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Component} from 'react'
import Header from '../Header'

class JobItemDetails extends Component {
  state = {jobDetailsData: {}, jobDetailsSuccess: false, isLoading: true}

  componentDidMount() {
    this.loadJobDetails()
  }

  loadJobDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const options = {
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.setState({
        jobDetailsData: data,
        jobDetailsSuccess: true,
        isLoading: false,
      })
    }
  }

  render() {
    const {jobDetailsData, jobDetailsSuccess, isLoading} = this.state
    const jobDetails = jobDetailsData.job_details
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      const {history} = this.props
      history.replace('/login')
    }

    return (
      <div className="job-item-details-bg-container">
        <Header />
        {isLoading && (
          <div
            className="loader-container job-item-details-justify-loader"
            testid="loader"
          >
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )}
        {jobDetailsSuccess && (
          <div className="job-item-details-specific-bg-container">
            <div className="job-item-details-logo-heading-star-rating-container">
              <img
                className="job-item-details-logo"
                src={jobDetails.company_logo_url}
                alt="job details company logo"
              />
              <div className="job-item-details-title-star-rating-container">
                <h1 className="job-item-details-title">{jobDetails.title}</h1>
                <div className="job-item-details-star-rating">
                  <AiFillStar
                    className="job-item-details-star"
                    fill="#fcc035"
                  />
                  <p className="job-item-details-rating">{jobDetails.rating}</p>
                </div>
              </div>
            </div>
            <div>
              <div>
                <MdLocationOn />
                <p>{jobDetails.location}</p>
              </div>
              <div>
                <BsFillBriefcaseFill />
                <p>{jobDetails.employment_type}</p>
              </div>
              <p>{jobDetails.package_per_annum}</p>
            </div>
            <hr />
            <div>
              <h1>Description</h1>
              <p>{jobDetails.job_description}</p>
            </div>
            <div>
              <h1>Skills</h1>
              <ul>
                {jobDetails.skills.map(eachItem => (
                  <li>
                    <img src={eachItem.image_url} alt={eachItem.name} />
                    <p>{eachItem.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h1>Life at Company</h1>
              <div>
                <p>{jobDetails.life_at_company.description}</p>
                <img
                  src={jobDetails.life_at_company.image_url}
                  alt="life at company"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default JobItemDetails
