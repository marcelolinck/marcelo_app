//Incluir os componentes utilizado para estruturar o conteudo
import { ActivityIndicator } from "react-native";

//Importar o arquivo com os componentes css.
import { LoadingArea } from "../styles/custom";

//Componente de loading
const Loading = ({size="large", color="#f5f5f5"}) => (
<LoadingArea>
    <ActivityIndicator size={size} color={color} />
</LoadingArea>
);

//Exportar a funcao criada
export default Loading