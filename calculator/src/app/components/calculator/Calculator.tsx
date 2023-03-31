import React, { useState } from 'react';
import { Operator } from '../../types/types';
import './Calculator.scss';

const Calculator: React.FC = () => {
  const [result, setResult] = useState<number>(0);
  const [numberInput, setNumberInput] = useState<string>('');

  const handleNumberInput = (value: string) => {
    setNumberInput(prevInput => prevInput + value);
  };

  const handleOperator = (operator: Operator) => {
    if (!numberInput) {
      alert('Please enter a number');
    } else {
      const number = +numberInput;
      switch (operator) {
        case '+':
          setResult(prevResult => prevResult + number);
          break;
        case '-':
          setResult(prevResult => prevResult - number);
          break;
        case '*':
          setResult(prevResult => prevResult * number);
          break;
        case '/':
          setResult(prevResult => prevResult / number);
          break;
        default:
          break;
      }
      setNumberInput('');
    }
  };

  const handleEqual = () => {
    if (!numberInput) {
      alert('Please enter a number');
    } else {
      const number = +numberInput;
      setResult(prevResult => prevResult + number);
      setNumberInput('');
    }
  };

  const handleClear = () => {
    setResult(0);
    setNumberInput('');
  };

  const handleDelete = () => {
    setNumberInput(prevInput => prevInput.slice(0, -1));
  };

  return (
    <div className='calculator'>
      <h1>Calculator</h1>
      <div className='display'>{result}</div>
      <div className='input'>
        <input
          type='text'
          value={numberInput}
          onChange={() => { }}
        />
      </div>
      <div className='number-buttons'>
        <button onClick={() => handleNumberInput('1')}>1</button>
        <button onClick={() => handleNumberInput('2')}>2</button>
        <button onClick={() => handleNumberInput('3')}>3</button>
        <button onClick={() => handleNumberInput('4')}>4</button>
        <button onClick={() => handleNumberInput('5')}>5</button>
        <button onClick={() => handleNumberInput('6')}>6</button>
        <button onClick={() => handleNumberInput('7')}>7</button>
        <button onClick={() => handleNumberInput('8')}>8</button>
        <button onClick={() => handleNumberInput('9')}>9</button>
        <button onClick={() => handleNumberInput('0')}>0</button>
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
