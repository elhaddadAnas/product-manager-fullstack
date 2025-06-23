import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct, createProduct, updateProduct } from '../api/api';
import { ProductRequestDTO, ProductResponseDTO } from '../api/interfaces';
import ProductForm from './ProductForm';

interface Props {
  token: string;
}

const ProductFormPage: React.FC<Props> = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductResponseDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getProduct(Number(id), token)
        .then(setProduct)
        .catch(() => setProduct(null));
    }
  }, [id, token]);

  const handleSave = async (data: ProductRequestDTO) => {
    setError(null);
    try {
      if (product) {
        await updateProduct(product.id, data, token);
      } else {
        await createProduct(data, token);
      }
      navigate('/products');
    } catch {
      setError('Save failed');
    }
  };

  const handleCancel = () => {
    navigate('/products');
  };

  return (
    <div>
      <h2>{product ? 'Edit Product' : 'New Product'}</h2>
      <ProductForm
        initial={product || undefined}
        onSubmit={handleSave}
        onCancel={handleCancel}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ProductFormPage;
