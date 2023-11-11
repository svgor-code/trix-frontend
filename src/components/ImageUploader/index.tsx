import { Sheet, useTheme } from "@mui/joy";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { PhotoIcon } from "@heroicons/react/24/outline";

const fileTypes = ["JPG", "PNG", "GIF"];

// type Props = {}

export const ImageUploader = () => {
  const theme = useTheme();
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (file: File) => {
    setFile(file);
  };

  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
      <Sheet
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: "2px dashed",
          padding: theme.spacing(6),
          borderRadius: theme.radius.lg,
          borderColor: theme.palette.neutral.outlinedBorder,
          background: theme.palette.neutral.softBg,
          cursor: 'pointer',
        
          "& svg": {
            width: "64px",
            height: "64px",
          }
        }}
      >
        <PhotoIcon />
      </Sheet>
    </FileUploader>
  );
};
