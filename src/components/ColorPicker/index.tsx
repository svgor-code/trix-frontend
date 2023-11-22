import { Box, Sheet, useTheme } from "@mui/joy";
import React, { useRef, useState } from "react";
import { ChromePicker } from "react-color";
import useOnClickOutside from "src/hooks/useOnClickOutside";

type Props = {
  color: string;
  setColor: (color: string) => void;
};

export const ColorPicker = ({ color, setColor }: Props) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} style={{ width: "50px" }}>
      <Sheet
        sx={{
          cursor: "pointer",
          border: "1px solid",
          background: color ? color : "transparent",
          borderRadius: theme.radius.lg,
          borderColor: theme.palette.neutral.outlinedBorder,
          height: "50px",
          position: "relative",
        }}
        onClick={() => setOpen(true)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50px",
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
