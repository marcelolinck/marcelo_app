//Retornar o mes que está na data ano-mes-dia
//Exemplo: 2020-01-01 -> Janeiro

const getMonthName = (dateString) => {

    //Array com os meses do ano

    const months = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ];

    const monthIndex = new Date(dateString).getMonth();

    //Extrair o mes da data(considerando que a data está no formato ano-mes-dia)

    //Retornar o mes
    return months[monthIndex];

}

//Exporta a funcao getMonthName
export default getMonthName;