import React, { useState } from 'react';
import { Operator } from '../../types/types';
import './calculator.scss';

const Calculator: React.FC = () => {
  const [result, setResult] = useState<number>(0);
  const [numberInput, setNumberInput] = useState<number>(0);

  const handleNumberInput = (value: number) => {
    if (numberInput.toString().length > 9) {
      alert('The number is too long (max 10 digits)');
    } else {
      setNumberInput(prevInput => prevInput * 10 + value);
    }
  };

  const handleOperator = (operator: Operator, input: number) => {
    if (isNaN(input)) {
      alert('Please enter a number');
    } else {
      switch (operator) {
        case '+':
          setResult(prevResult => prevResult + input);
          break;
        case '-':
          setResult(prevResult => prevResult - input);
          break;
        case '*':
          setResult(prevResult => prevResult * input);
          break;
        case '/':
          setResult(prevResult => prevResult / input);
          break;
        default:
          break;
      }
      setNumberInput(0);
    }
  };

  const handleEqual = () => {
    if (isNaN(numberInput)) {
      alert('Please enter a number');
    } else {
      setResult(prevResult => prevResult + numberInput);
      setNumberInput(0);
    }
  };

  const handleClear = () => {
    setResult(0);
    setNumberInput(0);
  };

  const handleDelete = () => {
    setNumberInput(prevInput => Math.floor(prevInput / 10));
  };

  // here we could add another event handler for the keyboard input
  // and use the event.key to determine which button was pressed,
  // then call the appropriate function

  // this is a workaround for the input field to be cleared when it is focused
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.value = '';
  };

  return (
    <div className='calculator'>
      <div className='display-input-wrapper'>
        <div className='display'>{result ? result : ''}</div>
        <input
          type='number'
          className='number-input'
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
          onFocus={handleFocus}
        />
      </div>
      <div className='clear-delete-buttons'>
        <button className='button' onClick={handleClear}>AC</button>
        <button onClick={handleDelete}>DEL</button>
      </div>
      <div className='number-buttons'>
        {Array.from({ length: 9 }, (_, i: number) => (
          <button onClick={() => handleNumberInput(9 - i)}>{9 - i}</button>
        ))}
        <button className='zero-button' onClick={() => handleNumberInput(0)}>
          0
        </button>
      </div>
      <div className='operator-buttons'>
        <button onClick={() => handleOperator('+', numberInput)}>+</button>
        <button onClick={() => handleOperator('-', numberInput)}>-</button>
        <button onClick={() => handleOperator('*', numberInput)}>*</button>
        <button onClick={() => handleOperator('/', numberInput)}>/</button>
        <button onClick={handleEqual}>=</button>
      </div>
    </div>
  )
};

export default Calculator;
