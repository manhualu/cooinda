import { Button } from "../styles/Button";

const HealthButton = ({ toggleHealth, setToggleHealth }) => {
  const toggle = () => {
    setToggleHealth(!toggleHealth);
  };

  return (
    <Button
      onClick={toggle}
      style={
        toggleHealth
          ? { background: "#d6a11a", color: "white" }
          : { background: "white", color: "#333333" }
      }
    >
      🏥 Health
    </Button>
  );
};

export default HealthButton;
