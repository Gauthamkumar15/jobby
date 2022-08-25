import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const DisplayJobs = props => {
  const {eachItem} = props
  const {id, title, rating, location} = eachItem
  return (
    <Link to={`/jobs/${id}`}>
      <li className="display-job-list">
        <div className="display-job-list-div">
          <div className="display-job-header">
            <img
              className="job-display-image"
              src={eachItem.company_logo_url}
              alt="company logo"
            />
            <div className="display-job-heading-star">
              <h1 className="display-job-heading">{title}</h1>
              <div className="display-job-star">
                <AiFillStar
                  className="display-job-specific-star"
                  fill="#fcc035"
                />

                <p className="display-job-para">{rating}</p>
              </div>
            </div>
          </div>

          <div className="location-and-emptype-main">
            <div className="location-and-emptype-container">
              <div className="location">
                <MdLocationOn />
                <p className="location-and-emptype-para">{location}</p>
              </div>

              <div className="emp-type">
                <BsFillBriefcaseFill />
                <p className="location-and-emptype-para">
                  {eachItem.employment_type}
                </p>
              </div>
            </div>
            <p className="location-and-emptype-para1">
              {eachItem.package_per_annum}
            </p>
          </div>
          <hr className="display-job-horizontal-line" />
          <h1 className="display-job-description-heading">Description</h1>
          <p className="display-job-description">{eachItem.job_description}</p>
        </div>
      </li>
    </Link>
  )
}

export default DisplayJobs
