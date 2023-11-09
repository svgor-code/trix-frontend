import React from 'react';
import { Link } from '@mui/joy';

type Props = {
  title: string;
  href: string;
}

export const HeaderLink = ({ title, href }: Props) => {  
  return (
    <Link sx={theme => ({
      color: theme.palette.neutral[500],
      fontWeight: theme.fontWeight.lg,
      padding: theme.spacing(1, 2),

      '&:hover': {
        textDecoration: 'none',
        backgroundColor: theme.palette.background.level2,
        borderRadius: theme.radius.lg,
      }
    })} href={href}>{title}</Link>
  )
};