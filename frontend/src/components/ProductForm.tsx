import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { ProductRequestDTO, ProductResponseDTO } from '../api/interfaces';

interface Props {
  initial?: ProductResponseDTO;
  onSubmit: (data: ProductRequestDTO) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<Props> = ({ initial, onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [nameError, setNameError] = useState('');
  const [priceError, setPriceError] = useState('');

  useEffect(() => {
    if (initial) {
      setName(initial.name);
      setPrice(initial.price.toString());
    } else {
      setName('');
      setPrice('');
    }
  }, [initial]);

  const validate = () => {
    let ok = true;
    if (!name.trim()) {
      setNameError('Name is required');
      ok = false;
    } else {
      setNameError('');
    }
    const numericPrice = Number(price);
    if (numericPrice <= 0) {
      setPriceError('Price must be positive');
      ok = false;
    } else {
      setPriceError('');
    }
    return ok;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ name: name.trim(), price: Number(price) });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        error={!!nameError}
        helperText={nameError}
        required
      />
      <TextField
        label="Price"
        type="number"
        value={price}
        onChange={e => setPrice(e.target.value)}
        error={!!priceError}
        helperText={priceError}
        required
      />
      <Box display="flex" gap={1}>
        <Button type="submit" variant="contained">Save</Button>
        <Button type="button" onClick={onCancel}>Cancel</Button>
      </Box>
    </Box>
  );
};

export default ProductForm;
