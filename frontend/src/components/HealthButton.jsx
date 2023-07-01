import styled from 'styled-components';
import { Button } from '../styles/Button';

const HealthButton = ({ toggleHealth, setToggleHealth }) => {
  const toggle = () => {
    setToggleHealth(!toggleHealth);
  }

  return (
    <Button onClick={toggle}>
      🏥 Health
    </Button>
  );
}

export default HealthButton;