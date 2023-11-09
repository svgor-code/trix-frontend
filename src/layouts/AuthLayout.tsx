import { Sheet } from '@mui/joy';
import React from 'react';
import { MainHeader } from 'src/components/MainHeader';
import { ModeToggle } from 'src/components/ToggleTheme';
import { PropsWithChildren } from "src/types/components";

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <Sheet>
      <MainHeader />
      <ModeToggle />
      {children}
    </Sheet>
  )
}