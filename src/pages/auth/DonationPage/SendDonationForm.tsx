import { Box, Button, Grid, Input, Sheet, Textarea, useTheme } from "@mui/joy";
import React, { useState } from "react";
import { FormField } from "src/components/Form/FormField";
import { SettingsFormWrapper } from "src/components/SettingsFormWrapper";
import { ISendDonation } from "src/types/donation";

export const SendDonationForm = () => {
  const theme = useTheme();

  const [state, setState] = useState<ISendDonation>({
    username: "",
    message: "",
    network: "",
    amount: 0,
  });

  const onChange = (field: keyof ISendDonation, value: string | number) => {
    setState((state) => ({ ...state, [field]: value }));
  };

  const onSend = () => {};

  return (
    <Sheet
      sx={{
        display: "flex",
        justifyContent: "center",
        marginX: theme.spacing(8),
        paddingY: theme.spacing(4),
      }}
    >
      <Sheet sx={{ minWidth: '50%' }}>
        <SettingsFormWrapper>
          <Box display="flex" flexDirection="column" gap={4}>
            <FormField label="Your username">
              <Input
                value={state.username}
                onChange={(e) => onChange("username", e.target.value)}
              />
            </FormField>

            <FormField label="Donation message">
              <Textarea
                minRows={5}
                value={state.message}
                onChange={(e) => onChange("message", e.target.value)}
              />
            </FormField>

            <FormField label="Amount">
              <Input
                type="number"
                value={state.message}
                onChange={(e) => onChange("message", e.target.value)}
              />
            </FormField>

            <Box display="flex" flexDirection="row-reverse">
              <Button size="lg" onClick={onSend}>
                Donate
              </Button>
            </Box>
          </Box>
        </SettingsFormWrapper>
      </Sheet>
    </Sheet>
  );
};
