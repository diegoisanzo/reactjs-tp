// @vitest-environment/jsdom
import {describe, it} from "vitest";
import {render} from "@testing-library/react"
import Item from "../../../componentes/Item/Item.jsx";
import {CartProvider} from "../../../context/CartProvider.jsx";
import {MemoryRouter} from "react-router-dom";

describe('Item', () => {
    it('should render correctly',
        () => {
            render(
                <MemoryRouter>
                    <CartProvider>
                        <Item/>
                    </CartProvider>
                </MemoryRouter>
            );
        });
});
