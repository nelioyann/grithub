import React from "react";
import Avatar from "boring-avatars";
import { ColumnContainer, MediumParagraph } from "../../theme/globalStyles";
import { IonCard } from "@ionic/react";
import styled from "styled-components";

const StyledWrapper = styled.div`

  svg {
  border-radius: 8px;
  }
`
export interface IAvatar {
  username: string;
  size: number;
  email?: string;
  isAButton?: boolean;
}
const UserAvatar: React.FC<IAvatar> = ({ username, size, email, isAButton }) => {
  return (
    <IonCard routerLink={isAButton ? "/name" : undefined} button={Boolean(isAButton)} className="ion-padding" color="light" mode="ios" style={{
      width: "100%", maxWidth: "20em", margin: "1em auto", display: "flex", gap: "1em", justifyContent: "flex-start", borderLeft: "2px solid var(--ion-color-primary)",
      boxShadow: "0px 0px 0px 1px rgba(var(--ion-color-dark-rgb), 0.21)", flexDirection: "column", alignItems: "center"
    }}>
      <StyledWrapper
        style={{
          margin: "1em auto",
          width: "max-content",
          alignItems: "center",
        }}
      >
        <Avatar
          size={size}
          name={username !== "" ? username : "Stranger"}
          variant="beam"
          colors={["#8ecae6", "#219ebc", "#023047", "#ffb703", "#fb8500"]}
        />
      </StyledWrapper>
      <ColumnContainer style={{ justifyContent: "center", textAlign: "center" }}>
        <MediumParagraph style={{ marginBottom: "0" }}>
          {username !== "" ? username : "Stranger"}
        </MediumParagraph>
        {email && (
          <MediumParagraph>
            {email !== "" ? email : "Trying as a guest"}
          </MediumParagraph>
        )}
      </ColumnContainer>
    </IonCard>
  );
};

export default UserAvatar;
