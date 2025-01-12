import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import CongratsBox from '../CongratsBox';
import toast, { Toaster } from 'react-hot-toast';

const CustomRecorder = ({ letter, levelArray, userid, onClose, audioData, submitted, resetSubmit }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognizer, setRecognizer] = useState(null);
  const [transcribedText, setTranscribedText] = useState('');
  const [accuracyScore, setAccuracyScore] = useState(null);
  const [pronunciationScore, setPronunciation] = useState(null);
  const [completenessScore, setCompleteness] = useState(null);
  const [fluencyScore, setFluency] = useState(null);
  const [completeScore, setComplete] = useState(null);
  const [showCongrats, setShowCongrats] = useState(false);
  const [showRetry, setShowRetry] = useState(false);

  const [scoree , setscoree] = useState('');

  useEffect(() => {
    // Load stored scores from localStorage (if any)
    const storedPronunciationScore = localStorage.getItem("pronunciationScore");
    const storedAccuracyScore = localStorage.getItem("accuracyScore");
    const storedFluencyScore = localStorage.getItem("fluencyScore");
    const storedCompletenessScore = localStorage.getItem("completenessScore");
    const storedCompleteScore = localStorage.getItem("completeScore");

    if (storedPronunciationScore) setPronunciation(parseFloat(storedPronunciationScore));
    if (storedAccuracyScore) setAccuracyScore(parseFloat(storedAccuracyScore));
    if (storedFluencyScore) setFluency(parseFloat(storedFluencyScore));
    if (storedCompletenessScore) setCompleteness(parseFloat(storedCompletenessScore));
    if (storedCompleteScore) setComplete(parseFloat(storedCompleteScore));

    const speechConfig = sdk.SpeechConfig.fromSubscription("d6e3583632cb433aad65bd3e66daa253", "eastus");
    speechConfig.speechRecognitionLanguage = "en-US";
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();

    const pronunciationAssessmentConfig = new sdk.PronunciationAssessmentConfig(
      letter,
      sdk.PronunciationAssessmentGradingSystem.HundredMark,
      sdk.PronunciationAssessmentGranularity.Word
    );

    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    pronunciationAssessmentConfig.applyTo(recognizer);

    recognizer.recognizing = (s, e) => {
      if (e.result.reason === sdk.ResultReason.RecognizingSpeech) {
        setTranscribedText(e.result.text);
        console.log("Recognizing Speech:", e.result.text);
      }
    };

    recognizer.recognized = (s, e) => {
      if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
        setTranscribedText(e.result.text);
      console.log("Recognized Speech Result:", e.result); // Log recognized speech result
        const pronunciationAssessmentResult = sdk.PronunciationAssessmentResult.fromResult(e.result);
        console.log("Pronunciation Assessment Result:", pronunciationAssessmentResult);
        setscoree(pronunciationAssessmentResult);
        const a = pronunciationAssessmentResult.pronunciationScore;
        const b = pronunciationAssessmentResult.accuracyScore;
        const c = pronunciationAssessmentResult.fluencyScore;
        const d = pronunciationAssessmentResult.completenessScore;

        // result for each letter
        

        // Store scores temporarily in state
        setPronunciation(a);
        setCompleteness(d);
        setFluency(c);
        setAccuracyScore(b);
        setComplete((a + b + c + d) / 4);
        
        // Store scores in localStorage for later use
        localStorage.setItem("pronunciationScore", a);
        localStorage.setItem("accuracyScore", b);
        localStorage.setItem("fluencyScore", c);
        localStorage.setItem("completenessScore", d);
        localStorage.setItem("completeScore", (a + b + c + d) / 4);
      } else if (e.result.reason === sdk.ResultReason.NoMatch) {
        console.log('No speech recognized.');
      }
    };

    recognizer.canceled = (s, e) => {
      console.error('Recognition canceled:', e);
    };

    setRecognizer(recognizer);

    return () => {
      recognizer.close();
    };
  }, [letter]);

  const startRecording = () => {
    setIsRecording(true);
    recognizer?.startContinuousRecognitionAsync();
  };

  const stopRecording = () => {
    setIsRecording(false);
    recognizer?.stopContinuousRecognitionAsync();
  };

  const handleSubmit = async () => {
    try {
      toast.loading("Submitting test...");
      const testData = {
        total_score: parseFloat((completeScore / 11).toFixed(2)).toString(),
        pronunciation: parseFloat((pronunciationScore / 10).toFixed(2)).toString(),
        completeness: parseFloat((completenessScore / 11).toFixed(2)).toString(),
        fluency: parseFloat((fluencyScore / 11).toFixed(2)).toString(),
        levelId: 4,
        sublevelNo: parseInt(levelArray[0].subLevel),
        studentId: parseInt(userid),
        languageModelID: "Custom-001"
      };

      if ((completeScore / 11).toFixed(2) > 8) {
        const newLevelData = {
          studentId: parseInt(userid),
          sub_level: 6,
          targetLevel: parseInt(levelArray[0].level),
          langaugeModelID1: "Azure-001",
          langaugeModelID2: "Custom-001"
        };
        console.log("test data", testData);
        const newLevelResponse = await axios.post(
          "https://speechbk-asghe5g9d2fsfydr.eastus2-01.azurewebsites.net/api/v1/level/attempt/new-level",
          newLevelData
        );
        

        // Submit the test data
        const response = await axios.post("https://speechbk-asghe5g9d2fsfydr.eastus2-01.azurewebsites.net/api/v1/test/test-attempt/azure", testData);

        toast.dismiss();
        toast.success("Test submitted successfully!");

        setShowCongrats(true);
        setShowRetry(false);
      } else {
        setShowCongrats(false);
        setShowRetry(true);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('Error submitting data');
    }
  };

  useEffect(() => {
    if (submitted === 'Submitted') {
      handleSubmit();
      resetSubmit();
    }
  }, [submitted, resetSubmit]);

  useEffect(() => {
    if (showCongrats || showRetry) {
      const timer = setTimeout(() => {
        setShowCongrats(false);
        setShowRetry(false);
        onClose();
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, [showCongrats, showRetry, onClose]);

  return (
    <div>
      <Toaster />
      
      <h1 className='text-[24px] mt-2 font-semibold text-center '>Try Your Pronunciation Skill With <span className='text-[#3B82F6] font-bold'>GIGGLIO.AI</span> !</h1>
      <div className='flex mt-3'>
        <p className=' text-[24px] font-medium '>Speak the Word : <span className='text-red-500 font-bold underline'>{letter}</span></p>
      </div>
      <div className='flex justify-center mt-4'>
        <button onClick={isRecording ? stopRecording : startRecording} className='bg-gradient-to-br font-bold from-[#3B82F6] to-[#D1C4E9] px-6 py-3 text-white rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105'>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
      </div>
      <div>
      <h2 className="text-sm mt-2 mb-2">
        Transcribed Text:{" "}
        <span className="text-base font-bold ml-2">
          {scoree?.detailResult?.Words?.map((wordObj, index) => {
            const { Word, PronunciationAssessment } = wordObj || {};
            const { ErrorType } = PronunciationAssessment || {};
            const color = ErrorType === "None" ? "text-green-600" : "text-red-600";
            return (
              <span key={index} className={`${color} mr-1`}>
                {Word}
              </span>
            );
          })}
        </span>
      </h2>
        {(accuracyScore !== null || pronunciationScore !== null || completenessScore !== null || fluencyScore !== null || completeScore !== null) && (
          <div className='flex flex-col gap-3 px-3 py-3 rounded-xl border-[1px] shadow-2xl justify-center'>
            <h2 className='text-sm'>Accuracy Score: <span className='text-base font-bold ml-2'>{(accuracyScore || localStorage.getItem("accuracyScore")) ? (parseFloat(accuracyScore) / 10).toFixed(2) : 'N/A'}</span></h2>
            <h2 className='text-sm'>Pronunciation Score: <span className='text-base font-bold ml-2'>{(pronunciationScore || localStorage.getItem("pronunciationScore")) ? (parseFloat(pronunciationScore) / 10).toFixed(2) : 'N/A'}</span></h2>
            <h2 className='text-sm'>Fluency Score: <span className='text-base font-bold ml-2'>{(fluencyScore || localStorage.getItem("fluencyScore")) ? (parseFloat(fluencyScore) / 10).toFixed(2) : 'N/A'}</span></h2>
            <h2 className='text-sm'>Completeness Score: <span className='text-base font-bold ml-2'>{(completenessScore || localStorage.getItem("completenessScore")) ? (parseFloat(completenessScore) / 10).toFixed(2) : 'N/A'}</span></h2>
            <h2 className='text-sm'>Complete Score: <span className='text-base font-bold ml-2'>{completeScore ? (parseFloat(completeScore) / 10).toFixed(2) : 'N/A'}</span></h2>
          </div>
        )}
      </div>
      {(showCongrats || showRetry) && (
        <CongratsBox
          showCongrats={showCongrats}
          onClose={() => {
            setShowCongrats(false);
            setShowRetry(false);
            onClose();
          }}
          fullscreen={true}
        />
      )}
    </div>
  );
};

export default CustomRecorder;
