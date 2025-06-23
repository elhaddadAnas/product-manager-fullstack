export interface ProductRequestDTO {
  name: string;
  price: number;
}

export interface ProductResponseDTO {
  id: number;
  name: string;
  price: number;
  createdBy: string;
}

export interface UserRequestDTO {
  username: string;
  password: string;
  roles?: string[];
}

export interface UserResponseDTO {
  id: number;
  username: string;
  roles: string[];
}

export interface LoginRequestDTO {
  username: string;
  password: string;
}

export interface AuthResponseDTO {
  token: string;
}

export type OrderStatus = 'PENDING' | 'PAID';

export interface OrderRequestDTO {
  userId: number;
  productIds: number[];
  status?: OrderStatus;
}

export interface OrderResponseDTO {
  id: number;
  user: UserResponseDTO;
  username: string;
  products: ProductResponseDTO[];
  orderDate: string;
  status: OrderStatus;
  total: number;
}
