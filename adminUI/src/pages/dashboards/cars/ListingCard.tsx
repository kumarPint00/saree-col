import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ListingCard = ({ title, value1, value2 }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4">{value1}</Typography>
      <Typography variant="body2">{value2}</Typography>
    </CardContent>
  </Card>
);

export default ListingCard;
