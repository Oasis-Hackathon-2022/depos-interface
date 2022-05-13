import React from "react";
import {
  Box,
  Button,
  Container,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { Colors } from "../constants/colors";
import BaseColoredButton from "./BaseColoredButton";

const steps = [
  {
    label: "Legal statement",
    description: `Statements of legal registration and responsibilities.`,
  },
  {
    label: "The logical analysis",
    description:
      "An overview and go deeper to DEPO’s well-designed logical system.",
  },
  {
    label: "Mathematic Mode",
    description: `Math doesn’t lie.`,
  },
  {
    label: "Example",
    description: `Know about how DEPO work with an general case of investment.`,
  },
];

const WhitePaper = () => {
  return (
    <Container maxWidth={"xl"}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingY: 10,
        }}
      >
        <Box sx={{ width: "500px" }}>
          <Typography variant={"h5"} color={Colors.blue100}>
            White Paper
          </Typography>
          <Typography variant={"h3"}>
            Legal statements and Business model
          </Typography>
          <Typography>
            Here is our white paper which includes the details of the project,
            see the document to find legal statements and business model of our
            project.
          </Typography>
          <a
            href={"https://deposit-1.gitbook.io/deposit-docs/"}
            target={"_blank"}
            style={{ textDecoration: "none" }}
            rel={"noreferrer noopenner"}
          >
            <BaseColoredButton>
              <Typography>Download Now</Typography>
            </BaseColoredButton>
          </a>
        </Box>
        <Box sx={{ width: "400px" }}>
          <Stepper orientation={"vertical"}>
            {steps.map((step, index) => {
              return (
                <Step key={step.label} active={true}>
                  <StepLabel>{step.label}</StepLabel>
                  <StepContent>
                    <Typography>{step.description}</Typography>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
        </Box>
      </Box>
    </Container>
  );
};

export default WhitePaper;
