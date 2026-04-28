export function formatMoney(amount) {
    return `$${(amount / 100).toFixed(2)}`;
}