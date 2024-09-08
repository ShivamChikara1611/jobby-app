import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import Cookies from 'js-cookie';
import { AiOutlineSearch } from 'react-icons/ai';
import Header from './Header';
import JobItem from './JobItem';

const employmentTypesList = [
  { label: 'Full Time', employmentTypeId: 'FULLTIME' },
  { label: 'Part Time', employmentTypeId: 'PARTTIME' },
  { label: 'Freelance', employmentTypeId: 'FREELANCE' },
  { label: 'Internship', employmentTypeId: 'INTERNSHIP' },
];

const salaryRangesList = [
  { salaryRangeId: '1000000', label: '10 LPA and above' },
  { salaryRangeId: '2000000', label: '20 LPA and above' },
  { salaryRangeId: '3000000', label: '30 LPA and above' },
  { salaryRangeId: '4000000', label: '40 LPA and above' },
];

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const failureViewImg = 'https://assets.ccbp.in/frontend/react-js/failure-img.png';

const AllJobs = () => {
  const [profileData, setProfileData] = useState([]);
  const [jobsData, setJobsData] = useState([]);
  const [checkboxInputs, setCheckboxInputs] = useState([]);
  const [radioInput, setRadioInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [apiJobsStatus, setApiJobsStatus] = useState(apiStatusConstants.initial);

  const navigate = useNavigate();

  useEffect(() => {
    onGetProfileDetails();
    onGetJobDetails();
  }, [checkboxInputs, radioInput, searchInput]);

  const onGetProfileDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const jwtToken = Cookies.get('jwt_token');
    const profileApiUrl = 'https://apis.ccbp.in/profile';
    const optionsProfile = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };
    try {
      const responseProfile = await fetch(profileApiUrl, optionsProfile);
      if (responseProfile.ok) {
        const fetchedDataProfile = await responseProfile.json();
        const updatedDataProfile = [{
          name: fetchedDataProfile.profile_details.name,
          profileImageUrl: fetchedDataProfile.profile_details.profile_image_url,
          shortBio: fetchedDataProfile.profile_details.short_bio,
        }];
        setProfileData(updatedDataProfile);
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const onGetJobDetails = async () => {
    setApiJobsStatus(apiStatusConstants.inProgress);
    const jwtToken = Cookies.get('jwt_token');
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkboxInputs.join(',')}&minimum_package=${radioInput}&search=${searchInput}`;
    const optionsJobs = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };
    try {
      const responseJobs = await fetch(jobsApiUrl, optionsJobs);
      if (responseJobs.ok) {
        const fetchedDataJobs = await responseJobs.json();
        const updatedDataJobs = fetchedDataJobs.jobs.map(eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          employmentType: eachItem.employment_type,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          location: eachItem.location,
          packagePerAnnum: eachItem.package_per_annum,
          rating: eachItem.rating,
          title: eachItem.title,
        }));
        setJobsData(updatedDataJobs);
        setApiJobsStatus(apiStatusConstants.success);
      } else {
        setApiJobsStatus(apiStatusConstants.failure);
      }
    } catch {
      setApiJobsStatus(apiStatusConstants.failure);
    }
  };

  const onGetRadioOption = event => {
    setRadioInput(event.target.id);
  };

  const onGetInputOption = event => {
    const { id } = event.target;
    setCheckboxInputs(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const onChangeInput = event => {
    setSearchInput(event.target.value);
  };

  const onSubmitInput = () => {
    onGetJobDetails();
  };

  const renderProfileView = () => {
    if (profileData.length > 0) {
      const { name, profileImageUrl, shortBio } = profileData[0];
      return (
        <div className="profile-container">
          <img src={profileImageUrl} className="profile-icon" alt="profile" />
          <h1 className="profile-name">{name}</h1>
          <p className="profile-description">{shortBio}</p>
        </div>
      );
    }
    return null;
  };

  const renderProfileStatus = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProfileView();
      case apiStatusConstants.failure:
        return (
          <div className="failure-button-container">
            <button
              className="failure-button"
              type="button"
              onClick={onGetProfileDetails}
            >
              Retry
            </button>
          </div>
        );
      case apiStatusConstants.inProgress:
        return (
          <div className="loader-container" testid="loader">
            <ThreeDots type="ThreeDots" color="#0b69ff" height="50" width="50" />
          </div>
        );
      default:
        return null;
    }
  };

  const renderJobsView = () => {
    if (jobsData.length === 0) {
      return (
        <div className="no-jobs-container">
          <img
            className="no-jobs-img"
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1>No jobs found</h1>
          <p>We could not find any jobs. Try other filters.</p>
        </div>
      );
    } else {
      return (
        <ul className="ul-job-items-container">
          {jobsData.map(eachItem => (
            <ThreeDots key={eachItem.id} jobData={eachItem} />
          ))}
        </ul>
      );
    }
  };

  const renderJobsStatus = () => {
    switch (apiJobsStatus) {
      case apiStatusConstants.success:
        return renderJobsView();
      case apiStatusConstants.failure:
        return (
          <div className="failure-img-button-container">
            <img className="failure-img" src={failureViewImg} alt="failure view" />
            <h1 className="failure-heading">Oops! Something Went Wrong</h1>
            <p className="failure-paragraph">
              We cannot seem to find the page you are looking for
            </p>
            <div className="jobs-failure-button-container">
              <button
                className="failure-button"
                type="button"
                onClick={onGetJobDetails}
              >
                Retry
              </button>
            </div>
          </div>
        );
      case apiStatusConstants.inProgress:
        return (
          <div className="loader-container" testid="loader">
            <ThreeDots type="ThreeDots" color="#0b69ff" height="50" width="50" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      <div className="jobs-page-container">
        <div className="profile-filter-section">
          {renderProfileStatus()}
          <hr className="hr-line" />
          <h1 className="filter-heading">Type of Employment</h1>
          <ul className="ul-container">
            {employmentTypesList.map(eachItem => (
              <li key={eachItem.employmentTypeId} className="li-item">
                <input
                  type="checkbox"
                  id={eachItem.employmentTypeId}
                  onChange={onGetInputOption}
                />
                <label
                  htmlFor={eachItem.employmentTypeId}
                  className="label-text"
                >
                  {eachItem.label}
                </label>
              </li>
            ))}
          </ul>
          <hr className="hr-line" />
          <h1 className="filter-heading">Salary Range</h1>
          <ul className="ul-container">
            {salaryRangesList.map(eachItem => (
              <li key={eachItem.salaryRangeId} className="li-item">
                <input
                  type="radio"
                  id={eachItem.salaryRangeId}
                  name="option"
                  onChange={onGetRadioOption}
                />
                <label
                  htmlFor={eachItem.salaryRangeId}
                  className="label-text"
                >
                  {eachItem.label}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="jobs-section">
          <div className="search-input-container">
            <input
              className="search-input"
              type="search"
              onChange={onChangeInput}
            />
            <button
              className="search-button"
              type="button"
              testid="searchButton"
              onClick={onSubmitInput}
            >
              <AiOutlineSearch className="search-icon" />
            </button>
          </div>

          {renderJobsStatus()}
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
