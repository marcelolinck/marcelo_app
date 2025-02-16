// Importar TouchableOpacity da biblioteca react-native
import { TouchableOpacity } from "react-native";

// Importar os ícones da biblioteca react-native-vector-icons.
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Importar o arquivo com os componentes CSS
import {
  Pagination,
  PaginationText,
  PaginationTextActive,
} from "../styles/custom";

// Criar o componente para paginação
function Paginate({ currentPage = 1, lastPage = 1, onPrevPage, onNextPage }) {
  return (
    <Pagination>
      {currentPage !== 1 && (
        <>
          <TouchableOpacity onPress={() => onPrevPage(1)}>
            <PaginationText>
              <MaterialCommunityIcons
                name="chevron-double-left"
                size={20}
                color={"#c0c0c0"}
              />
            </PaginationText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPrevPage(currentPage - 1)}>
            <PaginationText>
              <MaterialCommunityIcons
                name="chevron-left"
                size={20}
                color={"#c0c0c0"}
              />
            </PaginationText>
          </TouchableOpacity>
        </>
      )}

      <PaginationTextActive>{currentPage}</PaginationTextActive>

      {currentPage !== lastPage && (
        <>
          <TouchableOpacity onPress={() => onNextPage(currentPage + 1)}>
            <PaginationText>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color={"#c0c0c0"}
              />
            </PaginationText>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onNextPage(lastPage)}>
            <PaginationText>
              <MaterialCommunityIcons
                name="chevron-double-right"
                size={20}
                color={"#c0c0c0"}
              />
            </PaginationText>
          </TouchableOpacity>
        </>
      )}
    </Pagination>
  );
}

// Exportar a função
export default Paginate;
