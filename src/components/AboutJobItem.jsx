import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { MdLocationOn } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { ThreeDots } from "react-loader-spinner";
import Header from "./Header";
import SimilarJobs from "./SimilarJobs";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const AboutJobItem = () => {
  const [jobDataDetails, setJobDataDetails] = useState([]);
  const [similarJobsData, setSimilarJobsData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const { id } = useParams(); // Using useParams to get the job id from the route

  useEffect(() => {
    const getJobData = async () => {
      setApiStatus(apiStatusConstants.inProgress);
      const jwtToken = Cookies.get("jwt_token");
      const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`;
      const optionsJobData = {
        headers: { Authorization: `Bearer ${jwtToken}` },
        method: "GET",
      };

      try {
        const responseJobData = await fetch(jobDetailsApiUrl, optionsJobData);
        if (responseJobData.ok) {
          const fetchedJobData = await responseJobData.json();
          const updatedJobDetailsData = [fetchedJobData.job_details].map(
            (eachItem) => ({
              companyLogoUrl: eachItem.company_logo_url,
              companyWebsiteUrl: eachItem.company_website_url,
              employmentType: eachItem.employment_type,
              id: eachItem.id,
              jobDescription: eachItem.job_description,
              lifeAtCompany: {
                description: eachItem.life_at_company.description,
                imageUrl: eachItem.life_at_company.image_url,
              },
              location: eachItem.location,
              packagePerAnnum: eachItem.package_per_annum,
              rating: eachItem.rating,
              skills: eachItem.skills.map((eachSkill) => ({
                imageUrl: eachSkill.image_url,
                name: eachSkill.name,
              })),
              title: eachItem.title,
            })
          );

          const updatedSimilarJobDetails = fetchedJobData.similar_jobs.map(
            (eachItem) => ({
              companyLogoUrl: eachItem.company_logo_url,
              id: eachItem.id,
              jobDescription: eachItem.job_description,
              location: eachItem.location,
              rating: eachItem.rating,
              title: eachItem.title,
            })
          );

          setJobDataDetails(updatedJobDetailsData);
          setSimilarJobsData(updatedSimilarJobDetails);
          setApiStatus(apiStatusConstants.success);
        } else {
          setApiStatus(apiStatusConstants.failure);
        }
      } catch {
        setApiStatus(apiStatusConstants.failure);
      }
    };

    getJobData();
  }, [id]);

  const renderJobDetailsSuccessView = () => {
    if (jobDataDetails.length >= 1) {
      const {
        companyLogoUrl,
        companyWebsiteUrl,
        employmentType,
        jobDescription,
        lifeAtCompany,
        location,
        packagePerAnnum,
        rating,
        skills,
        title,
      } = jobDataDetails[0];

      return (
        <>
          <div className="mt-8 rounded-lg border border-2 p-5 mb-8">
            <div className="flex items-center gap-5">
              <img
                src={companyLogoUrl}
                className="w-[100px]"
                alt="job details company logo"
              />
              <div>
                <h1 className="text-lg font-semibold text-gray-200">{title}</h1>
                <div className="flex gap-0.5 items-center text-gray-400 text-xs">
                  <AiFillStar />
                  <p>{rating}</p>
                </div>
                <div className="flex items-center text-sm">
                  <MdLocationOn />
                  <p>{location}</p>
                </div>
                <div className="flex gap-1 text-sm">
                  <p className="text-gray-300">{employmentType}</p>
                  <p>{packagePerAnnum}</p>
                </div>
              </div>
            </div>

            <hr className="border border-gray-700 my-3"/>

            <div className="mb-8">
              <div className="flex items-center gap-3">
                <h1 className="font-semibold text-xl">Description</h1>
                <a href={companyWebsiteUrl} className="flex items-center text-xs gap-0.5 text-blue-600">
                  Visit <BiLinkExternal />
                </a>
              </div>
              <p className="text-xs">{jobDescription}</p>
            </div>


            <h1 className="text-lg mb-3">Skills</h1>
            <ul className="flex flex-wrap gap-2 mb-8">
              {skills.map((eachItem) => (
                <li key={eachItem.name}>
                  <img className="max-w-[50px]" src={eachItem.imageUrl} alt={eachItem.name} />
                  <p className="text-[8px] text-center mt-0.5">{eachItem.name}</p>
                </li>
              ))}
            </ul>
            <div>
              <div className="mb-8">
                <h1 className="text-lg mb-3">Life at Company</h1>
                <p className="text-xs">{lifeAtCompany.description}</p>
              </div>
              <img src={lifeAtCompany.imageUrl} alt="life at company" />
            </div>
          </div>
          <h1 className="text-3xl mb-5 text-center font-semibold">Similar Jobs</h1>
          <ul className="flex flex-wrap gap-5 justify-center items-center mb-8">
            {similarJobsData.map((eachItem) => (
              <SimilarJobs
                key={eachItem.id}
                similarJobData={eachItem}
                employmentType={employmentType}
              />
            ))}
          </ul>
        </>
      );
    }
    return null;
  };

  const renderJobFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="text-red-600 text-xl font-semibold mb-2 lg:text-4xl mt-3">Oops! Something Went Wrong</h1>
      <p className="text-gray-500 text-center lg:text-2xl lg:mt-3">We cannot seem to find the page you are looking for.</p>
      <div>
        <button
        className="border border-2 rounded-md text-lg w-full py-2 cursor-pointer hover:bg-yellow-500 hover:border-transparent transition-all duration-300 mt-5"
          type="button"
          onClick={() => setApiStatus(apiStatusConstants.initial)}
        >
          Retry
        </button>
      </div>
    </div>
  );

  const renderJobLoadingView = () => (
    <div testid="loader">
      <ThreeDots type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  const renderJobDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderJobDetailsSuccessView();
      case apiStatusConstants.failure:
        return renderJobFailureView();
      case apiStatusConstants.inProgress:
        return renderJobLoadingView();
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div>{renderJobDetails()}</div>
    </>
  );
};

export default AboutJobItem;
