import React from "react";
import { NavLink, useMatch } from "react-router-dom";
import { Box, Button, Link } from "@mui/joy";

type Props = {
  title: string;
  href: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
};

export const HeaderLink = ({ title, href, Icon }: Props) => {
  const isActive = Boolean(useMatch(href));

  return (
    <NavLink to={href}>
      <Link
        component="div"
        sx={(theme) => ({
          color: isActive
            ? theme.palette.neutral.plainColor
            : theme.palette.neutral[400],
          fontWeight: theme.fontWeight.lg,
          padding: theme.spacing(1, 2),

          "&:hover": {
            textDecoration: "none",
            backgroundColor: theme.palette.neutral.plainHoverBg,
            borderRadius: theme.radius.lg,
          },

          [theme.breakpoints.down("md")]: {
            padding: 0,
            paddingRight: "10px",
          },
        })}
      >
        <Box
          sx={(theme) => ({
            [theme.breakpoints.down("md")]: {
              display: "none",
            },
          })}
        >
          {title}
        </Box>
        <Button
          variant="outlined"
          sx={(theme) => ({
            borderRadius: theme.radius.lg,
            display: "flex",
            height: "48px",
            alignItems: "cetner",
            justifyContent: "center",
            border: "1px solid",
            borderColor: theme.palette.neutral.outlinedBorder,
            padding: "6px 16px",
            color: theme.palette.neutral.outlinedColor,
            outline: "none !important",

            "& svg": {
              width: "20px",
              height: "20px",
            },

            [theme.breakpoints.up("md")]: {
              display: "none",
            },
          })}
        >
          <Icon />
        </Button>
      </Link>
    </NavLink>
  );
};
