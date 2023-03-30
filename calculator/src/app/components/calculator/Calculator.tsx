import React, { useState } from 'react';

type Operator = '+' | '-' | '*' | '/';

const Calculator: React.FC = () => {
  const [result, setResult] = useState<number>(0);
  const [numberInput, setNumberInput] = useState<string>('');

  const handleNumberInput = (value: string) => {
    setNumberInput(prevInput => prevInput + value);
  }

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

  const handleClear = () => {
    setResult(0);
    setNumberInput('');
  };
  // possible functionality
  // const handleEqual = () => {
  //   if (!numberInput) {
  //     alert('Please enter a number');
  //   } else {
  //     const number = +numberInput;
  //     setResult(prevResult => prevResult + number);
  //     setNumberInput('');
  //   }
  // };

  const handleDelete = () => {
    setNumberInput(prevInput => prevInput.slice(0, -1));
  };

  return (
    <div className="calculator">
      <h1></h1>
    </div>
  )
};