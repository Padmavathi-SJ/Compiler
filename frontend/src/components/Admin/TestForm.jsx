import React, { useState } from 'react';
import axios from 'axios';
import '../../css/Admin/TestForm.css';
import '../../App.css';

const TestForm= () => {
  const [formData, setFormData] = useState({
    topic: '',
    numberOfQuestions: 0,
    questionsToAttend: 0,
    fromTime: '',
    toTime: '',
    questions: [],
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState([]); // Added state for form errors


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleQuestionsChange = (index, e) => {
    const { name, value } = e.target;
    const questions = [...formData.questions];
    questions[index] = {
      ...questions[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      questions,
    });
  };

  const handleNumberOfQuestionsChange = (e) => {
    const numberOfQuestions = parseInt(e.target.value, 10);
    if (!isNaN(numberOfQuestions) && numberOfQuestions >= 0) {
      const questions = new Array(numberOfQuestions).fill(null).map(() => ({
        description: '',
        title: '',
        sampleTestCase: '',
        numberOfTestCases: 0,
        testCases: [],
      }));
      setFormData({
        ...formData,
        numberOfQuestions,
        questions,
      });
    }
  };

  const handleNumberOfTestCasesChange = (questionIndex, e) => {
    const numberOfTestCases = parseInt(e.target.value, 10);
    if (!isNaN(numberOfTestCases) && numberOfTestCases >= 0) {
      const questions = [...formData.questions];
      questions[questionIndex] = {
        ...questions[questionIndex],
        numberOfTestCases,
        testCases: new Array(numberOfTestCases).fill(null).map(() => ({
          numberOfInputs: 0,
          numberOfOutputs: 0,
          inputs: [],
          outputs: [],
        })),
      };
      setFormData({
        ...formData,
        questions,
      });
    }
  };

  const handleNumberOfInputsChange = (questionIndex, testCaseIndex, e) => {
    const numberOfInputs = parseInt(e.target.value, 10);
    if (!isNaN(numberOfInputs) && numberOfInputs >= 0) {
      const questions = [...formData.questions];
      questions[questionIndex].testCases[testCaseIndex] = {
        ...questions[questionIndex].testCases[testCaseIndex],
        numberOfInputs,
        inputs: new Array(numberOfInputs).fill(''),
      };
      setFormData({
        ...formData,
        questions,
      });
    }
  };

  const handleNumberOfOutputsChange = (questionIndex, testCaseIndex, e) => {
    const numberOfOutputs = parseInt(e.target.value, 10);
    if (!isNaN(numberOfOutputs) && numberOfOutputs >= 0) {
      const questions = [...formData.questions];
      questions[questionIndex].testCases[testCaseIndex] = {
        ...questions[questionIndex].testCases[testCaseIndex],
        numberOfOutputs,
        outputs: new Array(numberOfOutputs).fill(''),
      };
      setFormData({
        ...formData,
        questions,
      });
    }
  };

  const handleInputsChange = (questionIndex, testCaseIndex, inputIndex, e) => {
    const { value } = e.target;
    const questions = [...formData.questions];
    questions[questionIndex].testCases[testCaseIndex].inputs[inputIndex] = value;
    setFormData({
      ...formData,
      questions,
    });
  };

  const handleOutputsChange = (questionIndex, testCaseIndex, outputIndex, e) => {
    const { value } = e.target;
    const questions = [...formData.questions];
    questions[questionIndex].testCases[testCaseIndex].outputs[outputIndex] = value;
    setFormData({
      ...formData,
      questions,
    });
  };

  const validateForm = () => {
    const errors = [];
  
    if (!formData.topic) errors.push('Topic is required.');
    if (formData.numberOfQuestions <= 0) errors.push('Number of Questions should be greater than 0.');
    if (formData.questionsToAttend <= 0 || formData.questionsToAttend > formData.numberOfQuestions) 
      errors.push('Questions to Attend should be valid.');
    if (!formData.fromTime) errors.push('From Time is required.');
    if (!formData.toTime) errors.push('To Time is required.');
  
    formData.questions.forEach((question, index) => {
      if (!question.title) errors.push(`Title is required for Question ${index + 1}.`);
      if (!question.description) errors.push(`Description is required for Question ${index + 1}.`);
      if (question.numberOfTestCases <= 0) errors.push(`Number of Test Cases should be greater than 0 for Question ${index + 1}.`);
    });
  
    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Prevent submission if validation fails
    try {
      const response = await axios.post('http://localhost:5000/tests', {
        topic: formData.topic,
        questions: formData.questions,
        questionsToAttend: formData.questionsToAttend,
        fromTime: formData.fromTime,
        toTime: formData.toTime,
      });
      console.log('Form Data Submitted:', response.data);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          topic: '',
          numberOfQuestions: 0,
          questionsToAttend: 0,
          fromTime: '',
          toTime: '',
          questions: [],
        });
      }, 2000);
    } catch (error) {
      console.error('Error submitting data:', error.response ? error.response.data : error.message);
      setFormErrors([`Error submitting form: ${error.response ? error.response.data.message : error.message}`]);
    }
  };

  return (
    <div className='main-content'>
      <div className='add-questions'>
        <h2>Add Questions</h2>
        {isSubmitted ? (
          <div className="success-message">
            Form submitted successfully!
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
          {formErrors.length > 0 && (
            <div className="error-message-container">
              <div className="error-message">
                {formErrors.map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </div>
            </div>
          )}

<div className="input-group">
  <label>Topic of the Test:</label>
  <input
    type="text"
    name="topic"
    value={formData.topic}
    onChange={handleChange}
  />
</div>


<div className="input-group">
  <label>Number of Questions:</label>
  <input
    type="number"
    name="numberOfQuestions"
    value={formData.numberOfQuestions}
    onChange={handleNumberOfQuestionsChange}
  />
</div>


<div className="input-group">
  <label>Number of Questions to Attend:</label>
  <input
    type="number"
    name="questionsToAttend"
    value={formData.questionsToAttend}
    onChange={handleChange}
  />
</div>


<div className="input-group">
  <label>From Time:</label>
  <input
    type="datetime-local"
    name="fromTime"
    value={formData.fromTime}
    onChange={handleChange}
  />
</div>


<div className="input-group">
  <label>To Time:</label>
  <input
    type="datetime-local"
    name="toTime"
    value={formData.toTime}
    onChange={handleChange}
  />
</div>


            {formData.questions.map((question, index) => (
              <div key={index}>
                <h3>Question {index + 1}</h3>
                <div className='input-group'>
                  <label>Title:</label>
                  <input
                    type="text"
                    name="title"
                    value={question.title}
                    onChange={(e) => handleQuestionsChange(index, e)}
                  />
                </div>


                <div>
                  <label>Description:</label>
                  <textarea
                    name="description"
                    value={question.description}
                    onChange={(e) => handleQuestionsChange(index, e)}
                  />
                </div>


                <div>
                <label>Sample Test Cases:</label>
                <textarea
                  name="sampleTestCase"
                  value={question.sampleTestCases}
                  onChange={(e) => handleQuestionsChange(index, e)}
                />
              </div>


                <div  className='input-group'>
                  <label>Number of Test Cases:</label>
                  <input
                    type="number"
                    name="numberOfTestCases"
                    value={question.numberOfTestCases}
                    onChange={(e) => handleNumberOfTestCasesChange(index, e)}
                  />
                </div>

                {question.testCases.map((testCase, testCaseIndex) => (
                  <div key={testCaseIndex}>
                    <h4>Test Case {testCaseIndex + 1}</h4>
                    <div  className='input-group'>
                      <label>Number of Inputs:</label>
                      <input
                        type="number"
                        name="numberOfInputs"
                        value={testCase.numberOfInputs}
                        onChange={(e) => handleNumberOfInputsChange(index, testCaseIndex, e)}
                      />
                    </div>


                    <div  className='input-group'>
                      <label>Number of Outputs:</label>
                      <input
                        type="number"
                        name="numberOfOutputs"
                        value={testCase.numberOfOutputs}
                        onChange={(e) => handleNumberOfOutputsChange(index, testCaseIndex, e)}
                      />
                    </div>


                    {testCase.inputs.map((input, inputIndex) => (
                      <div key={inputIndex}>
                        <label>Input {inputIndex + 1}:</label>
                        <input
                          type="text"
                          name="input"
                          value={input}
                          onChange={(e) => handleInputsChange(index, testCaseIndex, inputIndex, e)}
                        />
                      </div>


                    ))}
                    {testCase.outputs.map((output, outputIndex) => (
                      <div key={outputIndex}>
                        <label>Output {outputIndex + 1}:</label>
                        <input
                          type="text"
                          name="output"
                          value={output}
                          onChange={(e) => handleOutputsChange(index, testCaseIndex, outputIndex, e)}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TestForm;
