import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UndoIcon from '@mui/icons-material/Undo';
import { Link, useNavigate } from 'react-router-dom';
import { getOrders, updateOrder, deleteOrder } from '../api/api';
import { OrderResponseDTO, OrderRequestDTO } from '../api/interfaces';

interface Props {
  token: string;
}

const ManageOrders: React.FC<Props> = ({ token }) => {
  const [orders, setOrders] = useState<OrderResponseDTO[]>([]);
  const navigate = useNavigate();

  const load = () => {
    getOrders(token).then(setOrders).catch(() => setOrders([]));
  };

  useEffect(() => {
    load();
  }, [token]);

  const handleDelete = async (id: number) => {
    await deleteOrder(id, token);
    load();
  };

  const markPlaced = async (order: OrderResponseDTO) => {
    const req: OrderRequestDTO = {
      userId: order.user.id,
      productIds: order.products.map(p => p.id),
      status: 'PAID',
    };
    await updateOrder(order.id, req, token);
    load();
  };

  const markPending = async (order: OrderResponseDTO) => {
    const req: OrderRequestDTO = {
      userId: order.user.id,
      productIds: order.products.map(p => p.id),
      status: 'PENDING',
    };
    await updateOrder(order.id, req, token);
    load();
  };

  const baseColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'user',
      headerName: 'User',
      flex: 1,
      valueGetter: params => params.row.username,
    },
    {
      field: 'products',
      headerName: 'Products',
      flex: 2,
      valueGetter: params => params.row.products.map((p: any) => p.name).join(', '),
    },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'total',
      headerName: 'Total',
      width: 100,
      valueFormatter: params => `$${params.value}`,
    },
  ];

  const actionColumn = {
    field: 'actions',
    headerName: 'Actions',
    width: 180,
    sortable: false,
    renderCell: (params: GridRenderCellParams<OrderResponseDTO>) => (
      <>
        <IconButton
          size="small"
          color="primary"
          onClick={() => navigate(`/orders/${params.row.id}/edit`)}
        >
          <EditIcon />
        </IconButton>
        {params.row.status === 'PENDING' && (
          <IconButton size="small" color="success" onClick={() => markPlaced(params.row)}>
            <CheckCircleIcon />
          </IconButton>
        )}
        {params.row.status !== 'PENDING' && (
          <IconButton size="small" color="warning" onClick={() => markPending(params.row)}>
            <UndoIcon />
          </IconButton>
        )}
        <IconButton size="small" color="error" onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      </>
    ),
  } as GridColDef;

  const pendingOrders = orders.filter(o => o.status === 'PENDING');
  const placedOrders = orders.filter(o => o.status !== 'PENDING');

  return (
    <div style={{ width: '100%' }}>
      <h2>Orders</h2>
      <Button variant="contained" component={Link} to="/order" sx={{ mb: 1 }}>
        Add Order
      </Button>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Pending Orders
      </Typography>
      <DataGrid
        rows={pendingOrders}
        columns={[...baseColumns, actionColumn]}
        autoHeight
        hideFooter
      />
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Placed Orders
      </Typography>
      <DataGrid
        rows={placedOrders}
        columns={[...baseColumns, actionColumn]}
        autoHeight
        hideFooter
      />
    </div>
  );
};

export default ManageOrders;
