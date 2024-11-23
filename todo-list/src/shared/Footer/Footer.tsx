import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import styles from "./Footer.module.scss";
const Footer = () => {
  return (
    <Container>
      <AppBar position="static" className={styles.appBar}>
        <Toolbar>
          <Typography variant="body1" className={styles.typography}>
            Designe by Ruslan Shmelev
          </Typography>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Footer;
