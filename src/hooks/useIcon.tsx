import React from "react";

export const useIcon = () => {
  const Icon = (path: string) => {
    return <img src={`./dist/${path}`} />;
  };

  return { Icon };
};
