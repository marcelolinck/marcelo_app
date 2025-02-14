// Incluir os componentes utilizado para estruturar o conteúdo
import { Text } from "react-native";

// Formatador de moeda no componente
const CurrencyFormatter = ({value}) => {

    // Formatar o valor para moeda brasileira
    const formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);

    // Retornar o valor formatado
    return (
        <Text>{formattedValue}</Text>
    );

}

// Exportar a função
export default CurrencyFormatter;