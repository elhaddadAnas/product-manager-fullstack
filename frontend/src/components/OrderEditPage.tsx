import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getProducts, getOrder, updateOrder } from '../api/api';
import {
  ProductResponseDTO,
  OrderResponseDTO,
  OrderRequestDTO,
} from '../api/interfaces';

interface Props {
  token: string;
}

const OrderEditPage: React.FC<Props> = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderResponseDTO | null>(null);
  const [products, setProducts] = useState<ProductResponseDTO[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getOrder(Number(id), token)
        .then(o => {
          setOrder(o);
          setSelected(o.products.map(p => p.id));
        })
        .catch(() => setOrder(null));
    }
    getProducts(token).then(setProducts).catch(() => setProducts([]));
  }, [id, token]);

  const submit = async () => {
    if (!order) return;
    const req: OrderRequestDTO = {
      userId: order.user.id,
      productIds: selected,
    };
    try {
      await updateOrder(order.id, req, token);
      setMsg('Order updated');
    } catch {
      setMsg('Failed to update order');
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
      <h2>Edit Order</h2>
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
      {order && (
        <Typography sx={{ mt: 1 }}>Status: {order.status}</Typography>
      )}
      <Button
        variant="contained"
        onClick={submit}
        disabled={selected.length === 0}
        sx={{ mt: 1, mr: 1 }}
      >
        Save
      </Button>
      <Button variant="outlined" onClick={() => navigate('/orders')} sx={{ mt: 1 }}>
        Cancel
      </Button>
    </div>
  );
};

export default OrderEditPage;
