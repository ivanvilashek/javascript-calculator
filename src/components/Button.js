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
    C: 'clear',
  };

  return idName[value];
};

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ');

const removeSpaces = (num) => num.toString().replace(/\s/g, '');

function Button({ value }) {
  const { calc, setCalc } = useContext(CalcContext);

  const handleClickButton = () => {
    if (calc.num.toString().length <= 10) {
      setCalc({
        ...calc,
        num:
          removeSpaces(calc.num) % 1 === 0 && !calc.num.toString().includes('.')
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const commaClick = () => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes('.') ? calc.num + value : calc.num,
    });
  };

  const resetClick = () => {
    setCalc({ num: 0, res: 0, sign: '' });
  };

  const math = (a, b, sign) =>
    sign === '+' ? a + b : sign === '-' ? a - b : sign === 'x' ? a * b : a / b;

  const signClick = () => {
    setCalc({
      ...calc,
      sign: value,
      res: !calc.num
        ? calc.res
        : !calc.res
        ? calc.num
        : toLocaleString(
            math(
              Number(removeSpaces(calc.res)),
              Number(removeSpaces(calc.num)),
              calc.sign
            )
          ),
      num: 0,
    });
  };

  const equalsClick = () => {
    if (calc.res && calc.num) {
      setCalc({
        res:
          calc.num === 0 && calc.sign === '/'
            ? 'Error'
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: '',
        num: 0,
      });
    }
  };

  const percentClick = () => {
    setCalc({
      num: calc.num / 100,
      res: calc.res / 100,
      sign: '',
    });
  };

  const invertClick = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
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
