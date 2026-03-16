export const formatSmartMetric = (key: string, value: number): string => {
  const label = key.toLowerCase();

  // Lógica baseada em palavras-chave
  if (label.includes('producao') || label.includes('peso') || label.includes('ton')) {
    return `${value.toLocaleString('pt-BR')} t`;
  }
  
  if (label.includes('custo') || label.includes('valor') || label.includes('preco') || label.includes('venda')) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

  if (label.includes('porcentagem') || label.includes('taxa') || label.includes('%')) {
    return `${value.toFixed(2)}%`;
  }

  // Padrão para números genéricos
  return value.toLocaleString('pt-BR');
};