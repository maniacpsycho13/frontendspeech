import React, { useState } from 'react';
import AzureRecorder from './Azure/AzureRecorder';
import CustomRecorder from './Azure/CustomRecorder';

const LevelBox = ({ closeDialog, letter, levelArray, userid }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState("Not Running");
  const [submitted, setSubmitted] = useState("Not submitted");
  const [selectedRecorder, setSelectedRecorder] = useState('Azure'); 

  const handleSubmit = () => {
    // Clear all local storage data
    localStorage.removeItem("pronunciationScore");
    localStorage.removeItem("accuracyScore");
    localStorage.removeItem("fluencyScore");
    localStorage.removeItem("completenessScore");
    localStorage.removeItem("completeScore");
  
    localStorage.removeItem("custompronunciationScore");
    localStorage.removeItem("customaccuracyScore");
    localStorage.removeItem("customfluencyScore");
    localStorage.removeItem("customcompletenessScore");
    localStorage.removeItem("customcompleteScore");
  
    // Set the submitted state
    setSubmitted("Submitted");
  };

  const startRecording = () => {
    setIsRecording(true);
    setAudioData("Running");
  };

  const stopRecording = () => {
    setIsRecording(false);
    setAudioData("Not Running");
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md  bg-black bg-opacity-50 flex items-center justify-center z-[500] ">
      <div className="bg-gradient-to-br from-[#3B82F6] to-[#D1C4E9] px-8 py-6 rounded-2xl shadow-2xl w-[80%] h-[80%] relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-extrabold text-white">Practice</h1>
          <button
            className="text-white hover:text-red-300 font-bold text-lg border-white border-2 rounded-full px-3 py-1 hover:bg-red-500 transition-all"
            onClick={closeDialog}
          >
            X
          </button>
        </div>

        {/* Options to select recorder */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-6 py-2 font-bold rounded-xl ${selectedRecorder === 'Azure' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'} hover:bg-blue-600 hover:text-white transition-all`}
            onClick={() => setSelectedRecorder('Azure')}
          >
            Azure Recorder
          </button>
          <button
            className={`px-6 py-2 font-bold rounded-xl ${selectedRecorder === 'Custom' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'} hover:bg-blue-600 hover:text-white transition-all`}
            onClick={() => setSelectedRecorder('Custom')}
          >
            Custom Recorder
          </button>
        </div>

        {/* Conditional rendering of recorders */}
        <div className="flex justify-center h-[70%]">
          {selectedRecorder === 'Azure' && (
            <div className="bg-white rounded-xl p-6 shadow-inner w-[90%]">
              <AzureRecorder
                letter={letter}
                levelArray={levelArray}
                userid={userid}
                onClose={closeDialog}
                audioData={audioData}
                submitted={submitted}
                resetSubmit={() => setSubmitted("Not submitted")}
              />
            </div>
          )}
          {selectedRecorder === 'Custom' && (
            <div className="bg-white rounded-xl p-6 shadow-inner w-[90%]">
              <CustomRecorder
                letter={letter}
                levelArray={levelArray}
                userid={userid}
                onClose={closeDialog}
                audioData={audioData}
                submitted={submitted}
                resetSubmit={() => setSubmitted("Not submitted")}
              />
            </div>
          )}
        </div>


        <div className="flex justify-center mt-8">
          <button
            className="text-base font-bold px-12 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelBox;
