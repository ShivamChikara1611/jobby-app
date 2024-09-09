import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Cookies from "js-cookie";
import { AiOutlineSearch } from "react-icons/ai";
import Header from "./Header";
import JobItem from "./JobItem"; // Ensure JobItem is used here
import { assets } from "../assets/assets";

const employmentTypesList = [
  { label: "Full Time", employmentTypeId: "FULLTIME" },
  { label: "Part Time", employmentTypeId: "PARTTIME" },
  { label: "Freelance", employmentTypeId: "FREELANCE" },
  { label: "Internship", employmentTypeId: "INTERNSHIP" },
];

const salaryRangesList = [
  { salaryRangeId: "1000000", label: "10 LPA and above" },
  { salaryRangeId: "2000000", label: "20 LPA and above" },
  { salaryRangeId: "3000000", label: "30 LPA and above" },
  { salaryRangeId: "4000000", label: "40 LPA and above" },
];

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const failureViewImg =
  "https://assets.ccbp.in/frontend/react-js/failure-img.png";

const AllJobs = () => {
  const [profileData, setProfileData] = useState([]);
  const [jobsData, setJobsData] = useState([]);
  const [checkboxInputs, setCheckboxInputs] = useState([]);
  const [radioInput, setRadioInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [apiJobsStatus, setApiJobsStatus] = useState(
    apiStatusConstants.initial
  );

  const navigate = useNavigate();

  useEffect(() => {
    onGetProfileDetails();
    onGetJobDetails();
  }, [checkboxInputs, radioInput, searchInput]);

  const onGetProfileDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const jwtToken = Cookies.get("jwt_token");
    const profileApiUrl = "https://apis.ccbp.in/profile";
    const optionsProfile = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    try {
      const responseProfile = await fetch(profileApiUrl, optionsProfile);
      if (responseProfile.ok) {
        const fetchedDataProfile = await responseProfile.json();
        const updatedDataProfile = [
          {
            name: fetchedDataProfile.profile_details.name,
            profileImageUrl:
              fetchedDataProfile.profile_details.profile_image_url,
            shortBio: fetchedDataProfile.profile_details.short_bio,
          },
        ];
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
    const jwtToken = Cookies.get("jwt_token");
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkboxInputs.join(
      ","
    )}&minimum_package=${radioInput}&search=${searchInput}`;
    const optionsJobs = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    try {
      const responseJobs = await fetch(jobsApiUrl, optionsJobs);
      if (responseJobs.ok) {
        const fetchedDataJobs = await responseJobs.json();
        const updatedDataJobs = fetchedDataJobs.jobs.map((eachItem) => ({
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

  const onGetRadioOption = (event) => {
    setRadioInput(event.target.id);
  };

  const onGetInputOption = (event) => {
    const { id } = event.target;
    setCheckboxInputs((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const onChangeInput = (event) => {
    setSearchInput(event.target.value);
  };

  const onSubmitInput = () => {
    onGetJobDetails();
  };

  const renderProfileView = () => {
    if (profileData.length > 0) {
      const { name, profileImageUrl, shortBio } = profileData[0];
      return (
        <div className="flex gap-3 w-full justify-start items-center mb-5 lg:gap-5 lg:my-[50px]">
          <div>
            <img src={profileImageUrl} className="w-[80px] lg:w-[100px]" alt="profile" />
          </div>
          <div className="border p-3 rounded-md">
            <h1 className="text-2xl font-semibold flex items-center gap-1 lg:text-4xl lg:gap-2">{name}<img className="w-5 lg:w-8" src={assets.verified_icon} alt="" /></h1>
            <p className="text-xs text-gray-400 lg:text-lg">{shortBio}</p>
          </div>
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
          <div className="w-full mb-5">
            <button
              className="border border-2 rounded-md text-lg w-full py-2 cursor-pointer hover:bg-yellow-500 hover:border-transparent transition-all duration-300"
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
            <ThreeDots
              type="ThreeDots"
              color="#0b69ff"
              height="50"
              width="50"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderJobsView = () => {
    if (jobsData.length === 0) {
      return (
        <div className="w-full flex flex-col items-center justify-center my-5">
          <img
            className="items-center"
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1 className="text-red-600 text-xl font-semibold mb-2 lg:text-4xl">No jobs found</h1>
          <p className="text-gray-500 text-center lg:text-2xl lg:mt-3">We could not find any jobs. Try other filters.</p>
        </div>
      );
    } else {
      return (
        <ul className="flex flex-wrap gap-5 justify-center items-center mb-8">
          {jobsData.map((eachItem) => (
            <JobItem
              key={eachItem.id}
              jobData={eachItem}
            />
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
          <div className="w-full flex flex-col items-center justify-center my-5">
            <img
              className="items-center mb-3"
              src={failureViewImg}
              alt="failure view"
            />
            <h1 className="text-red-600 text-xl font-semibold mb-2 lg:text-4xl">Oops! Something Went Wrong</h1>
            <p className="text-gray-500 text-center lg:text-2xl lg:mt-3">
              We cannot seem to find the page you are looking for
            </p>
            <div className="items-center my-5">
              <button
                className="border border-2 rounded-md text-lg w-full py-2 cursor-pointer hover:bg-yellow-500 hover:border-transparent transition-all duration-300"
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
            <ThreeDots
              type="ThreeDots"
              color="#0b69ff"
              height="50"
              width="50"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      <div>
        <div>
          {renderProfileStatus()}
          <hr className="border border-gray-700 mb-5"/>
          <h1 className="text-center text-lg font-semibold mb-3">Type of Employment</h1>
          <ul className="flex flex-wrap gap-x-3 gap-y-2 p-3 justify-center">
            {employmentTypesList.map((eachItem) => (
              <li key={eachItem.employmentTypeId} className="hover:border-transparent hover:bg-pink-500 flex gap-1 text-xs border px-2 py-1.5 rounded-md transition-all duration-300 hover:scale-105 cursor-pointer">
                <input className="cursor-pointer"
                  type="checkbox"
                  id={eachItem.employmentTypeId}
                  onChange={onGetInputOption}
                />
                <label className="cursor-pointer"
                  htmlFor={eachItem.employmentTypeId}
                >
                  {eachItem.label}
                </label>
              </li>
            ))}
          </ul>
          <hr className="border border-gray-700 my-5" />
          <h1 className="text-center text-lg font-semibold mb-3">Salary Range</h1>
          <ul className="flex flex-wrap gap-x-3 gap-y-2 p-3 justify-center">
            {salaryRangesList.map((eachItem) => (
              <li key={eachItem.salaryRangeId} className="hover:border-transparent hover:bg-pink-500 flex gap-1 text-xs border px-2 py-1.5 rounded-md transition-all duration-300 hover:scale-105 cursor-pointer">
                <input className="cursor-pointer"
                  type="radio"
                  id={eachItem.salaryRangeId}
                  name="option"
                  onChange={onGetRadioOption}
                />
                <label htmlFor={eachItem.salaryRangeId} className="cursor-pointer">
                  {eachItem.label}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <hr className="border border-gray-700 my-5" />
          <div className="text-center my-8 border border-2 rounded-md flex px-2 py-1.5 text-xs">
            <input
              className="w-full bg-transparent outline-none"
              type="search"
              onChange={onChangeInput}
              placeholder="Search for a job role"
            />
            <button
              className="text-sm text-gray-300"
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
