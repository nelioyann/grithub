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
    <IonCard className="ion-padding" style={{ width: "max-content", margin: "1em auto"}}>
      <ColumnContainer
        style={{
          borderRadius: "50%",
          margin: "1em auto",
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
      <MediumParagraph style={{ marginBottom: "0" }}>
        Username: {username !== "" ? username : "Stranger"}
      </MediumParagraph>
      {email && (
        <MediumParagraph>
          {email !== "" ? email : "Trying as a guest"}
        </MediumParagraph>
      )}
    </IonCard>
  );
};

export default UserAvatar;
