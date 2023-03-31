import React, { useState } from 'react';
import { Operator } from '../../types/types';
import './Calculator.scss';

const Calculator: React.FC = () => {
  const [result, setResult] = useState<number>(0);
  const [numberInput, setNumberInput] = useState<number>(0);

  const handleNumberInput = (value: number) => {
    if (numberInput.toString().length > 9) {
      alert('The number is too long');
    } else {
      setNumberInput(prevInput => prevInput * 10 + value);
    }
  };

  const handleOperator = (operator: Operator) => {
    if (!numberInput) {
      alert('Please enter a number');
    } else {
      switch (operator) {
        case '+':
          setResult(prevResult => prevResult + numberInput);
          break;
        case '-':
          setResult(prevResult => prevResult - numberInput);
          break;
        case '*':
          setResult(prevResult => prevResult * numberInput);
          break;
        case '/':
          setResult(prevResult => prevResult / numberInput);
          break;
        default:
          break;
      }
      setNumberInput(0);
    }
  };

  const handleEqual = () => {
    if (!numberInput) {
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
  // and use the event.key to determine which button was pressed
  // and then call the appropriate function

  return (
    <div className='calculator'>
      <h1>Calculator</h1>
      <div className='display'>{result}</div>
      <div className='input'>
        <input
          type='text'
          value={numberInput}
          onChange={(event) => setNumberInput(Number(event.target.value))}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleEqual();
            }
          }}
        />
      </div>
      <div className='number-buttons'>
        <button onClick={() => handleNumberInput(1)}>1</button>
        <button onClick={() => handleNumberInput(2)}>2</button>
        <button onClick={() => handleNumberInput(3)}>3</button>
        <button onClick={() => handleNumberInput(4)}>4</button>
        <button onClick={() => handleNumberInput(5)}>5</button>
        <button onClick={() => handleNumberInput(6)}>6</button>
        <button onClick={() => handleNumberInput(7)}>7</button>
        <button onClick={() => handleNumberInput(8)}>8</button>
        <button onClick={() => handleNumberInput(9)}>9</button>
        <button onClick={() => handleNumberInput(0)}>0</button>
      </div>
      <div className='operator-buttons'>
        <button onClick={() => handleOperator('+')}>+</button>
        <button onClick={() => handleOperator('-')}>-</button>
        <button onClick={() => handleOperator('*')}>*</button>
        <button onClick={() => handleOperator('/')}>/</button>
        <button onClick={handleEqual}>=</button>
      </div>
      <div className='other-buttons'>
        <button onClick={handleClear}>C</button>
        <button onClick={handleDelete}>DEL</button>
      </div>
    </div>
  )
};

export default Calculator;
