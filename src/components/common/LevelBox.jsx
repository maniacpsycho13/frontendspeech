import React, { useState } from 'react';
import AzureRecorder from './Azure/AzureRecorder';
import CustomRecorder from './Azure/CustomRecorder';

const LevelBox = ({ closeDialog, letter, levelArray, userid }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState("Not Running"); 
  const [submitted, setSubmitted] = useState("Not submitted");
  const handleSubmit = () => {
    setSubmitted("Submitted");
  }

  const startRecording = () => {
    setIsRecording(true);
    setAudioData("Running");
  };

  const stopRecording = () => {
    setIsRecording(false);
    setAudioData("Not Running"); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[500]">
      <div className="bg-gradient-to-br  from-[#3B82F6] to-[#D1C4E9] px-8 py-6 rounded-2xl shadow-2xl w-[46rem] min-h-[26rem] relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-extrabold text-white">Practice</h1>
          <button
            className="text-white hover:text-red-300 font-bold text-lg border-white border-2 rounded-full px-3 py-1 hover:bg-red-500 transition-all"
            onClick={closeDialog}
          >
            X
          </button>
        </div>

        {/* <div className="flex justify-center mt-4">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className="bg-gradient-to-br font-bold from-[#3B82F6] to-[#D1C4E9] px-6 py-3 text-white rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
        </div> */}

        {/* Content Area */}
        <div className='flex gap-8 mt-8'>
          <div className="bg-white rounded-xl p-6 shadow-inner">
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
          <div className="bg-white rounded-xl p-6 shadow-inner">
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
        </div>
        <div className='flex justify-center mt-8 '>
          <button className="text-base font-bold px-6 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default LevelBox;
