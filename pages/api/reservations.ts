import { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from '@/lib/socket';
import { Reservation, Table } from '@/types';

// In-memory storage (in Produktion: Datenbank verwenden!)
let tables: Table[] = [
  { id: '1', number: 1, capacity: 2, isAvailable: true },
  { id: '2', number: 2, capacity: 4, isAvailable: true },
  { id: '3', number: 3, capacity: 4, isAvailable: true },
  { id: '4', number: 4, capacity: 6, isAvailable: true },
  { id: '5', number: 5, capacity: 8, isAvailable: true },
];

let reservations: Reservation[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (req.method === 'GET') {
    res.status(200).json({ tables, reservations });
  } else if (req.method === 'POST') {
    const reservation: Reservation = JSON.parse(req.body);
    reservations.push(reservation);
    
    // Tisch-Verfügbarkeit aktualisieren
    tables = tables.map(table => 
      table.id === reservation.tableId 
        ? { ...table, isAvailable: false, reservedBy: reservation.customerName, reservationTime: reservation.time }
        : table
    );

    // Socket Event für Live-Updates senden
    if (res.socket.server.io) {
      res.socket.server.io.emit('reservation-update', { tables, reservations });
    }

    res.status(201).json({ success: true, reservation });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}