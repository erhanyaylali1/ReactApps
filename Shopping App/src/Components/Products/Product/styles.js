import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    root: {
        maxWidth: '100%',
        '&:hover': {
            boxShadow: '0px 0px 4px 1px rgba(0,0,0,0.75)'
        }
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