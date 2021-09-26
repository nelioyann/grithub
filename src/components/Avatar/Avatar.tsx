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
    <IonCard className="ion-padding" style={{width: "max-content"}}>
      <ColumnContainer
        style={{
          borderRadius: "50%",
          margin: "1em auto",
          width: "max-content",
          alignItems: "center",
        }}
      >
        <Avatar
          size={size}
          name={username !== "" ? username : "Grithuber"}
          variant="beam"
          colors={["#8ecae6", "#219ebc", "#023047", "#ffb703", "#fb8500"]}
        />
        <MediumParagraph style={{marginBottom: "0"}}>
          Username: {username !== "" ? username : "Guest"}
        </MediumParagraph>
        <MediumParagraph >
         {email !== "" ? email : "Trying as a guest"}
        </MediumParagraph>
      </ColumnContainer>
    </IonCard>
  );
};

export default UserAvatar;
