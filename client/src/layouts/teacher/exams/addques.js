// QuestionPaperPortal.js
import React, { useState } from 'react';

const QuestionPaperPortal = ({ examId, onSaveQuestions }) => {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [mark, setMark] = useState('');

  const handleAddQuestion = () => {
    const newQuestion = {
      text: questionText,
      options,
      mark,
    };
    setQuestions([...questions, newQuestion]);
    setQuestionText('');
    setOptions(['', '', '', '']);
    setMark('');
  };

  const handleSaveQuestions = () => {
    onSaveQuestions(examId, questions);
    setQuestions([]);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  return (
    <div>
      {/* Form fields for adding questions */}
      <button onClick={handleAddQuestion}>Add Question</button>
      <button onClick={handleSaveQuestions}>Save Questions</button>
    </div>
  );
};

export default QuestionPaperPortal;
