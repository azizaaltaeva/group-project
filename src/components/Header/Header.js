import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { ShoppingBasket } from "@material-ui/icons";
import Badge from "@material-ui/core/Badge";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  colorPrimary: {
    backgroundColor: theme.palette.secondary,
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },

  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  featuresPost: {
    position: "relative",
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  featuresPostContent: {
    position: "relative",
    padding: theme.spacing(2),
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundOverlay: "rgba(0,0,0.3)",
  },
}));

export default function Header() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: "crimson" }}>
          <Toolbar className={classes.colorPrimary}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              WINTER IS COMING
            </Typography>
            <IconButton aria-label="show 2 new mails" color="inherit">
              <Badge badgeContent={1} color="secondary">
                <ShoppingBasket />
              </Badge>
            </IconButton>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <Box mr={2} ml={2}>
              <Button color="inherit" onClick={handleClickOpen}>
                Log in
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Log in</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Log in to get more content
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email/name"
                    type="email"
                    fullWidth
                  />
                  <TextField
                    margin="dense"
                    id="pass"
                    label="Password"
                    type="password"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="inherit">
                    Cancel
                  </Button>
                  <Button onClick={handleClose} color="inherit">
                    Log in
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>

            <Button color="inherit" variant="outlined">
              Sign Up
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <Paper
        className={classes.featuresPost}
        style={{
          backgroundImage: `url(https://images.theconversation.com/files/306448/original/file-20191211-95111-fbz9rf.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop)`,
        }}
      >
        <Container fixed>
          <div className={classes.overlay} />
          <Grid container>
            <Grid item md={6}>
              <div className={classes.featuresPostContent}>
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                >
                  Зима близко
                </Typography>
                <Typography component="h5" color="inherit" paragraph>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Magnam, perferendis amet in delectus, architecto dignissimos
                  quos tempora eos laborum sint consectetur quibusdam adipisci!
                </Typography>
                <Button variant="contained" color="secondary">
                  Learn more
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  );
}
// https://source.unsplash.com/random
