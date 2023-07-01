import styled from 'styled-components';
import { Button } from '../styles/Button';

const NaturalDisastersButton = ({ toggleNaturalDisasters, setToggleNaturalDisasters }) => {
  const toggle = () => {
    setToggleNaturalDisasters(!toggleNaturalDisasters);
  }

  return (
    <Button onClick={toggle}>
      🌊 Natural disasters
    </Button>
  );
}

export default NaturalDisastersButton;