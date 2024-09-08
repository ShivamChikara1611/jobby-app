import React from 'react';
import { MdLocationOn } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';

const SimilarJobs = ({ similarJobData, employmentType }) => {
  const {
    companyLogoUrl,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobData;

  return (
    <li className="border border-2 rounded-md flex gap-3 p-4 lg:max-w-[380px] lg:max-h-[240px] md:gap-5 overflow-hidden">
      <div className="img-job-title-container">
        <img
          className="mb-4"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="text-md my-1 flex gap-3 items-start">
          <h1 className="text-sm">{title}</h1>
          <div className="flex gap-1 items-center text-gray-300">
            <AiFillStar />
            <p>{rating}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-gray-400 text-xs">
          <MdLocationOn/>
          <p>{location}</p>
        </div>

        <div className="mt-3 text-sm">
          <p className="text-gray-400">{employmentType}</p>
        </div>

      </div>


      <div className="text-xs max-w-[70%]">
        <h1 className="text-lg text-gray-200 mb-2">Description</h1>
        <p className="text-gray-400">{jobDescription}</p>
      </div>
    </li>
  );
};

export default SimilarJobs;