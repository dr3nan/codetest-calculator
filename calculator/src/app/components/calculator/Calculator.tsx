import React, { useState } from 'react';
import { Operator } from '../../types/types';
import handleOperatorSimpleCalc from '../../utils/operatorFunctions';
import './calculator.scss';

const Calculator: React.FC = () => {
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [forOperator, setForOperator] = useState<Operator | null>(null);

  const handleNumberInput = (value: number) => {
    console.log({ value, currentValue });
    if (currentValue === null) return setCurrentValue(value);

    if (currentValue.toString().length > 9) {
      alert('The number is too long (max 10 digits)');
    } else if (isNaN(value)) {
      alert('Please type in a number');
    } else {
      setCurrentValue((prevCurr) => {
        if (prevCurr === null) return null;
        return prevCurr * 10 + value;
      });
    };
  };

  const handleOperation = (operator: Operator) => {
    setPreviousValue(currentValue);
    setForOperator(operator);
    setCurrentValue(0);
  };

  const handleEqual = () => {
    if (!forOperator) return alert('No operator was selected');
    if (previousValue !== null && currentValue !== null) {
      setPreviousValue(
        handleOperatorSimpleCalc(forOperator, { result: previousValue, input: currentValue })
      );
      setCurrentValue(null);
    };
  };

  const handleClear = () => {
    if (currentValue === 0) {
      setPreviousValue(0);
      setCurrentValue(0);
    } else {
      setCurrentValue(0);
    }
  };

  const handleDelete = () => {
    setCurrentValue((prevCurr) => {
      if (prevCurr === null) return null;
      return Number(prevCurr.toString().slice(0, -1))
    });
  };

  // here we could add another event handler for the keyboard input
  // and use the event.key to determine which button was pressed,
  // then call the appropriate function

  return (
    <div className='calculator'>
      <div className='display-input-wrapper'>
        <div className='display'>{previousValue}</div>
        <input
          type='number'
          className='number-input'
          placeholder='0'
          value={currentValue ?? 0}
          onChange={(event) => setPreviousValue(Number(event.target.value))}
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
        <button onClick={() => handleOperation('+')}>+</button>
        <button onClick={() => handleOperation('-')}>-</button>
        <button onClick={() => handleOperation('*')}>*</button>
        <button onClick={() => handleOperation('/')}>/</button>
        <button onClick={handleEqual}>=</button>
      </div>
    </div>
  )
};

export default Calculator;
