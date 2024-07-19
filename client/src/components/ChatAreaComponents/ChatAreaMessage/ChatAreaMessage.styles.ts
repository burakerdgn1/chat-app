import { Avatar, Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const MessageContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== "justifyContent",
}) <{ justifyContent: string }>`
    display: flex;
    flex-direction: column;
    justify-content: ${(props) => props.justifyContent};
    margin-bottom: 8px;
  `;

export const MessageInnerContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== "alignSelf",
}) <{ alignSelf: string }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    align-self: ${(props) => props.alignSelf};
  `;

export const StyledImage = styled("img")`
    background-color: purple;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    object-fit: cover;
  `;

export const StyledAvatar = styled(Avatar)`
    background-color: purple;
    height: 48px;
    width: 48px;
  `;

export const MessagePaper = styled(Paper, {
    shouldForwardProp: (prop) => prop !== "borderRadius",
}) <{ borderRadius: string }>`
    padding: 10px;
    margin: 5px;
    width: auto;
    border-radius: ${(props) => props.borderRadius};
    word-break: break-word;
  `;

export const TimestampTypography = styled(Typography, {
    shouldForwardProp: (prop) => prop !== "alignSelf",
}) <{ alignSelf: string }>`
    text-align: center;
    align-self: ${(props) => props.alignSelf};
  `;
