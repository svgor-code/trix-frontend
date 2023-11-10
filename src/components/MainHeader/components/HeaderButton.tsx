import React from "react";
import { NavLink, useMatch } from "react-router-dom";
import { Link } from "@mui/joy";

type Props = {
  title: string;
  href: string;
};

export const HeaderLink = ({ title, href }: Props) => {
  const isActive = Boolean(useMatch(href));

  return (
    <NavLink to={href}>
      <Link
        sx={(theme) => ({
          color: isActive ? theme.palette.neutral.plainColor : theme.palette.neutral[400],
          fontWeight: theme.fontWeight.lg,
          padding: theme.spacing(1, 2),

          "&:hover": {
            textDecoration: "none",
            backgroundColor: theme.palette.neutral.plainHoverBg,
            borderRadius: theme.radius.lg,
          },
        })}
      >
        {title}
      </Link>
    </NavLink>
  );
};
