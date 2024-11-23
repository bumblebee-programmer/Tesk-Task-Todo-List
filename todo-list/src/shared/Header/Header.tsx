import { AppBar, Container, Toolbar, Typography, Box } from "@mui/material";
import React from "react";
import Link from "next/link";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <Container>
      <AppBar position="static" className={styles.header}>
        <Toolbar className={styles.toolbar}>
          <Typography className={styles.title}>Список задач</Typography>

          <Box className={styles.links}>
            <Link href="/" className={styles.link}>
              Задачи
            </Link>
            <Link href="/completed" className={styles.link}>
              Выполненные задачи
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Header;
