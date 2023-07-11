import React, { useState } from "react";
import { Typography, makeStyles, Button, Grid, Card } from "@material-ui/core";
import Background from "./Background";
import { Form, Input } from "antd";
import { Link } from "react-router-dom";
import TextArea from "antd/lib/input/TextArea";
import AppleIcon from "@material-ui/icons/Apple";

const Contact = () => {
  const classes = useStyle();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");

  return (
    <div className={classes.root}>
      <Background isSignIn={true} />
      <Grid container justifyContent="center">
        <Grid item container md={6}>
          <Card className={classes.form}>
            <Link to="/" className={classes.logo}>
              <AppleIcon />
              <Typography variant="subtitle1">Apple</Typography>
            </Link>
            <Typography variant="h4" align="center" className={classes.title}>
              Contact With Us
            </Typography>
            <Form>
              <Form.Item className={classes.form_item}>
                <Typography variant="body1">Name & Surname</Typography>
                <Input
                  className={classes.input}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>
              <Form.Item className={classes.form_item}>
                <Typography variant="body1">Phone</Typography>
                <Input
                  className={classes.input}
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Item>
              <Form.Item className={classes.form_item}>
                <Typography variant="body1">Email</Typography>
                <Input
                  className={classes.input}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item className={classes.form_item}>
                <Typography variant="body1">Question</Typography>
                <TextArea
                  rows={4}
                  className={classes.input}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </Form.Item>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                style={{ marginTop: "20px" }}
              >
                Submit
              </Button>
            </Form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Contact;

const useStyle = makeStyles({
  root: {
    paddingBottom: "70px",
    background: "black",
  },
  logo: {
    position: "absolute",
    left: "25px",
    top: "25px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    "& svg": {
      color: "black",
      fontSize: "40px",
      marginRight: "10px",
    },
    "&:hover h6": {
      opacity: "1",
      visibility: "visible",
    },
    "& h6": {
      opacity: "0",
      visibility: "hidden",
      marginTop: "5px",
      fontSize: "1.3rem",
      fontWeight: "bold",
      transition: "all 0.2s ease",
    },
  },
  title: {
    marginBottom: "20px",
  },
  form_item: {
    marginBottom: "30px !important",
    "& p": {
      marginBottom: "5px",
      fontWeight: "bolder",
    },
    display: "flex",
  },
  input: {
    border: "1px solid #333",
    background: "transparent !important",
    padding: "5px 10px",
    fontSize: "15px",
  },
  form: {
    position: "relative",
    width: "100%",
    padding: "30px",
  },
});
