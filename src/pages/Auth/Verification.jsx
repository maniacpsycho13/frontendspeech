import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { ACCOUNT_TYPE } from "../../utils/constants";

const Verification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, accountType } = location.state || {};
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Ensure only the last digit is taken
    setOtp(newOtp);

    // Automatically focus on the next input field
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpString = otp.join(""); // Combine the OTP digits into a single string

    const endpoint =
      accountType === ACCOUNT_TYPE.STUDENT
        ? "https://speechbk-asghe5g9d2fsfydr.eastus2-01.azurewebsites.net/api/v1/signup/verify-otp"
        : "https://speechbk-asghe5g9d2fsfydr.eastus2-01.azurewebsites.net/api/v1/signup/teacher/verify-otp";

    try {
      toast.loading("Verifying OTP...");
      const response = await axios.post(endpoint, { email, otp: otpString });

      toast.dismiss();
      toast.success("Account verified successfully!");
      console.log("Response:", response.data);

      // Save token and navigate
      localStorage.setItem("token", response.data.anotherRouteResponse.token);
      if (accountType === ACCOUNT_TYPE.STUDENT) {
        localStorage.setItem("studentId", response.data.anotherRouteResponse.student.id);
        localStorage.setItem("name", response.data.anotherRouteResponse.student.name);
        localStorage.setItem("email", response.data.anotherRouteResponse.student.email);
        localStorage.setItem("uniqueId", response.data.anotherRouteResponse.student.teacherId);
        localStorage.setItem("teacherId", null);
        navigate("/dashboard-student/account");
      } else {
        localStorage.setItem("teacherId", response.data.anotherRouteResponse.teacher.id);
        localStorage.setItem("name", response.data.anotherRouteResponse.teacher.name);
        localStorage.setItem("email", response.data.anotherRouteResponse.teacher.email);
        localStorage.setItem("uniqueId", response.data.anotherRouteResponse.teacher.uniqueId);
        localStorage.setItem("studentId", null);
        navigate("/dashboard-teacher/account");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "OTP verification failed.");
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Verify OTP</h1>
      <form onSubmit={handleVerify} className="w-full max-w-sm">
        <div className="flex justify-between mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, index)}
              className="w-12 h-12 text-center text-xl border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default Verification;
