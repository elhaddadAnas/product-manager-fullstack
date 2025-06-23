import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getProducts } from '../api/api';
import { ProductResponseDTO } from '../api/interfaces';

interface Props {
  token: string;
}

const ProductList: React.FC<Props> = ({ token }) => {
  const [products, setProducts] = useState<ProductResponseDTO[]>([]);

  useEffect(() => {
    getProducts(token).then(setProducts).catch(() => setProducts([]));
  }, [token]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'createdBy', headerName: 'Creator', flex: 1 },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      valueFormatter: params => `$${params.value}`,
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h2>Products</h2>
      <DataGrid rows={products} columns={columns} hideFooter autoHeight />
    </div>
  );
};

export default ProductList;
