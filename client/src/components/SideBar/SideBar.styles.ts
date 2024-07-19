import { Drawer, styled } from "@mui/material";

const drawerWidth = 360;

export const StyledDrawer = styled(Drawer)`
  width: ${drawerWidth}px;
  flex-shrink: 0;
  .MuiDrawer-paper {
    width: ${drawerWidth}px;
    box-sizing: border-box;
    position: relative;
    border-radius: 10px 10px 0 0;
    background: #d6e4f2;
  }
  min-height: 415px;
  @media (max-width: 768px) {
    height: 300px;
    width: 100%;
    .MuiDrawer-paper {
      width: 100%;
    }
  }
`;