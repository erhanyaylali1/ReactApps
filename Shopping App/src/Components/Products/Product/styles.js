import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    root: {
        maxWidth: '100%',
    },
    media: {
        height: 0,
        paddingTop: '100%',
    },
    cardActions: {
        display: 'flex',
    },
    cardContent : {
        display: 'flex',
        justifyContent: 'space-between',
    },
    productName: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
    }
}));