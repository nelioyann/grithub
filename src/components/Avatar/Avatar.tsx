import React from "react";
import Avatar from "boring-avatars";
import { ColumnContainer, LargeParagraph, MediumParagraph, RowContainer, SmallParagraph } from "../../theme/globalStyles";
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
      width: "100%", margin: "1em auto", display: "flex", gap: "1em", justifyContent: "flex-start", borderLeft: "2px solid var(--ion-color-primary)",
      boxShadow: "0px 0px 0px 1px rgba(var(--ion-color-dark-rgb), 0.21)", flexDirection: "column", alignItems: "center"
    }}>
      <RowContainer style={{gap: "1em", width: "100%"}}>

      <StyledWrapper
        style={{
          margin: "1em 0",
          alignItems: "center",
        }}
      >
        <Avatar
          size={size}
          name={username !== "" ? username : "Nameless Griter"}
          variant="beam"
          colors={["#8ecae6", "#219ebc", "#023047", "#ffb703", "#fb8500"]}
        />
      </StyledWrapper>
      <ColumnContainer style={{ justifyContent: "center"}}>
        <LargeParagraph style={{ marginBottom: "0" }}>
          {username !== "" ? username : "Nameless Griter"}
        </LargeParagraph>
        {/* { ( */}
          <SmallParagraph >
            {email && email !== "" ? email : "You haven't created an account - if you log out you will lose your data"}
          </SmallParagraph>
        {/* )} */}
      </ColumnContainer>
      </RowContainer>

    </IonCard>
  );
};

export default UserAvatar;
