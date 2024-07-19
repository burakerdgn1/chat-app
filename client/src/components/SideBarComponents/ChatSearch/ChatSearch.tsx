import { TextField } from "@mui/material";
import { changeUserSearchTerm } from "../../../redux/slices/userSlice";
import { useDispatch } from "react-redux";

export const ChatSearch = () => {
  const dispatch = useDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value.toLowerCase();
    dispatch(changeUserSearchTerm(text));
  };

  return (
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {}}
      variant="outlined"
      placeholder="Find a user"
      size="small"
      sx={{ background: "#eff7fe" }}
      onChange={handleChange}
    />
  );
};
