import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

const Review = ({ token }) => {
    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Order Summary
            </Typography>
            <List disablePadding>
                {token.live.line_items.map((product) => (
                    <ListItem key={product.id} style={{ padding: '10px 0' }}>
                        <ListItemText
                            primary={product.name}
                            secondary={`Quanity ${product.quanity}`}
                        />
                        <Typography variant="body2">
                            {product.line_total.formatted_with_symbol}
                        </Typography>
                    </ListItem>
                ))}
                <ListItem style={{ padding: '10px 0'}}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                        {token.live.subtotal.formatted_with_symbol}
                    </Typography>
                </ListItem>
            </List>
        </div>
    )
}

export default Review
