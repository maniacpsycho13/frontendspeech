import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { kidProfile } from '../../../../assets/common';
import toast, { Toaster } from 'react-hot-toast';

const TeacherAllStudents = () => {
  const [students, setStudents] = useState([]); 
  const [students2, setStudents2] = useState([]); 
  const [selectedStudent, setSelectedStudent] = useState(null); 
 
  const [studentDetails, setStudentDetails] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const uniqueId = localStorage.getItem('uniqueId');

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        toast.loading('Fetching students...');
        const response = await axios.get(
          `https://speechbk-asghe5g9d2fsfydr.eastus2-01.azurewebsites.net/api/v1/data/student/data/${uniqueId}/Azure-001`
        );
        toast.dismiss();
        toast.success('Students fetched successfully!');
        setStudents(response.data); // Correctly set students from API response
      } catch (error) {
        toast.dismiss();
        toast.error('Error fetching students!');
        console.error('Error fetching students:', error);
      }
    };

    if (uniqueId) fetchStudents();
  }, [uniqueId]);
  useEffect(() => {
    const fetchStudents2 = async () => {
      try {
        toast.loading('Fetching students...');
        const response2 = await axios.get(
          `https://speechbk-asghe5g9d2fsfydr.eastus2-01.azurewebsites.net/api/v1/data/student/data/${uniqueId}/Custom-001`
        );
        toast.dismiss();
        toast.success('Students fetched successfully!');
        setStudents2(response2.data); // Correctly set students from API response
      } catch (error) {
        toast.dismiss();
        toast.error('Error fetching students!');
        console.error('Error fetching students:', error);
      }
    };

    if (uniqueId) fetchStudents2();
  }, [uniqueId]);

  // Fetch student additional details (completeness, pronunciation, fluency, etc.)
  const fetchStudentDetails = async (id) => {
    try {
      toast.loading('Fetching student details...');
      const response = await axios.get(
        `https://speechbk-asghe5g9d2fsfydr.eastus2-01.azurewebsites.net/api/v1/level/data/student/${id}`
      );
      toast.dismiss();
      toast.success('Student details fetched successfully!');
      setStudentDetails(response.data); // Set the student details data
    } catch (error) {
      toast.dismiss();
      toast.error('Error fetching student details!');
      console.error('Error fetching student details:', error);
    }
  };

  // Open modal with selected student details
  const openModal = (student) => {
    setSelectedStudent(student); // Set the selected student directly
    fetchStudentDetails(student.id); // Fetch additional student details
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setStudentDetails(null); // Reset details when modal is closed
    setIsModalOpen(false);
  };

  return (
    <div>
      <Toaster />
      <h2 className="text-3xl font-bold text-center">List Of Students</h2>
      <div className='text-2xl font-bold mt-4 text-[#5702CE] '>Azure Student Cards</div>
      <div className="flex flex-wrap gap-12 mt-3">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex flex-wrap pl-4 py-3 boxgradient w-[22rem] h-[13rem] overflow-hidden relative"
          >
            <div className="flex w-full gap-6 pr-4">
              <div>
                <img
                  src={student.profile || kidProfile}
                  alt="profile"
                  width={72}
                  height={72}
                  className="rounded-full border-[4px] border-[#6F52CE] p-[2px]"
                />
              </div>
              <div className="text-[#5702CE] font-extrabold text-[24px] mt-2">
                {student.name || 'N/A'}
              </div>
            </div>
            <div>
              <p className="text-white font-medium">Accuracy: {student.accuracy}%</p>
            </div>
            <p className="absolute text-[263px] text-white font-extrabold opacity-30 transform translate-x-[170px] -translate-y-[50px]">
              {/* {student.highestLevel} */} 1
            </p>
            <button
              onClick={() => openModal(student)}
              className="absolute transform translate-x-[250px] translate-y-[140px] px-4 py-2 bg-[#6920CF] rounded-2xl text-white font-medium hover:bg-[#5420CF] cursor-pointer"
            >
              View
            </button>
          </div>
        ))}
      </div>

      <div className='text-2xl font-bold mt-8 text-[#5702CE] '>
        Custom Student Card
      </div>
      <div className="flex flex-wrap gap-12 mt-3">
        {students2.map((student) => (
          <div
            key={student.id}
            className="flex flex-wrap pl-4 py-3 boxgradient2 w-[22rem] h-[13rem] overflow-hidden relative"
          >
            <div className="flex w-full gap-6 pr-4">
              <div>
                <img
                  src={student.profile || kidProfile}
                  alt="profile"
                  width={72}
                  height={72}
                  className="rounded-full border-[4px] border-[#6F52CE] p-[2px]"
                />
              </div>
              <div className="text-[#5702CE] font-extrabold text-[24px] mt-2">
                {student.name || 'N/A'}
              </div>
            </div>
            <div>
              <p className="text-white font-medium">Accuracy: {student.accuracy}%</p>
            </div>
            <p className="absolute text-[263px] text-white font-extrabold opacity-30 transform translate-x-[170px] -translate-y-[50px]">
              {/* {student.highestLevel} */}1
            </p>
            <button
              onClick={() => openModal(student)}
              className="absolute transform translate-x-[250px] translate-y-[140px] px-4 py-2 bg-[#6920CF] rounded-2xl text-white font-medium hover:bg-[#5420CF] cursor-pointer"
            >
              View
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gradient-to-r from-[#57555e] to-[#413e4e] bg-opacity-90 flex justify-center items-center">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-lg relative">
            <button
              className="absolute top-4 right-4 text-[#F87171] font-bold text-xl hover:text-red-600 transition-transform transform hover:scale-110"
              onClick={closeModal}
            >
              ✕
            </button>
            {selectedStudent && studentDetails ? (
              <div className="text-center">
                {/* Profile Photo */}
                <img
                  src={selectedStudent.profile || kidProfile}
                  alt="Profile"
                  className="w-32 h-32 mx-auto rounded-full border-[5px] border-[#6F52CE] shadow-lg mb-4"
                />
                {/* Name */}
                <h2 className="text-3xl font-extrabold text-[#6F52CE] mb-2">
                  {selectedStudent.name || 'N/A'}
                </h2>
                {/* Level and Accuracy */}
                <div className="flex justify-center gap-4 mb-6">
                  <div className="bg-[#E0E7FF] px-4 py-2 rounded-lg shadow-md">
                    <p className="text-sm font-medium text-gray-700">Level</p>
                    <p className="text-xl font-bold text-[#6920CF]">
                      {selectedStudent.highestLevel || 1}
                    </p>
                  </div>
                  <div className="bg-[#E6FFFA] px-4 py-2 rounded-lg shadow-md">
                    <p className="text-sm font-medium text-gray-700">Accuracy</p>
                    <p className="text-xl font-bold text-[#059669]">
                      {selectedStudent.accuracy || 'N/A'}%
                    </p>
                  </div>
                </div>
                {/* Progress Details */}
                <div className="mt-6 space-y-4 bg-[#F9F9FF] p-6 rounded-xl shadow-inner">
                  <p className="text-lg">
                    <strong className="text-[#A393EB]">Student ID:</strong> {studentDetails.studentId}
                  </p>
                  <p className="text-lg">
                    <strong className="text-[#A393EB]">Completeness:</strong> {studentDetails.averageCompleteness/100  || 'N/A'} %
                  </p>
                  <p className="text-lg">
                    <strong className="text-[#A393EB]">Pronunciation:</strong> {studentDetails.averagePronunciation/100 || 'N/A'} %
                  </p>
                  <p className="text-lg">
                    <strong className="text-[#A393EB]">Fluency:</strong> {studentDetails.averageFluency/100 || 'N/A'} %
                  </p>
                </div>
                {/* Progress Bar */}
                <div className="mt-6">
                  <p className="text-gray-700 font-medium mb-2">Accuracy Progress</p>
                  <div className="w-full bg-gray-300 rounded-full h-4">
                    <div
                      className="bg-[#6F52CE] h-4 rounded-full"
                      style={{ width: `${selectedStudent.accuracy || 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-white text-lg font-medium">Loading student details...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherAllStudents;
