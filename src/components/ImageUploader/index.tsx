import { Sheet, useTheme } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { PhotoIcon } from "@heroicons/react/24/outline";

const fileTypes = ["JPG", "PNG", "GIF"];

type Props = {
  image: string;
  setImage: (image: string) => void;
};

export const ImageUploader = ({ image, setImage }: Props) => {
  const theme = useTheme();

  const handleChange = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target?.result as string);
    };

    reader.readAsDataURL(file);
  };

  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
      <Sheet
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px dashed",
          height: "200px",
          borderRadius: theme.radius.lg,
          borderColor: theme.palette.neutral.outlinedBorder,
          background: theme.palette.neutral.softBg,
          cursor: "pointer",

          "& svg": {
            width: "64px",
            height: "64px",
          },

          "& img": {
            borderRadius: theme.radius.lg,
          },
        }}
      >
        {image ? <img src={image} width="100%" height="100%" /> : <PhotoIcon />}
      </Sheet>
    </FileUploader>
  );
};
