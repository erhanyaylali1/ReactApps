import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Icon, Form } from "semantic-ui-react";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import WOW from "wow.js";
import { send } from "emailjs-com";
import { message } from "antd";

const Contact = () => {
  const width = window.innerWidth;
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const wow = new WOW();
    wow.init();
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    const infos = {
      from_name: name,
      to_name: "Erhan Yaylalı",
      message: content,
      reply_to: "erhanyaylali9@gmail.com",
    };

    send(
      "service_jb8gjbo",
      "template_9m24rwt",
      infos,
      "user_ZluoX0lqzOOy2QYqXllv1"
    )
      .then(() => {
        message.success("Email Sent Successfully!");
      })
      .catch(() => {
        message.error("Email Could not Sent!");
      });
  };

  return (
    <Grid
      container
      alignItems="flex-start"
      justify="center"
      className={classes.root}
      id="Contact"
      style={{ paddingTop: width < 450 ? "20px" : "20px" }}
    >
      <Grid
        container
        item
        xs={10}
        md={6}
        justify="center"
        className="wow bounceInLeft"
        data-wow-duration="1s"
        data-wow-delay="0.5s"
      >
        <Form className={classes.form} onSubmit={sendEmail}>
          <Grid
            className="wow bounceInLeft"
            data-wow-duration="1s"
            data-wow-delay="0.5s"
          >
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.contact}
            >
              <ContactSupportIcon className={classes.icon} fontSize="large" />
              <Typography
                className={classes.title}
                align="center"
                style={{ fontSize: width < 450 ? "25px" : "35px" }}
              >
                Contact Me
              </Typography>
            </Grid>
          </Grid>
          <Form.Input
            fluid
            label="Name Surname"
            placeholder="Name"
            value={name}
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Input
            fluid
            label="Email Address"
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.TextArea
            fluid
            label="Content"
            placeholder="Content"
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            variant="contained"
            className={classes.sendbutton}
            type="submit"
          >
            Send
          </Button>
        </Form>
      </Grid>
      <Grid container item xs={12} justify="center" className={classes.infos}>
        <Grid
          item
          container
          xs={12}
          justify="center"
          className="wow bounceInLeft"
          data-wow-duration="1s"
          data-wow-delay="0.5s"
        >
          <Typography
            style={{ fontSize: width < 450 ? "12px" : "16px" }}
            className={classes.socialInfo}
            variant="overline"
          >
            E-Mail: erhanyaylali9@gmail.com
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          justify="center"
          className="wow bounceInLeft"
          data-wow-duration="1s"
          data-wow-delay="0.5s"
        >
          <Typography
            style={{ fontSize: width < 450 ? "12px" : "16px" }}
            className={classes.socialInfo}
            variant="overline"
          >
            Mobile Phone: +45 50 23 19 14
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} justify="center" className={classes.socials}>
        <Grid
          container
          item
          xs={6}
          lg={6}
          className="wow bounceInLeft"
          data-wow-duration="1s"
          data-wow-delay="0.5s"
        >
          <Grid xs={12} md={3} item className={classes.items}>
            <a
              href="mailto:erhanyaylali9@gmail.com"
              className={classes.button}
              style={{ fontSize: width < 450 ? "1.3rem" : "1.3rem" }}
            >
              <Icon name="mail" />
              <p>GMAIL</p>
            </a>
          </Grid>
          <Grid xs={12} md={3} item className={classes.items}>
            <a
              href="https://www.linkedin.com/in/erhanyaylali/"
              className={classes.button}
              style={{ fontSize: width < 450 ? "1.3rem" : "1.3rem" }}
            >
              <Icon name="linkedin" />
              <p>LinkedIn</p>
            </a>
          </Grid>
          <Grid xs={12} md={3} item className={classes.items}>
            <a
              href="https://github.com/erhanyaylali1/"
              className={classes.button}
              style={{ fontSize: width < 450 ? "1.3rem" : "1.3rem" }}
            >
              <Icon name="github" />
              <p>Github</p>
            </a>
          </Grid>
          <Grid xs={12} md={3} item className={classes.items}>
            <a
              href="https://www.instagram.com/erhanyaylali/"
              className={classes.button}
              style={{ fontSize: width < 450 ? "1.3rem" : "1.3rem" }}
            >
              <Icon name="instagram" />
              <p>Instagram</p>
            </a>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Contact;

const useStyles = makeStyles(() => ({
  icon: {
    color: "white",
    marginRight: "10px",
  },
  contact: {
    margin: "30px 0",
  },
  socials: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  socialInfo: {
    color: "white",
    textTransform: "initial",
  },
  title: {
    color: "white",
  },
  form: {
    width: "100%",
    "& label": {
      color: "white !important",
      marginBottom: "15px !important",
      fontSize: "16px !important",
    },
  },
  root: {
    height: "95vh",
    backgroundColor: "#3D138D",
  },
  sendbutton: {
    float: "right",
    marginTop: "10px",
  },
  button: {
    color: "#bbb",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10px",
    "&:hover": {
      transform: "scale(1.1)",
      color: "#fff",
    },
    "& > i": {
      marginRight: "15px",
    },
  },
  items: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    fontSize: "1.5rem",
  },
}));
