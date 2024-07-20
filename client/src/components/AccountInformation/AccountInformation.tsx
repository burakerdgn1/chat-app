import { Grid, Paper, Typography, Divider, TextField } from "@mui/material";
import React from "react";
import { FormContainer } from "./AccountInformation.styles";
interface AccountInfoProps {
  userData: {
    fullName: string;
    userName: string;
    email: string;
    profilePicture: string;
  };

  updateUserData: (newData: {
    fullName: string;
    userName: string;
    email: string;
    profilePicture: string;
  }) => void;
}

const AccountInformation: React.FC<AccountInfoProps> = ({ userData }) => {
  // const [formData, setFormData] = useState<{
  //   fullName: string;
  //   userName: string;
  //   email: string;
  //   profilePicture: string;
  // }>(userData);

  // useEffect(() => {
  //   setFormData(userData);
  // }, [userData]);

  // const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Paper elevation={3}>
        <FormContainer p={2} component="form">
          <Typography variant="h6">Account Information</Typography>
          <Divider sx={{ my: 2 }} />
          <TextField
            label="Full Name"
            defaultValue={userData.fullName}
            // onChange={handleFormChange}
            fullWidth
            margin="normal"
            id="fullName"
            name="fullName"
            disabled
            type="text"
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       {userData.fullName.length < 7 && <Error />}{" "}
            //     </InputAdornment>
            //   ),
            // }}
          />
          <TextField
            label="Username"
            defaultValue={userData.userName}
            // onChange={handleFormChange}
            fullWidth
            margin="normal"
            id="userName"
            name="userName"
            disabled
            type="text"
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       {userData.userName.length < 5 && <Error />}{" "}
            //     </InputAdornment>
            //   ),
            // }}
          />
          <TextField
            label="Email"
            defaultValue={userData.email}
            // onChange={handleFormChange}
            fullWidth
            margin="normal"
            disabled
            id="email"
            name="email"
            type="email"
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       {!validator.isEmail(userData.email) && <Error />}{" "}
            //     </InputAdornment>
            //   ),
            // }}
          />
          <TextField
            label="Password"
            defaultValue="********"
            // onChange={handleFormChange}
            fullWidth
            margin="normal"
            type="password"
            id="password"
            name="password"
            disabled
          />
        </FormContainer>
      </Paper>
    </Grid>
  );
};

export default AccountInformation;
