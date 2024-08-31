import React from "react";
import img from "../../assets/about.png";

function AboutUs() {
  return (
    <div className="min-h-screen sm:px-[120px] px-6 bg-[#00221c]">
      <header className="flex justify-between items-center py-6">
        <div className="text-white bg-[#0E2442] py-4 px-[36px]">
          <h1 className="text-xl">LOGO</h1>
        </div>
      </header>
      <div className="grid sm:grid-cols-2 justify-between">
        <div className="grid-cols-1 flex items-center justify-center">
          <img className="object-cover" src={img} alt="" />
        </div>
        <div className="grid-cols-1 w-full">
          <div className="text-white">
            <h3 className="text-[28px] font-bold">About Us:</h3>
            <p className="sm:text-[18px] ">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehen"
            </p>
          </div>
          <div className="text-white mt-[30px]">
            <h3 className="text-[28px] font-bold">What we offer? Price plan</h3>
            <p className="sm:text-[18px] font-bold text-sm">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
          </div>
          <div className="text-white mt-[30px]">
            <h3 className="text-[28px] font-bold">Testimonials:</h3>
            <p className="sm:text-[16px] mt-1">
              <span className="underline">“Best Shift Roster SaaS ever!”</span>{" "}
              - James, VP of HR, WW Co.{" "}
            </p>
            <p className="text-[16px]">
              <span className="underline"> “A leader in their space!”</span> -
              Ronald, CIO, AWS{" "}
            </p>
          </div>
          <div className="sm:flex-row flex-col justify-center lg:justify-start mt-10 sm:space-x-4 space-y-4">
            <button className="bg-[#0E2442] text-white py-2 px-9 ">
              Register
            </button>
            <button className="bg-[#2E2E41] text-white py-2 px-9 ">
              Login
            </button>
            <button className="bg-[#0E2442] text-white py-2 px-9 ">
              Enquiries
            </button>
            <button className="bg-[#2E2E41] text-white py-2 px-9 ">
              About Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
