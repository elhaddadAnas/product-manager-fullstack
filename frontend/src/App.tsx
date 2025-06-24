import React, { useState, useEffect } from 'react';
import { Button, Box, AppBar, Toolbar } from '@mui/material';
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ManageProducts from './components/ManageProducts';
import ProductFormPage from './components/ProductFormPage';
import OrderPage from './components/OrderPage';
import ManageOrders from './components/ManageOrders';
import OrderEditPage from './components/OrderEditPage';
import { getUser } from './api/api';

const App: React.FC = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedTok = localStorage.getItem('token');
    const storedUser = localStorage.getItem('username');
    if (storedTok && storedUser) {
      setToken(storedTok);
      setUsername(storedUser);
    }
  }, []);

  useEffect(() => {
    if (token && username) {
      getUser(username, token).then(u => setUserId(u.id)).catch(() => setUserId(null));
    }
  }, [token, username]);

  const handleLogin = (tok: string, user: string) => {
    localStorage.setItem('token', tok);
    localStorage.setItem('username', user);
    setToken(tok);
    setUsername(user);
    navigate('/products');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setUsername(null);
    setUserId(null);
    navigate('/login');
  };

  return (
    <div className="app-container">
      <h1>Product Management Frontend</h1>
      {token ? (
        <div>
          <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 2 }}>
            <Toolbar>
              <Box sx={{ ml: 'auto' }}>
                <Button
                  component={Link}
                  to="/products"
                  color="inherit"
                  sx={{ '&:hover': { backgroundColor: 'red', color: '#fff' } }}
                >
                  Products
                </Button>
                <Button
                  component={Link}
                  to="/orders"
                  color="inherit"
                  sx={{ '&:hover': { backgroundColor: 'red', color: '#fff' } }}
                >
                  Orders
                </Button>
                <Button
                  component={Link}
                  to="/order"
                  color="inherit"
                  sx={{ '&:hover': { backgroundColor: 'red', color: '#fff' } }}
                >
                  Order
                </Button>
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  sx={{ '&:hover': { backgroundColor: 'red', color: '#fff' } }}
                >
                  Logout
                </Button>
              </Box>
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/products" element={<ManageProducts token={token} />} />
            <Route path="/products/new" element={<ProductFormPage token={token} />} />
            <Route path="/products/:id/edit" element={<ProductFormPage token={token} />} />
            <Route path="/orders" element={<ManageOrders token={token} />} />
            <Route path="/orders/:id/edit" element={<OrderEditPage token={token} />} />
            <Route
              path="/order"
              element={userId !== null ? <OrderPage token={token} userId={userId} /> : <div>Loading...</div>}
            />
            <Route path="*" element={<Navigate to="/products" replace />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegistered={() => navigate('/login')} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
