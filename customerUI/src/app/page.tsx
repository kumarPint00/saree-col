'use client';
import Image from "next/image";
import styles from "./page.module.css";
import ToggleColorMode from './ToggleColorMode';
import React from "react";
import { PaletteMode } from "@mui/material";

export default function Home() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const toggleColorMode = () => {

    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };
  return (
    < >
      <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
     
    </>
  );
}
