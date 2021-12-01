import React from "react";
import Avatar from "boring-avatars";
import { ColumnContainer, MediumParagraph } from "../../theme/globalStyles";
import { IonCard } from "@ionic/react";

export interface IAvatar {
  username: string;
  size: number;
  email?: string;
}
const UserAvatar: React.FC<IAvatar> = ({ username, size, email }) => {
  return (
    <IonCard className="ion-padding" color="light" mode="ios" style={{ width: "100%", margin: "1em auto", display: "flex", gap: "1em", justifyContent: "flex-start", borderLeft: "2px solid var(--ion-color-primary)"}}>
      <ColumnContainer
        style={{
          borderRadius: "50%",
          margin: "1em 0",
          width: "max-content",
          alignItems: "center",
          overflow: "hidden"
        }}
      >
        <Avatar
          size={size}
          name={username !== "" ? username : "Stranger"}
          variant="beam"
          colors={["#8ecae6", "#219ebc", "#023047", "#ffb703", "#fb8500"]}
        />
      </ColumnContainer>
      <ColumnContainer style={{justifyContent: "center"}}>
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
