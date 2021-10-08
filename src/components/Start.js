import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Start = ({ setChannel, handleConnect }) => {
  return (
    <div className="Start">
      <div className="StartTitle">
        <div className="TitleName">TwitchLibs</div>{" "}
        <div className="TitleInsp">Inspired by MadLibs</div>
      </div>
      <TextField
        className="UserInput"
        id="filled-basic"
        label="Channel"
        variant="filled"
        onInput={(e) => setChannel(e.target.value)}
      />
      <Link to="/game" style={{ textDecoration: "none" }}>
        <Button variant="contained" onClick={() => handleConnect()}>
          Start
        </Button>
      </Link>
    </div>
  );
};

export default Start;
