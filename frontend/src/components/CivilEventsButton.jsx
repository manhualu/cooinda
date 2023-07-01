import { Button } from "../styles/Button";

const CivilEventsButton = ({ toggleCivilEvents, setToggleCivilEvents }) => {
  const toggle = () => {
    setToggleCivilEvents(!toggleCivilEvents);
  };

  return (
    <Button
      onClick={toggle}
      style={
        toggleCivilEvents
          ? { background: "#2a612d", color: "white" }
          : { background: "white", color: "#333333" }
      }
    >
      👥 Civil events
    </Button>
  );
};

export default CivilEventsButton;
