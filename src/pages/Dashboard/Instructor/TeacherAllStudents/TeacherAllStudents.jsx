import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { kidProfile } from '../../../../assets/common';
import toast, { Toaster } from 'react-hot-toast';

const TeacherAllStudents = () => {
  const [students, setStudents] = useState([]); // Holds list of students
  const [selectedStudent, setSelectedStudent] = useState(null); // Holds selected student data
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls dialog visibility
  const uniqueId = localStorage.getItem('uniqueId');

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        toast.loading('Fetching students...');
        const response = await axios.get(
          `https://speechbk-asghe5g9d2fsfydr.eastus2-01.azurewebsites.net/api/v1/data/student/data/${uniqueId}`
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

  // Open modal and fetch details of a selected student
  const openModal = async (id) => {
    try {
      toast.loading('Fetching student details...');
      const response = await axios.get(
        `https://speechbk-asghe5g9d2fsfydr.eastus2-01.azurewebsites.net/api/v1/level/data/student/${id}`
      );
      toast.dismiss();
      setSelectedStudent(response.data); // Set selected student details
      setIsModalOpen(true);
    } catch (error) {
      toast.dismiss();
      toast.error('Error fetching student details!');
      console.error('Error fetching student details:', error);
    }
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Toaster />
      <h2 className="text-3xl font-bold">List Of Students</h2>
      <div className="flex flex-wrap gap-12 mt-8">
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
              {student.highestLevel}
            </p>
            <button
              onClick={() => openModal(student.id)}
              className="absolute transform translate-x-[250px] translate-y-[140px] px-4 py-2 bg-[#6920CF] rounded-2xl text-white font-medium hover:bg-[#5420CF] cursor-pointer"
            >
              View
            </button>
          </div>
        ))}
      </div>

      {/* Dialog Box */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg relative">
            <button
              className="absolute top-3 right-3 text-red-500 font-bold"
              onClick={closeModal}
            >
              ✕
            </button>
            {selectedStudent ? (
              <div>
                <h2 className="text-2xl font-bold text-[#6F52CE]">
                  {selectedStudent.name || 'N/A'}
                </h2>
                <div className="mt-4">
                  <p>
                    <strong>Student ID:</strong> {selectedStudent.id}
                  </p>
                  <p>
                    <strong>Highest Level:</strong> {selectedStudent.highestLevel || 'N/A'}
                  </p>
                  <p>
                    <strong>Accuracy:</strong> {selectedStudent.accuracy || 'N/A'}%
                  </p>
                  <p>
                    <strong>Pronunciation:</strong>{' '}
                    {selectedStudent.pronunciation || 'N/A'}
                  </p>
                  <p>
                    <strong>Fluency:</strong> {selectedStudent.fluency || 'N/A'}
                  </p>
                </div>
              </div>
            ) : (
              <p>Loading student details...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherAllStudents;
