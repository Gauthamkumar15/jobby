import './index.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import {Component} from 'react'
import Header from '../Header'

class JobItemDetails extends Component {
  state = {
    jobDetailsData: {},
    jobDetailsSuccess: false,
    isLoading: true,
    jobDetailsFailure: false,
  }

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
    } else {
      this.setState({jobDetailsFailure: true, isLoading: false})
    }
  }

  render() {
    const {
      jobDetailsData,
      jobDetailsSuccess,
      isLoading,
      jobDetailsFailure,
    } = this.state
    const jobDetails = jobDetailsData.job_details
    const similarJobs = jobDetailsData.similar_jobs
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      const {history} = this.props
      history.replace('/login')
    }

    return (
      <>
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
          {jobDetailsFailure && (
            <div className="job-item-details-failure">
              <img
                className="job-item-details-failure-image"
                src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                alt=" failure view"
              />
              <h1>Oops! Something Went Wrong</h1>
              <p>We cannot seem to find the page you are looking for.</p>
              <button
                onClick={this.loadJobDetails}
                className="job-item-details-failure-button"
                type="button"
              >
                Retry
              </button>
            </div>
          )}
          {jobDetailsSuccess && (
            <>
              <div className="job-item-details-specific-bg-container">
                <div className="job-item-details-logo-heading-star-rating-container">
                  <img
                    className="job-item-details-logo"
                    src={jobDetails.company_logo_url}
                    alt="job details company logo"
                  />
                  <div className="job-item-details-title-star-rating-container">
                    <h1 className="job-item-details-title">
                      {jobDetails.title}
                    </h1>
                    <div className="job-item-details-star-rating">
                      <AiFillStar
                        className="job-item-details-star"
                        fill="#fcc035"
                      />
                      <p className="job-item-details-rating">
                        {jobDetails.rating}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="job-item-details-location-employment-package">
                  <div className="job-item-details-location-employment">
                    <MdLocationOn />
                    <p className="job-item-details-location-employment-margin">
                      {jobDetails.location}
                    </p>

                    <BsFillBriefcaseFill className="job-item-details-location-employment-margin" />
                    <p className="job-item-details-location-employment-margin">
                      {jobDetails.employment_type}
                    </p>
                  </div>
                  <p className="job-item-details-package">
                    {jobDetails.package_per_annum}
                  </p>
                </div>
                <hr className="job-item-details-horizontal-line" />
                <div className="job-item-details-description">
                  <div className="job-item-details-description-heading-external-link">
                    <h1 className="job-item-details-heading">Description</h1>

                    <div>
                      <button
                        className="job-item-details-description-external-link"
                        type="button"
                      >
                        <a
                          className="job-item-details-description-external-link-anchor"
                          href={jobDetails.company_website_url}
                        >
                          <p className="job-item-details-description-external-link-para">
                            Visit
                          </p>
                          <FiExternalLink
                            stroke="#5a74cd"
                            className="job-item-details-description-external-link-icon"
                          />
                        </a>
                      </button>
                    </div>
                  </div>

                  <p className="job-item-details-description-details">
                    {jobDetails.job_description}
                  </p>
                </div>
                <div className="job-item-details-skills-container">
                  <h1 className="job-item-details-heading">Skills</h1>
                  <ul className="job-item-details-skills">
                    {jobDetails.skills.map(eachItem => (
                      <li
                        className="job-item-details-specific-skill"
                        key={eachItem.name}
                      >
                        <img
                          className="job-item-details-skill-image"
                          src={eachItem.image_url}
                          alt={eachItem.name}
                        />
                        <p className="job-item-details-skill-name">
                          {eachItem.name}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="job-item-details-life-at-company">
                  <h1 className="job-item-details-heading">Life at Company</h1>
                  <div className="job-item-details-life-description-image">
                    <p className="job-item-details-life-description">
                      {jobDetails.life_at_company.description}
                    </p>
                    <img
                      className="job-item-details-life-image"
                      src={jobDetails.life_at_company.image_url}
                      alt="life at company"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h1 className="job-item-details-similar-jobs-heading">
                  Similar Jobs
                </h1>
                <ul className="job-item-details-similar-jobs-container">
                  {similarJobs.map(eachItem => (
                    <li
                      className="job-item-details-similar-jobs-specific"
                      key={eachItem.id}
                    >
                      <Link to={`/jobs/${eachItem.id}`}>
                        <div className="job-item-details-similar-jobs-specific-image-title-star-rating">
                          <img
                            className="job-item-details-similar-jobs-specific-image"
                            src={eachItem.company_logo_url}
                            alt="similar job company logo"
                          />
                          <div className="job-item-details-similar-jobs-specific-title-star-rating">
                            <h1 className="job-item-details-similar-jobs-specific-title">
                              {eachItem.title}
                            </h1>
                            <div className="job-item-details-similar-jobs-specific-star-rating">
                              <AiFillStar
                                className="job-item-details-similar-jobs-specific-star"
                                fill="#fcc035"
                              />
                              <p className="job-item-details-similar-jobs-specific-rating">
                                {eachItem.rating}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h1 className="job-item-details-heading">
                            Description
                          </h1>
                          <p className="job-item-details-similar-jobs-specific-description">
                            {eachItem.job_description}
                          </p>
                          <div className="job-item-details-similar-jobs-specific-location-emptype">
                            <MdLocationOn />
                            <p className="job-item-details-similar-jobs-specific-location-emptype-para">
                              {eachItem.location}
                            </p>

                            <BsFillBriefcaseFill className="job-item-details-similar-jobs-specific-briefcase" />
                            <p className="job-item-details-similar-jobs-specific-location-emptype-para">
                              {eachItem.employment_type}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </>
    )
  }
}

export default JobItemDetails
