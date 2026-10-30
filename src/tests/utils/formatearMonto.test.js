import {describe, expect, it} from 'vitest';
import {formatearMonto} from '../../utils/formatearMonto.js';

// Intl separa el signo $ del número con un espacio no separable (U+00A0), no con un espacio común
const SPACE = ' ';

describe('formatearMonto', () => {
    it('should format an integer with the peso sign and two decimals', () => {
        expect(formatearMonto(99)).toBe(`$${SPACE}99,00`);
    });

    it('should format zero', () => {
        expect(formatearMonto(0)).toBe(`$${SPACE}0,00`);
    });

    it('should use a dot as thousands separator', () => {
        expect(formatearMonto(1500)).toBe(`$${SPACE}1.500,00`);
        expect(formatearMonto(1234567)).toBe(`$${SPACE}1.234.567,00`);
    });

    it('should use a comma as decimal separator', () => {
        expect(formatearMonto(1234567.5)).toBe(`$${SPACE}1.234.567,50`);
    });

    it('should round to two decimals', () => {
        expect(formatearMonto(10.006)).toBe(`$${SPACE}10,01`);
        expect(formatearMonto(10.004)).toBe(`$${SPACE}10,00`);
        expect(formatearMonto(10.999)).toBe(`$${SPACE}11,00`);
    });

    it('should hide floating point errors', () => {
        expect(formatearMonto(0.1 + 0.2)).toBe(`$${SPACE}0,30`);
    });

    it('should put the minus sign before the peso sign for negative amounts', () => {
        expect(formatearMonto(-1500)).toBe(`-$${SPACE}1.500,00`);
    });

    it('should format very large amounts', () => {
        expect(formatearMonto(1e12)).toBe(`$${SPACE}1.000.000.000.000,00`);
    });

    it('should accept numeric strings, like the ones coming from a form input', () => {
        expect(formatearMonto('250')).toBe(`$${SPACE}250,00`);
    });
});
