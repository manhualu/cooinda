import styled from 'styled-components';
import { Button } from '../styles/Button';

const CivilEventsButton = ({ toggleCivilEvents, setToggleCivilEvents }) => {
  const toggle = () => {
    setToggleCivilEvents(!toggleCivilEvents);
  }

  return (
    <Button onClick={toggle}>
      👥 Civil events
    </Button>
  );
}

export default CivilEventsButton;