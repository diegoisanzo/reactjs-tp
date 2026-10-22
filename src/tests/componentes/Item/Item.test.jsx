// @vitest-environment jsdom
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import Item from "../../../componentes/Item/Item.jsx";
import {MemoryRouter} from "react-router-dom";
import {CartProvider} from "../../../context/CartProvider.jsx";

// Mocking the useCart hook
const mockAddToCart = vi.fn();
const mockGetCantidadActual = vi.fn();
vi.mock('../../../context/useCart.js', () => ({
    useCart: () => ({
        addToCart: mockAddToCart,
        getCantidadActual: mockGetCantidadActual
    }),
}));

// Mocking window.alert to avoid testing errors
window.alert = vi.fn();

const defaultProps = {
    id: 1,
    nombre: 'Producto Test',
    precio: 100,
    stock: 5,
    imagen: 'imagen.jpg',
};

const renderItem = (props = {}) => {
    return render(
        <MemoryRouter>
            <CartProvider>
                <Item {...defaultProps} {...props} />
            </CartProvider>
        </MemoryRouter>
    );
};

describe('Item', () => {
    beforeEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    it('should render correctly with props', () => {
        renderItem();

        expect(screen.getByText('Producto Test')).toBeDefined();
        expect(screen.getByText('Precio: $100')).toBeDefined();
        expect(screen.getByText('Stock: 5')).toBeDefined();
        expect(screen.getByRole('img')
                     .getAttribute('src')
        ).toBe('imagen.jpg');
    });

    it('should increment quantity when +1 button is clicked', () => {
        renderItem();

        const incrementButton = screen.getByText('+1');
        fireEvent.click(incrementButton);

        expect(screen.getByText('Agregar al 1 Carrito')).toBeDefined();
    });

    it('should toggle favorite status when clicked', () => {
        renderItem();

        const favoritoSpan = screen.getByText('☆');
        fireEvent.click(favoritoSpan);

        expect(screen.getByText('⭐')).toBeDefined();
    });
});