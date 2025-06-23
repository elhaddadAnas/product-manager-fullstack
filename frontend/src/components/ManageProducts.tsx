import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../api/api';
import { ProductResponseDTO } from '../api/interfaces';

interface Props {
  token: string;
}

const ManageProducts: React.FC<Props> = ({ token }) => {
  const [products, setProducts] = useState<ProductResponseDTO[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const load = () => {
    getProducts(token).then(setProducts).catch(() => setProducts([]));
  };

  useEffect(() => {
    load();
  }, [token]);

  const handleDelete = async (id: number) => {
    setError(null);
    try {
      await deleteProduct(id, token);
      load();
    } catch (e: any) {
      setError(e.message);
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'createdBy', headerName: 'Creator', flex: 1 },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      valueFormatter: params => `$${params.value}`,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      sortable: false,
      renderCell: (params: GridRenderCellParams<ProductResponseDTO>) => (
        <>
          <IconButton
            size="small"
            color="primary"
            onClick={() => navigate(`/products/${params.row.id}/edit`)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h2>Products</h2>
      <Button
        variant="contained"
        component={Link}
        to="/products/new"
        sx={{ mb: 1 }}
      >
        New Product
      </Button>
      <DataGrid rows={products} columns={columns} hideFooter autoHeight />
      {error && (
        <Typography color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </div>
  );
};

export default ManageProducts;
