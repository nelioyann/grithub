import React from "react";
import Avatar from "boring-avatars";
import { ColumnContainer, MediumParagraph } from "../../theme/globalStyles";

export interface IAvatar {
  username: string;
  size: number;
}
const UserAvatar: React.FC<IAvatar> = ({username, size}) => {
  return (
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
        name={username !== "" ? username : "Fellow Grithuber"}
        variant="beam"
        colors={["#8ecae6", "#219ebc", "#023047", "#ffb703", "#fb8500"]}
      />
      <MediumParagraph>{username !== "" ? username : "Guest"}</MediumParagraph>
    </ColumnContainer>
  );
};

export default UserAvatar;
