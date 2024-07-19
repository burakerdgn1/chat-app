import React, { useState } from "react";
import {
  ContainerGrid,
  StyledPaper,
  AvatarContainer,
  StyledAvatar,
  InputContainer,
  ButtonContainer,
  StyledButton,
} from "./AccountPP.styles";

interface AccountPPProps {
  profilePictureSrc: string;
  handleSaveClick: (event: React.FormEvent) => void;
  handleCancelClick: () => void;
  handleProfilePictureChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export const AccountPP: React.FC<AccountPPProps> = ({
  profilePictureSrc,
  handleProfilePictureChange,
  handleSaveClick,
  handleCancelClick,
}) => {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMode(false);
    handleSaveClick(e);
  };
  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    handleCancelClick();
    setEditMode(false);
  };

  const [editMode, setEditMode] = useState(false);

  return (
    <ContainerGrid item xs={9} sm={6} md={4} lg={3}>
      <StyledPaper elevation={3}>
        <AvatarContainer>
          <StyledAvatar src={profilePictureSrc} />
        </AvatarContainer>
        <InputContainer>
          <input
            accept="image/*"
            type="file"
            onChange={handleProfilePictureChange}
            data-edit-mode={editMode}
          />
        </InputContainer>
        <ButtonContainer>
          {!editMode ? (
            <StyledButton variant="contained" onClick={handleEditClick}>
              Edit
            </StyledButton>
          ) : (
            <>
              <StyledButton
                variant="contained"
                type="submit"
                onClick={handleSave}
              >
                Save
              </StyledButton>
              <StyledButton variant="contained" onClick={handleCancel}>
                Cancel
              </StyledButton>
            </>
          )}
        </ButtonContainer>
      </StyledPaper>
    </ContainerGrid>
  );
};
