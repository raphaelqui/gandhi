import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { 
  Typography, Button, Box, Grid, Card, CardContent, TextField, 
  Dialog, DialogTitle, DialogContent, DialogActions, Chip 
} from '@mui/material';
import { Table, Reservation } from '@/types';
import io, { Socket } from 'socket.io-client';
import { useTranslation } from '@/lib/useTranslation';

let socket: Socket;

export default function Reservations() {
  const { t } = useTranslation();
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    date: '',
    time: '',
  });

  useEffect(() => {
    fetch('/api/socket').then(() => {
      socket = io({
        path: '/api/socket',
      });

      socket.on('connect', () => {
        console.log('Mit Socket verbunden');
      });

      socket.on('reservation-update', (data: { tables: Table[] }) => {
        setTables(data.tables);
      });
    });

    fetch('/api/reservations')
      .then(res => res.json())
      .then(data => setTables(data.tables));

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  const handleTableClick = (table: Table) => {
    if (table.isAvailable) {
      setSelectedTable(table);
      setOpenDialog(true);
    }
  };

  const handleSubmit = async () => {
    if (!selectedTable) return;

    const reservation: Reservation = {
      id: Date.now().toString(),
      tableId: selectedTable.id,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      date: formData.date,
      time: formData.time,
      guests: selectedTable.capacity,
    };

    await fetch('/api/reservations', {
      method: 'POST',
      body: JSON.stringify(reservation),
    });

    setOpenDialog(false);
    setFormData({ customerName: '', customerEmail: '', customerPhone: '', date: '', time: '' });
    setSelectedTable(null);
  };

  return (
    <Layout>
      <Typography variant="h3" component="h1" gutterBottom>
        {t('reservations.title')}
      </Typography>
      <Typography variant="body1" paragraph>
        {t('reservations.subtitle')}
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {tables.map((table) => (
          <Grid item xs={12} sm={6} md={4} key={table.id}>
            <Card 
              sx={{ 
                cursor: table.isAvailable ? 'pointer' : 'not-allowed',
                opacity: table.isAvailable ? 1 : 0.6,
                '&:hover': table.isAvailable ? { transform: 'scale(1.05)' } : {},
                transition: 'all 0.3s',
              }}
              onClick={() => handleTableClick(table)}
            >
              <CardContent>
                <Typography variant="h5" component="h2">
                  {t('reservations.table')} {table.number}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {table.capacity} {t('reservations.persons')}
                </Typography>
                <Chip 
                  label={table.isAvailable ? t('reservations.available') : t('reservations.reserved')} 
                  color={table.isAvailable ? 'success' : 'error'}
                  sx={{ mt: 1 }}
                />
                {!table.isAvailable && table.reservedBy && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {t('reservations.reservedBy')}: {table.reservedBy}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {t('reservations.table')} {selectedTable?.number} {t('reservations.reserveTable')}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label={t('reservations.name')}
              fullWidth
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              required
            />
            <TextField
              label={t('reservations.email')}
              type="email"
              fullWidth
              value={formData.customerEmail}
              onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
              required
            />
            <TextField
              label={t('reservations.phone')}
              fullWidth
              value={formData.customerPhone}
              onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
              required
            />
            <TextField
              label={t('reservations.date')}
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
            <TextField
              label={t('reservations.time')}
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>{t('reservations.cancel')}</Button>
          <Button onClick={handleSubmit} variant="contained">
            {t('reservations.reserve')}
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}