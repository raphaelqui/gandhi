import { useState } from 'react';
import Layout from '@/components/Layout';
import { 
  Typography, Grid, Card, CardContent, Button, Box, TextField,
  Radio, RadioGroup, FormControlLabel, FormControl, FormLabel,
  List, ListItem, ListItemText, IconButton, Chip, Divider, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { MenuItem, OrderItem, Order } from '@/types';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useTranslation } from '@/lib/useTranslation';

const menuItems: MenuItem[] = [
  { id: '1', name: 'Bruschetta', description: 'Geröstetes Brot mit Tomaten', price: 8.50, category: 'appetizer' },
  { id: '2', name: 'Caesar Salad', description: 'Römersalat mit Parmesan', price: 10.90, category: 'appetizer' },
  { id: '3', name: 'Spaghetti Carbonara', description: 'Klassische Carbonara', price: 14.50, category: 'main' },
  { id: '4', name: 'Rinderfilet', description: 'Zartes Rinderfilet', price: 28.90, category: 'main' },
];

export default function Order() {
  const { t } = useTranslation();
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'swipe' | 'cash' | 'paypal'>('cash');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const addToCart = (menuItem: MenuItem) => {
    const existingItem = cart.find(item => item.menuItem.id === menuItem.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.menuItem.id === menuItem.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { menuItem, quantity: 1 }]);
    }
  };

  const removeFromCart = (menuItemId: string) => {
    const existingItem = cart.find(item => item.menuItem.id === menuItemId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(item => 
        item.menuItem.id === menuItemId 
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ));
    } else {
      setCart(cart.filter(item => item.menuItem.id !== menuItemId));
    }
  };

  const deleteFromCart = (menuItemId: string) => {
    setCart(cart.filter(item => item.menuItem.id !== menuItemId));
  };

  const total = cart.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);

  const handleOrder = async () => {
    const order: Order = {
      id: Date.now().toString(),
      items: cart,
      total,
      status: 'pending',
      paymentMethod,
      customerName,
      customerEmail,
      isPickup: true,
    };

    await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });

    setOrderSuccess(true);
    setCart([]);
    setCustomerName('');
    setCustomerEmail('');
  };

  return (
    <Layout>
      <Typography variant="h3" component="h1" gutterBottom>
        {t('order.title')}
      </Typography>
      <Typography variant="body1" paragraph>
        {t('order.subtitle')}
      </Typography>

      {orderSuccess && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setOrderSuccess(false)}>
          {t('order.successMessage')}
        </Alert>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Typography variant="h5" gutterBottom>
            {t('order.menuTitle')}
          </Typography>
          <Grid container spacing={2}>
            {menuItems.map((item) => (
              <Grid item xs={12} sm={6} key={item.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {item.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Chip label={`€${item.price.toFixed(2)}`} color="primary" />
                      <Button 
                        variant="contained" 
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={() => addToCart(item)}
                      >
                        {t('order.addToCart')}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {t('order.cart')}
              </Typography>
              {cart.length === 0 ? (
                <Typography color="text.secondary">
                  {t('order.cartEmpty')}
                </Typography>
              ) : (
                <>
                  <List>
                    {cart.map((item) => (
                      <ListItem 
                        key={item.menuItem.id}
                        secondaryAction={
                          <IconButton edge="end" onClick={() => deleteFromCart(item.menuItem.id)}>
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemText
                          primary={item.menuItem.name}
                          secondary={`€${item.menuItem.price.toFixed(2)}`}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                          <IconButton size="small" onClick={() => removeFromCart(item.menuItem.id)}>
                            <RemoveIcon />
                          </IconButton>
                          <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                          <IconButton size="small" onClick={() => addToCart(item.menuItem)}>
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {t('order.total')}: €{total.toFixed(2)}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      label={t('order.customerName')}
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      sx={{ mb: 2 }}
                      required
                    />
                    <TextField
                      fullWidth
                      label={t('order.customerEmail')}
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      required
                    />
                  </Box>

                  <FormControl component="fieldset" sx={{ mb: 2 }}>
                    <FormLabel component="legend">{t('order.paymentMethod')}</FormLabel>
                    <RadioGroup
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                    >
                      <FormControlLabel value="cash" control={<Radio />} label={t('order.cash')} />
                      <FormControlLabel value="swipe" control={<Radio />} label={t('order.swipe')} />
                      <FormControlLabel value="paypal" control={<Radio />} label={t('order.paypal')} />
                    </RadioGroup>
                  </FormControl>

                  {paymentMethod === 'paypal' ? (
                    <PayPalButtons
                      style={{ layout: 'vertical' }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [{
                            amount: {
                              value: total.toFixed(2),
                            },
                          }],
                        });
                      }}
                      onApprove={async (data, actions) => {
                        await actions.order?.capture();
                        await handleOrder();
                      }}
                    />
                  ) : (
                    <Button 
                      variant="contained" 
                      fullWidth 
                      size="large"
                      onClick={handleOrder}
                      disabled={!customerName || !customerEmail}
                    >
                      {t('order.placeOrder')}
                    </Button>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}