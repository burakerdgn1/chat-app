import {
  Menu, MenuItem
} from "@mui/material";
import { styled } from "@mui/system";

export const StyledMenu = styled(Menu)`
  & .MuiPaper-root {
    overflow: visible;
    filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.32));
    margin-top: 12px;
    position: fixed;
    & .MuiAvatar-root {
      width: 32px;
      height: 32px;
      margin-left: -4px;
      margin-right: 8px;
    }
    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 14px;
      width: 10px;
      height: 10px;
      background-color: ${({ theme }) => theme.palette.background.paper};
      transform: translateY(-50%) rotate(45deg);
      z-index: 0;
    }
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  & .MuiAvatar-root {
    width: 32px;
    height: 32px;
    margin-left: -4px;
    margin-right: 8px;
  }
`;
