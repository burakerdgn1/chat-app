import { Avatar, Box, Toolbar } from "@mui/material";
import { styled } from "@mui/system";

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#FF760E",
  height: "100px",
  borderRadius: "10px 10px 0 0",
  overflow: "hidden",
  minHeight: "64px !important",
}));

export const ProfilePicture = styled("img")({
  backgroundColor: "purple",
  height: "48px",
  width: "48px",
  borderRadius: "50%",
  objectFit: "cover",
});

export const StyledAvatar = styled(Avatar)({
  backgroundColor: "purple",
  height: "48px",
  width: "48px",
});

export const FlexBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "24px",
});

export const ButtonBox = styled(Box)({
  display: "flex",
  gap: "0px",
  float: "right",
});
