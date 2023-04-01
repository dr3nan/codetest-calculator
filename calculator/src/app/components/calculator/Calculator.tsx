import React, { useState } from 'react';
import { Operator } from '../../types/types';
import handleOperatorSimpleCalc from '../../utils/operatorFunctions';
import './calculator.scss';

const Calculator: React.FC = () => {
  const [result, setResult] = useState<number>(0);
  const [numberInput, setNumberInput] = useState<number>(0);

  const handleNumberInput = (value: number) => {
    console.log('value: =====>', value);
    if (numberInput.toString().length > 9) {
      alert('The number is too long (max 10 digits)');
    } else if (isNaN(value)) {
      alert('Please type in a number');
    } else {
      setNumberInput(prevInput => prevInput * 10 + value);
    }
  };

  const handleOperation = (operator: Operator, input: number) => {
    const currentResult = isNaN(result) ? input : result;
    const newResult = handleOperatorSimpleCalc(operator, { result: currentResult, input });
    setResult(newResult);
    setNumberInput(0);
  };

  const handleEqual = () => {
    console.log('equal');
    setResult(prevResult => prevResult + numberInput);
    setNumberInput(0);
  };

  const handleClear = () => {
    console.log('clear');
    setResult(0);
    setNumberInput(0);
  };

  const handleDelete = () => {
    console.log('delete');
    setNumberInput(prevInput => Math.floor(prevInput / 10));
  };

  // here we could add another event handler for the keyboard input
  // and use the event.key to determine which button was pressed,
  // then call the appropriate function

  return (
    <div className='calculator'>
      <div className='display-input-wrapper'>
        <div className='display'>{result}</div>
        <input
          type='number'
          className='number-input'
          placeholder='0'
          value={numberInput}
          onChange={(event) => setNumberInput(Number(event.target.value))}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleEqual();
            } else if (event.key === 'Backspace') {
              handleDelete();
            }
          }}
          maxLength={10}
          onFocus={(event) => {
            event.target.value = '';
          }}
        />
      </div>
      <div className='clear-delete-buttons'>
        <button className='button' onClick={handleClear}>AC</button>
        <button onClick={handleDelete}>DEL</button>
      </div>
      <div className='number-buttons'>
        {Array.from({ length: 9 }, (_, i: number) => (
          <button key={i} onClick={() => handleNumberInput(9 - i)}>{9 - i}</button>
        ))}
        <button className='zero-button' onClick={() => handleNumberInput(0)}>
          0
        </button>
      </div>
      <div className='operator-buttons'>
        <button onClick={() => handleOperation('+', numberInput)}>+</button>
        <button onClick={() => handleOperation('-', numberInput)}>-</button>
        <button onClick={() => handleOperation('*', numberInput)}>*</button>
        <button onClick={() => handleOperation('/', numberInput)}>/</button>
        <button onClick={handleEqual}>=</button>
      </div>
    </div>
  )
};

export default Calculator;
