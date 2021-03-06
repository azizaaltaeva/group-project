import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useProducts } from "../../contexts/ItemsContext";
import { blueGrey } from "@material-ui/core/colors";
import CreateIcon from "@material-ui/icons/Create";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import MyLink from "../../shared/MyLink";
import { checkItemInCart } from "../../utils/check-cart";
import { commentsContext } from "../../contexts/CommentsContext";
import Comments from "../Comments/Comments";

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const useStyles = makeStyles((theme) => ({
  data_container: {
    [theme.breakpoints.up("md")]: {
      margin: "60px",
    },
  },
  text: {
    display: "block",
    fontSize: "24px",
    [theme.breakpoints.down('md')]: {
      fontSize: '20px'
    }
  },
  title: {
    fontSize: '28px',
    [theme.breakpoints.down('md')]: {
      fontSize: '20px'
    }
  },
  img: {
    width: "400px",
    marginLeft: "200px",
  },
  notes: {
    fontSize: "20px",
    margin: "10px 100px 10px 0",

    [theme.breakpoints.down('md')]: {
      fontSize: '18px'
    }

  },
  actions: {
    justifyContent: "space-around",
  },

  carousel: {
    width: '350px',
    margin: '20px auto',
    [theme.breakpoints.down('md')]: {
      width: '260px'
    }
  },
}));

const ItemsDetails = () => {
  const { fetchOneProduct, productDetails, deleteProduct, addToCart } =
    useProducts();
  const { id } = useParams();

  const cart = JSON.parse(localStorage.getItem("cart")) ?? false;
  // console.log(cart.decors);

  const [open, setOpen] = useState(false);
  const { addComment } = useContext(commentsContext);

  const handleClickOpenComment = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const isItemInCart = () => {
    if (cart) {
      return checkItemInCart(cart.decors, cart.decors.product.id);
    }
    return false;
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchOneProduct(id);
  }, [id]);

  const classes = useStyles();

  const handleReverse = () => {
    deleteProduct(id);
    navigate("/");
  };

  const [form, setForm] = useState({
    user: "",
    comment: "",
  });

  const handleChange = (e) => {
    const values = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(values);
  };

  const handleClickAdd = async () => {
    if (!form.user || !form.comment) {
      alert("I need your feedback");
      return;
    }
    await addComment(form);
    setForm("");
    setOpen(false);
  };

  return (
    <>
      <Grid container>
        {productDetails ? (
          <Grid container className={classes.data_container}>
            <Grid item md={5} sm={12}>
                <Carousel infiniteLoop useKeyboardArrows autoPlay className={classes.carousel}>
                    <div>
                        <img src={productDetails.image}/>
                    </div>
                    <div>
                        <img src={productDetails.image2}/>
                    </div>
                    <div>
                        <img src={productDetails.image3} />
                    </div>
                </Carousel>
            </Grid>
            <Grid item md={6} sm={12}>
              <Card className={classes.card}>
                <CardContent>
                  <h1 className={classes.title}>{productDetails.title}</h1>
                  <i className={classes.text}>Price: {productDetails.price}</i>
                  <i className={classes.text}>
                    Category: christmas {productDetails.category}
                  </i>
                  <h2 className={classes.title}>Byuer's notes</h2>
                  <p className={classes.notes}>{productDetails.notes}</p>
                  <MyLink to="/cart">
                    <IconButton>
                      <Button
                        style={{ color: blueGrey[500], marginBottom: 0 }}
                        variant="contained"
                        onClick={() => addToCart(productDetails)}
                      >
                        Add to Basket
                      </Button>
                    </IconButton>
                  </MyLink>
                </CardContent>
                <CardActions className={classes.actions}>
                  <IconButton>
                    <ChatBubbleOutlineIcon onClick={handleClickOpenComment} />
                  </IconButton>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">Comment me</DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        name="user"
                        id="user"
                        label="user"
                        type="email"
                        fullWidth
                        value={form.user}
                        onChange={handleChange}
                      />
                      <textarea
                        typeof="text"
                        name="comment"
                        value={form.comment}
                        onChange={handleChange}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="inherit">
                        Cancel
                      </Button>
                      <Button onClick={handleClickAdd} color="inherit">
                        Add
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <IconButton onClick={() => handleReverse(deleteProduct(id))}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton>
                    <MyLink to={`/edit/${productDetails.id}`}>
                      <CreateIcon />
                    </MyLink>
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
      <Comments />
    </>
  );
};

export default ItemsDetails;
