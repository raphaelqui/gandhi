import Layout from '@/components/Layout';
import { Typography, Grid, Card, CardContent, Chip, Box, Tabs, Tab } from '@mui/material';
import { MenuItem } from '@/types';
import { useState } from 'react';
import { useTranslation } from '@/lib/useTranslation';

const menuItems: MenuItem[] = [
  { id: '1', name: 'Bruschetta', description: 'Geröstetes Brot mit Tomaten, Basilikum und Knoblauch', price: 8.50, category: 'appetizer' },
  { id: '2', name: 'Caesar Salad', description: 'Römersalat mit Parmesan, Croutons und Caesar-Dressing', price: 10.90, category: 'appetizer' },
  { id: '3', name: 'Spaghetti Carbonara', description: 'Klassische Carbonara mit Speck, Ei und Parmesan', price: 14.50, category: 'main' },
  { id: '4', name: 'Rinderfilet', description: 'Zartes Rinderfilet mit Gemüse und Kartoffelgratin', price: 28.90, category: 'main' },
  { id: '5', name: 'Lachs mit Risotto', description: 'Gegrillter Lachs auf Spargelrisotto', price: 22.50, category: 'main' },
  { id: '6', name: 'Tiramisu', description: 'Klassisches italienisches Dessert mit Mascarpone', price: 7.50, category: 'dessert' },
  { id: '7', name: 'Panna Cotta', description: 'Cremige Panna Cotta mit Beerensauce', price: 6.90, category: 'dessert' },
  { id: '8', name: 'Hauswein (0,25l)', description: 'Rotwein oder Weißwein', price: 5.50, category: 'drink' },
];

export default function Menu() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: t('menu.all') },
    { value: 'appetizer', label: t('menu.appetizer') },
    { value: 'main', label: t('menu.main') },
    { value: 'dessert', label: t('menu.dessert') },
    { value: 'drink', label: t('menu.drink') },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <Layout>
      <Typography variant="h3" component="h1" gutterBottom>
        {t('menu.title')}
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs 
          value={selectedCategory} 
          onChange={(_, value) => setSelectedCategory(value)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {categories.map(cat => (
            <Tab key={cat.value} label={cat.label} value={cat.value} />
          ))}
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {filteredItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                  <Typography variant="h6" component="h2">
                    {item.name}
                  </Typography>
                  <Chip 
                    label={`€${item.price.toFixed(2)}`} 
                    color="primary" 
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}