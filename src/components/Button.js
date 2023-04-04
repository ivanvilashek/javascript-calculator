import { useContext } from 'react';
import { CalcContext } from '../context/CalcContext';

const getClassName = (value) => {
  const className = {
    '+': 'bg-orange',
    '-': 'bg-orange',
    x: 'bg-orange',
    '/': 'bg-orange',
    '=': 'bg-orange',
    C: 'bg-gray',
    '+-': 'bg-gray',
    '%': 'bg-gray',
  };

  return className[value];
};

const getId = (value) => {
  const idName = {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    '+': 'add',
    '-': 'subtract',
    x: 'multiply',
    '/': 'divide',
    '.': 'decimal',
    '=': 'equals',
  };

  return idName[value];
};

function Button({ value }) {
  const { calc, setCalc } = useContext(CalcContext);

  const handleClickButton = () => {
    const numberString = value.toString();

    let numberValue = '';
    if (numberString === '0' && calc.num === 0) {
      numberValue = '0';
    } else {
      numberValue = +(calc.num + numberString);
      if (numberValue.toString().length > 10) return;
    }

    setCalc({
      ...calc,
      num: numberValue,
      out: numberValue,
    });
  };

  const commaClick = () => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes('.') ? calc.num + value : calc.num,
    });
  };

  const resetClick = () => {
    setCalc({ num: 0, res: 0, out: 0, sign: '' });
  };

  const signClick = () => {
    setCalc({
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      out: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsClick = () => {
    if (calc.res && calc.num) {
      const math = (a, b, sign) => {
        const result = {
          '+': (a, b) => a + b,
          '-': (a, b) => a - b,
          x: (a, b) => a * b,
          '/': (a, b) => (b !== '0' ? a / b : 'Error'),
        };

        return result[sign](a, b);
      };

      setCalc({
        res: math(calc.res, calc.num, calc.sign),
        out: math(calc.res, calc.num, calc.sign),
        sign: calc.sign,
        num: calc.num,
      });
    }
  };

  const percentClick = () => {
    setCalc({
      num: calc.num / 100,
      res: calc.res / 100,
      out: calc.out / 100,
      sign: '',
    });
  };

  const invertClick = () => {
    setCalc({
      num: calc.num * -1,
      res: calc.res * -1,
      out: calc.out * -1,
      sign: '',
    });
  };

  const handleBtnClick = () => {
    const result = {
      '.': commaClick,
      C: resetClick,
      '/': signClick,
      x: signClick,
      '-': signClick,
      '+': signClick,
      '=': equalsClick,
      '%': percentClick,
      '+-': invertClick,
    };

    if (result[value]) {
      return result[value]();
    } else {
      return handleClickButton();
    }
  };

  return (
    <button
      onClick={handleBtnClick}
      id={getId(value)}
      className={`button ${getClassName(value) ? getClassName(value) : ''}`}
    >
      {value}
    </button>
  );
}

export default Button;
