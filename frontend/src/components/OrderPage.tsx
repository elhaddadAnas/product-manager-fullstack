import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';
import { getProducts, createOrder } from '../api/api';
import { ProductResponseDTO } from '../api/interfaces';

interface Props {
  token: string;
  userId: number;
}

const OrderPage: React.FC<Props> = ({ token, userId }) => {
  const [products, setProducts] = useState<ProductResponseDTO[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    getProducts(token).then(setProducts).catch(() => setProducts([]));
  }, [token]);

  const submit = async () => {
    try {
      await createOrder({ userId, productIds: selected }, token);
      setMsg('Order placed');
      setSelected([]);
    } catch {
      setMsg('Failed to place order');
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      valueFormatter: params => `$${params.value}`,
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h2>Create Order</h2>
      {msg && <Typography color="primary">{msg}</Typography>}
      <DataGrid
        rows={products}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={newSel => setSelected(newSel as number[])}
        rowSelectionModel={selected}
        hideFooter
        autoHeight
      />
      <Button
        variant="contained"
        onClick={submit}
        disabled={selected.length === 0}
        sx={{ mt: 1 }}
      >
        Submit Order
      </Button>
    </div>
  );
};

export default OrderPage;
