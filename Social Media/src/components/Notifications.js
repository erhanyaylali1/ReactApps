import React from 'react';
import { Grid, Typography, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

const Notifications = () => {
    const classes = useStyle();
    return (
        <Grid container>
            <Grid item xs={1} lg={3} />
            <Grid item container xs={10} lg={5} className={classes.root}>
                <Typography variant="h5" className={classes.title}><NotificationsNoneIcon />Notifications</Typography>
                <Grid item container xs={12} alignItems="center" className={classes.each}>
                    <Grid item container xs={2} lg={1}>
                        <Avatar />
                    </Grid>
                    <Grid item container xs={10} lg={11}>
                        <Typography variant="h6" className={classes.sender}>
                            Erhan Yaylalı liked your post. <Typography variant="body2">09.57</Typography>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item container xs={12} alignItems="center" className={classes.each}>
                    <Grid item container xs={2} lg={1}>
                        <Avatar />
                    </Grid>
                    <Grid item container xs={10} lg={11}>
                        <Typography variant="h6" className={classes.sender}>
                            Erhan Yaylalı liked your post. <Typography variant="body2">09.57</Typography>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item container xs={12} alignItems="center" className={classes.each}>
                    <Grid item container xs={2} lg={1}>
                        <Avatar />
                    </Grid>
                    <Grid item container xs={10} lg={11}>
                        <Typography variant="h6" className={classes.sender}>
                            Erhan Yaylalı liked your post. <Typography variant="body2">09.57</Typography>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={1} lg={3} />
        </Grid>
    )
}

export default Notifications


const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: "40px",
        backgroundColor: "#fff",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "1px 1px 5px 0px rgb(0 0 0 / 75%)"
    },
    title: {
        padding: "10px 15px",
        borderBottom: "1px solid rgba(30,30,30,0.3)",
        width: "100%",
        color: "#454545",
        marginBottom: "10px",
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
        "& svg": {
            marginRight: "8px",
            fontSize: "25px"
        }
    },
    sender: {
        marginLeft: "15px",
        display: "flex",
        alignItems: "center",
        "& p": {
            marginLeft: "15px",
            alignSelf: "flex-end"
        },
    },
    time: {
        marginLeft: "15px",
        display: "flex",
        alignItems: "flex-end"
    },
    each: {
        padding: "15px",
        borderRadius: "5px",
        "&:hover": {
            backgroundColor: "#eee"
        }
    }
}))