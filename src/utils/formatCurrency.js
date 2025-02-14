// Função para formatar moeda
const formatCurrency = (value) => {

    // Formatar o valor para moeda brasileira
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);

}

// Exportar a função
export default formatCurrency;