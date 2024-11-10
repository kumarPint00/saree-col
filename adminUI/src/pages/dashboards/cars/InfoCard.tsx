import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { HumanFemale } from 'mdi-material-ui';

const InfoCard = ({ icon, title, mainValue, ocdValue, appValue }) => (
  <Card>
    {icon}
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4">{mainValue}</Typography>
      <Typography variant="body2">OCD Website: {ocdValue}</Typography>
      <Typography variant="body2">OCD Apps: {appValue}</Typography>
    </CardContent>
  </Card>
);

export default InfoCard;
