import React from "react";
import {
  Step,
  StepIndicator,
  Stepper,
  Typography,
  stepClasses,
  stepIndicatorClasses,
} from "@mui/joy";
import {
  PaperAirplaneIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { TxStep } from "src/hooks/useContract";

export const TransactionProgress = ({
  transactionStep,
  isError,
}: {
  isError: boolean;
  transactionStep: TxStep;
}) => {
  return (
    <Stepper
      size="lg"
      sx={{
        "--Stepper-verticalGap": "2.5rem",
        "--StepIndicator-size": "3rem",
        "--Step-gap": "1rem",
        "--Step-connectorInset": "0.5rem",
        "--Step-connectorRadius": "1rem",
        "--Step-connectorThickness": "4px",
        "--joy-palette-success-solidBg": "var(--joy-palette-success-400)",
        width: "100%",
        [`& .${stepClasses.root}`]: {
          flexDirection: "column-reverse",
          "&::after": {
            top: "unset !important",
            bottom: "25%",
          },

          [`& .${stepIndicatorClasses.root}`]: {
            borderWidth: "2px",
            padding: "10px",
          },
        },
        [`& .${stepClasses.completed}::after`]: {
          bgcolor: isError ? "error.500" : "primary.500",
        },
        [`& .${stepClasses.active} .${stepIndicatorClasses.root}`]: {
          borderColor: isError ? "error.500" : "primary.500",
        },
        [`& .${stepClasses.root}:has(+ .${stepClasses.active})::after`]: {
          color: isError ? "error.500" : "primary.500",
          backgroundColor: "transparent",
          backgroundImage: "radial-gradient(currentColor 2px, transparent 2px)",
          backgroundSize: "7px 7px",
          backgroundPosition: "center left",
        },
        [`& .${stepClasses.disabled} *`]: {
          color: "neutral.plainDisabledColor",
        },
      }}
    >
      <Step
        active={transactionStep === "approving"}
        completed={transactionStep === "sending" || transactionStep === "done"}
        orientation="vertical"
        indicator={
          <StepIndicator
            variant={
              transactionStep === "sending" ||
              transactionStep === "done" ||
              transactionStep === "approving"
                ? "solid"
                : "outlined"
            }
            color="primary"
          >
            <ShieldCheckIcon />
          </StepIndicator>
        }
      >
        <Typography level="body-md" fontWeight="xl">
          Approve
        </Typography>
      </Step>
      <Step
        active={transactionStep === "sending"}
        completed={transactionStep === "done"}
        orientation="vertical"
        indicator={
          <StepIndicator
            variant={
              transactionStep === "sending" || transactionStep === "done"
                ? "solid"
                : "outlined"
            }
            color="primary"
          >
            <PaperAirplaneIcon />
          </StepIndicator>
        }
      >
        <Typography level="body-md" fontWeight="xl">
          Sending
        </Typography>
      </Step>
      <Step
        completed={transactionStep === "done"}
        orientation="vertical"
        indicator={
          <StepIndicator
            variant={transactionStep === "done" ? "solid" : "outlined"}
            color="primary"
          >
            <SparklesIcon />
          </StepIndicator>
        }
      >
        <Typography level="body-md" fontWeight="xl">
          Done
        </Typography>
      </Step>
    </Stepper>
  );
};
