import { Box, Sheet, useTheme } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import React, { useRef, useState } from "react";
import { ChromePicker } from "react-color";
import useOnClickOutside from "src/hooks/useOnClickOutside";

type Props = {
  color: string;
  setColor: (color: string) => void;
  style?: React.CSSProperties;
};

export const ColorPicker = ({ color, style, setColor }: Props) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} style={{ width: "30px", ...style }}>
      <Sheet
        sx={{
          cursor: "pointer",
          border: "1px solid",
          background: color ? color : "transparent",
          borderRadius: "100%",
          borderColor: theme.palette.neutral.outlinedBorder,
          height: "30px",
          position: "relative",
        }}
        onClick={() => setOpen(true)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50px",
            zIndex: 2,
          }}
        >
          {open && (
            <ChromePicker
              color={color}
              onChange={(value) => setColor(value.hex)}
            />
          )}
        </Box>
      </Sheet>
    </div>
  );
};
