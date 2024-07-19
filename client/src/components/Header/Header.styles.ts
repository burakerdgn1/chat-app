import { AppBar, Box, Toolbar, Typography, styled } from "@mui/material";

export const StyledHeader = styled(AppBar)`
  position: static;
`;

export const ToolbarContainer = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  text-align: center;
`;

export const LogoContainer = styled(Box)`
  height: 100%;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 8px;

  img {
    height: 100%;
    min-width: 100%;
    padding: 4px;
  }
`;

export const ButtonContainer = styled(Box)`
  display: flex;
  gap: 10px;
  float: right;
  margin: 16px;

  @media (max-width: 321px) {
    gap: 1px;
  }
`;

export const StyledTypography = styled(Typography)`
  font-size: ${({ theme }) => theme.typography.h6.fontSize};

  @media (min-width: 425px) {
    font-size: ${({ theme }) => theme.typography.h5.fontSize};
  }
  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.typography.h4.fontSize};
  }
  @media (min-width: 2560px) {
    font-size: ${({ theme }) => theme.typography.h3.fontSize};
  }
`;