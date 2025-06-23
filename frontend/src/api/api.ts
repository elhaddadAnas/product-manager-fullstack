import {
  AuthResponseDTO,
  LoginRequestDTO,
  ProductRequestDTO,
  ProductResponseDTO,
  UserRequestDTO,
  UserResponseDTO,
  OrderRequestDTO,
  OrderResponseDTO,
} from './interfaces';

const API_BASE = 'http://localhost:8080';

function jsonHeaders(token?: string): HeadersInit {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

async function handleJson<T>(res: Response): Promise<T> {
  const text = await res.text();
  let data: any;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!res.ok) {
    let msg: string;
    switch (res.status) {
      case 400:
        msg = 'Bad request';
        break;
      case 401:
      case 403:
        msg = 'Unauthorized';
        break;
      case 404:
        msg = 'Not found';
        break;
      default:
        msg = 'Request failed';
    }
    throw new Error(msg);
  }
  return data as T;
}

export async function login(req: LoginRequestDTO): Promise<AuthResponseDTO> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify(req),
  });
  return handleJson<AuthResponseDTO>(res);
}

export async function getProducts(token?: string): Promise<ProductResponseDTO[]> {
  const res = await fetch(`${API_BASE}/products`, { headers: jsonHeaders(token) });
  return handleJson<ProductResponseDTO[]>(res);
}
export async function getProduct(id: number, token?: string): Promise<ProductResponseDTO> {
  const res = await fetch(`${API_BASE}/products/${id}`, { headers: jsonHeaders(token) });
  return handleJson<ProductResponseDTO>(res);
}



export async function createProduct(
  req: ProductRequestDTO,
  token?: string
): Promise<ProductResponseDTO> {
  const res = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: jsonHeaders(token),
    body: JSON.stringify(req),
  });
  return handleJson<ProductResponseDTO>(res);
}

export async function updateProduct(
  id: number,
  req: ProductRequestDTO,
  token?: string
): Promise<ProductResponseDTO> {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: jsonHeaders(token),
    body: JSON.stringify(req),
  });
  return handleJson<ProductResponseDTO>(res);
}

export async function deleteProduct(id: number, token?: string): Promise<void> {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'DELETE',
    headers: jsonHeaders(token),
  });
  if (!res.ok) {
    const text = await res.text();
    const msg = text || `Delete failed: ${res.status}`;
    throw new Error(msg);
  }
}

export async function getUsers(): Promise<UserResponseDTO[]> {
  const res = await fetch(`${API_BASE}/users`);
  return handleJson<UserResponseDTO[]>(res);
}

export async function getUser(
  username: string,
  token?: string
): Promise<UserResponseDTO> {
  const res = await fetch(`${API_BASE}/users/${username}`, {
    headers: jsonHeaders(token),
  });
  return handleJson<UserResponseDTO>(res);
}

export async function createUser(
  req: UserRequestDTO,
  token?: string
): Promise<UserResponseDTO> {
  const res = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: jsonHeaders(token),
    body: JSON.stringify(req),
  });
  return handleJson<UserResponseDTO>(res);
}

export async function updateUser(
  id: number,
  req: UserRequestDTO,
  token?: string
): Promise<UserResponseDTO> {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: 'PUT',
    headers: jsonHeaders(token),
    body: JSON.stringify(req),
  });
  return handleJson<UserResponseDTO>(res);
}

export async function deleteUser(id: number, token?: string): Promise<void> {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: 'DELETE',
    headers: jsonHeaders(token),
  });
  if (!res.ok) {
    throw new Error(`Delete failed: ${res.status}`);
  }
}

export async function getOrders(token?: string): Promise<OrderResponseDTO[]> {
  const res = await fetch(`${API_BASE}/orders`, { headers: jsonHeaders(token) });
  return handleJson<OrderResponseDTO[]>(res);
}

export async function getOrder(id: number, token?: string): Promise<OrderResponseDTO> {
  const res = await fetch(`${API_BASE}/orders/${id}`, { headers: jsonHeaders(token) });
  return handleJson<OrderResponseDTO>(res);
}

export async function createOrder(
  req: OrderRequestDTO,
  token?: string
): Promise<OrderResponseDTO> {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: jsonHeaders(token),
    body: JSON.stringify(req),
  });
  return handleJson<OrderResponseDTO>(res);
}

export async function updateOrder(
  id: number,
  req: OrderRequestDTO,
  token?: string
): Promise<OrderResponseDTO> {
  const res = await fetch(`${API_BASE}/orders/${id}`, {
    method: 'PUT',
    headers: jsonHeaders(token),
    body: JSON.stringify(req),
  });
  return handleJson<OrderResponseDTO>(res);
}

export async function deleteOrder(id: number, token?: string): Promise<void> {
  const res = await fetch(`${API_BASE}/orders/${id}`, {
    method: 'DELETE',
    headers: jsonHeaders(token),
  });
  if (!res.ok) {
    throw new Error(`Delete failed: ${res.status}`);
  }
}
