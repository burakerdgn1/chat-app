import { Box, Divider, Grid, Typography } from "@mui/material";
import AccountInformation from "../../components/AccountInformation/AccountInformation";
import AccountPP from "../../components/AccountPP/AccountPP";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useAccount from "../../hooks/useAccount";


const AccountPage = () => {
  const {
    userData,
    isLoading,
    user,
    handleProfilePictureChange,
    handleSaveClick,
    handleCancelClick,
    updateUserData,
  } = useAccount();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box
      p={2}
      flexGrow={1}
      height=" calc( 100vh - 100px)"
      sx={{ backgroundImage: ' url("/nbg.jpg")', backgroundSize: "cover" }}
    >
      <Typography component="h1" variant="h5" textAlign={"center"}>
        Account Details
      </Typography>
      <Divider />
      <Grid
        container
        spacing={2}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100%"}
      >
        <AccountPP
          profilePictureSrc={userData.profilePicture}
          handleProfilePictureChange={(e) => handleProfilePictureChange(e)}
          handleCancelClick={handleCancelClick}
          handleSaveClick={handleSaveClick}
        />
        <AccountInformation
          userData={user ? { ...user, profilePicture: "" } : userData}
          updateUserData={updateUserData}
        />
      </Grid>
    </Box>
  );
};
export default AccountPage;
