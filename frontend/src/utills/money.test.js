import {it,expect,describe} from 'vitest';
import { formatMoney } from './money';

describe('formatMoney', () => {
it('formats money correctly', () => {
    expect(formatMoney(1234)).toBe('$12.34');
    expect(formatMoney(0)).toBe('$0.00');
    expect(formatMoney(99)).toBe('$0.99');
    expect(formatMoney(100)).toBe('$1.00');
    expect(formatMoney(123456789)).toBe('$1234567.89');
})

it(`display two decimal`,()=>{
    expect(formatMoney(1090)).toBe('$10.90');
}
)})