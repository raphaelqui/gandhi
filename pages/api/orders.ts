import { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from '@/lib/socket';
import { Order } from '@/types';

// In-memory storage (in Produktion: Datenbank verwenden!)
let orders: Order[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (req.method === 'GET') {
    res.status(200).json(orders);
  } else if (req.method === 'POST') {
    const order: Order = JSON.parse(req.body);
    orders.push(order);

    // Socket Event für Live-Updates senden
    if (res.socket.server.io) {
      res.socket.server.io.emit('order-update', order);
    }

    res.status(201).json({ success: true, order });
  } else if (req.method === 'PATCH') {
    const { id, status } = JSON.parse(req.body);
    orders = orders.map(order => 
      order.id === id ? { ...order, status } : order
    );

    if (res.socket.server.io) {
      res.socket.server.io.emit('order-status-update', { id, status });
    }

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}