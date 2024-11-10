import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Typography, Link
} from '@mui/material';
import { Email, Phone, } from 'mdi-material-ui';

interface Lead {
  carDetail: string;
  leadDetail: {
    name: string;
    phone: string;
    email: string;
  };
  device: string;
  date: string;
}

interface LeadsTableProps {
  leads: Lead[];
}

const LeadsTable: React.FC<LeadsTableProps> = ({ leads }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Car Detail</TableCell>
            <TableCell>Lead Detail</TableCell>
            <TableCell>Device</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leads.map((lead, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="body2" color="primary">
                  <Link href="#">{lead.carDetail}</Link>
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {lead.date}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">{lead.leadDetail.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  <Phone/>
                  <Link href={`tel:${lead.leadDetail.phone}`}>{lead.leadDetail.phone}</Link>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <Email/>
                  <Link href={`mailto:${lead.leadDetail.email}`}>{lead.leadDetail.email}</Link>
                </Typography>
                <Button variant="contained" color="primary" size="small">
                  View Message
                </Button>
              </TableCell>
              <TableCell>{lead.device}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Example usage
const leads: Lead[] = [
  {
    carDetail: 'Nissan Sunny 2023',
    leadDetail: {
      name: 'Burmaa',
      phone: '+971504527858',
      email: 'ms.buo315@gmail.com',
    },
    device: 'Website',
    date: 'February 24, 2024 06:21 PM',
  },
  {
    carDetail: 'Mazda CX5 2024',
    leadDetail: {
      name: 'Shifa saifi',
      phone: '+41792581358',
      email: 'shifa@gmail.com',
    },
    device: 'Website',
    date: 'February 06, 2024 11:23 AM',
  },
  {
    carDetail: 'Mercedes Benz C200 2024',
    leadDetail: {
      name: 'Muhammed Hamzah',
      phone: '+44762547924',
      email: 'muhammedhamzah09@gmail.com',
    },
    device: 'Website',
    date: 'January 29, 2024 02:53 AM',
  },
];

const App: React.FC = () => {
  return (
    <div>
      <LeadsTable leads={leads} />
    </div>
  );
};

export default App;
