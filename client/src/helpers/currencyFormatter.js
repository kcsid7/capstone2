export default function currencyFormatter(amount, format="en-US", currSymbol="USD") {
    return new Intl.NumberFormat(format, {style: "currency", currency: currSymbol}).format(amount)
}