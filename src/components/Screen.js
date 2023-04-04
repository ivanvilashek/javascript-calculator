import './Screen.css';
import { useContext } from 'react';
import { CalcContext } from '../context/CalcContext';
import { Textfit } from 'react-textfit';

function Screen() {
  const { calc } = useContext(CalcContext);

  return (
    <Textfit className="screen" id="display" max={70} mode="single">
      {calc.num ? calc.num : calc.res}
    </Textfit>
  );
}

export default Screen;
