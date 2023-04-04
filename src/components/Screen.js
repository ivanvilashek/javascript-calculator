import './Screen.css';
import { useContext } from 'react';
import { CalcContext } from '../context/CalcContext';
import { Textfit } from 'react-textfit';

function Screen() {
  const { calc } = useContext(CalcContext);

  return (
    <Textfit className="screen" id="display" max={70} mode="single">
      {calc.out > 1
        ? calc.out.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        : calc.out}
    </Textfit>
  );
}

export default Screen;
