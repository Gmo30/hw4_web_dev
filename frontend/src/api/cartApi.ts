import axios from 'axios';

const notifyCartUpdate = () => {
    window.dispatchEvent(new Event("cartUpdated"));
};

export interface MenuItemDetails {
    id: number;
    name: string;
    description: string;
    price: number;
    imagePath: string;
}

export interface CartItem {
    menuId: number;
    quantity: number;
    price: number;
    menuItemDetails: MenuItemDetails;
}

export interface Cart {
    _id: string;
    items: CartItem[];
    totalPrice: number;
}

export type OrderStatus = "Pending" | "Preparing" | "Completed" | "Cancelled";

export interface OrderItem {
    menuId: number;
    quantity: number;
    price: number;
}

export interface Order {
    _id: string;
    items: OrderItem[];
    totalPrice: number;
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
}

export interface CheckoutResponse {
    message: string;
    order: Order;
}


const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/`,
    headers: {
        'Content-Type': 'application/json'
    }
});

// GET /api/cart
export const fetchCart = async (): Promise<Cart> => {
    const response = await apiClient.get<Cart>('api/cart');
    return response.data;
};

// POST /api/cart/add
export const addToCart = async (menuId: number, quantity: number = 1): Promise<Cart> => {
    const response = await apiClient.post<Cart>('/api/cart/add', { menuId, quantity });
    notifyCartUpdate();
    return response.data;
};

// PUT /api/cart/decrease
export const decreaseQuantity = async (menuId: number): Promise<Cart> => {
    const response = await apiClient.put<Cart>('/api/cart/decrease', { menuId });
    notifyCartUpdate();
    return response.data;
};

// DELETE /api/cart/remove/:menuId
export const removeFromCart = async (menuId: number): Promise<Cart> => {
    const response = await apiClient.delete<Cart>(`/api/cart/remove/${menuId}`);
    notifyCartUpdate();
    return response.data;
};

// DELETE /api/cart/clear
export const clearCart = async (): Promise<{ message: string; cart: Cart }> => {
    const response = await apiClient.delete<{ message: string; cart: Cart }>('/api/cart/clear');
    notifyCartUpdate();
    return response.data;
};

// POST /api/orders/checkout
export const checkoutCart = async (): Promise<CheckoutResponse> => {
    const response = await apiClient.post<CheckoutResponse>('/api/orders/checkout');
    notifyCartUpdate();
    return response.data;
};