export function formatCurrency(
  value?: number
) {
  if (!value) {
    return "N/D";
  }

  return value.toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  );
}