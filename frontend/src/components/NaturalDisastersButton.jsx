import styled from 'styled-components';
import { Button } from '../styles/Button';

const NaturalDisastersButton = ({ toggleNaturalDisasters, setToggleNaturalDisasters }) => {
  const toggle = () => {
    setToggleNaturalDisasters(!toggleNaturalDisasters);
  }

  return (
    <Button onClick={toggle} style={ toggleNaturalDisasters ? { background: '#a13b3b', color: 'white' } : { background: 'white', color: '#333333' } }>
      🌊 Natural disasters
    </Button>
  );
}

export default NaturalDisastersButton;