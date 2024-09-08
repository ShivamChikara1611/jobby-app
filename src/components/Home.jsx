// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { assets } from "../assets/assets";

const Home = () => {
  const navigate = useNavigate();

  const onRedirectToJobs = () => {
    navigate("/jobs");
  };

  return (
    <>
      <Header />
      <div className="h-[80vh] flex flex-col justify-center">
        <div className="flex justify-between items-center border border-2 border-gray-500 rounded-2xl p-10 xl:gap-12 md:gap-8">
          <div>
            <h1 className="xl:mb-5 xl:text-4xl font-semibold md:text-2xl md:mb-2 text-5xl mb-5">
              Find The Job That Fits Your Life
            </h1>
            <p className="xl:text-sm xl:mb-8 md:text-xs md:mb-5 text-lg mb-8">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential.
            </p>
            <button
              className="xl:py-2 xl:px-8 xl:mt-5 rounded-md xl:text-xl md:text-sm md:px-5 md:py-1.5 bg-blue-800 md:mt-0 text-xl px-7 py-3"
              type="button"
              onClick={onRedirectToJobs}
            >
              Find Jobs
            </button>
          </div>
          <img className="hidden md:block xl:w-[500px] rounded-lg md:w-[300px]" src={assets.emps2} alt="" />
        </div>
      </div>
    </>
  );
};

export default Home;
