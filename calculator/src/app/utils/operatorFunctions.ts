import { Operator } from '../types/types';
import { add, subtract, multiply, divide } from './math';

const handleOperatorSimpleCalc = (
  operator: Operator,
  state: { result: number, input: number }
) => {
  const { result, input } = state;
  switch (operator) {
    case '+':
      return add(result, input);
    case '-':
      return subtract(result, input);
    case '*':
      return multiply(result, input);
    case '/':
      return divide(result, input);
    default:
      return result;
  }
};
// in case we would need to export more functions, we could use named exports
export default handleOperatorSimpleCalc;
