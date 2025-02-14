//Importar a depenencia para criar css em componentes

import styled from "styled-components/native";
import theme from "./theme";

export const ContainerLogin = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${theme.colors.darkGray};
`;

export const Logo = styled.View`
  padding-bottom: 20px;
`;

export const ImageLogo = styled.Image`
  width: 120px;
  height: 120px;
`;

export const InputForm = styled.TextInput`
  background-color: #f5f5f5;
  width: 90%;
  margin-bottom: 15px;
  color: #10101c;
  font-size: 18px;
  border-radius: 6px;
  padding: 10px;
`;
export const BtnSubmitForm = styled.Pressable`
    background-color: ${theme.colors.primary};
    width: 90%;
    height: 45px;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
`;

export const TxtSubmitForm = styled.Text`
  color: #f5f5f5;
  font-size: 18px;
`;

export const BtnSubmitPressedForm = (pressed) => ({
  backgroundColor: pressed ? theme.colors.primaryDark : theme.colors.primary,
});
export const LinkLogin = styled.Text`
  color: ${theme.colors.primary};
  margin-top: 10px;
  font-size: 18px;
`;

export const LoadingArea = styled.View`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: ${theme.colors.blackTransparent};
    align-items: center;
    justify-content: center;
`;

// Inicio personalização dashboard
export const Container = styled.SafeAreaView`
    background-color: ${theme.colors.lightGray};
    flex: 1;
    padding: 8px;
    flex-direction: column;
    justify-content: flex-start;
    align-self: stretch;
`;

export const List = styled.View`
    width: 100%;
`;

export const RowDataHome = styled.TouchableOpacity`
    background-color: ${theme.colors.white};
    padding: 15px 10px;
    margin: 5px 5px;
    border-radius: 6px;
    align-items: center;
    border-width: 1px; 
    border-color: ${theme.colors.lightGray}; 
    border-style: solid; 
`;

export const SpaceBetweenHome = styled.View`
    margin-bottom: 10px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: 1; 
`;

export const TextHome = styled.Text`
    color: ${props => props.color || theme.colors.blueGray};
    flex: 1; 
    font-size: 18px;
`;
export const TextHomeSuccess = styled.Text`
    color: ${props => props.color || theme.colors.green};
    flex: 1; 
    font-size: 18px;
`;
export const TextHomeDanger = styled.Text`
    color: ${props => props.color || theme.colors.red};
    flex: 1; 
    font-size: 18px;
`;

export const ValueHome = styled.Text`
    color: ${theme.colors.blueGray};
    font-size: 18px;
`;

export const ContentSpaceBetweenHome = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: 1; 
`;

export const ValueHomeDanger = styled.Text`
    color: ${theme.colors.red};
    font-size: 18px;
`;

export const VerticalBarDanger = styled.View`
    width: 3px;
    height: 100%;
    background-color: ${theme.colors.red};
    margin-right: 10px; 
`;

export const ValueHomeContent = styled.Text`
    color: ${props => props.color || theme.colors.green};
    font-size: 18px;
    flex-shrink: 0; 
`;

export const VerticalBarContent = styled.View`
    width: 3px;
    height: 100%;
    background-color: ${props => props.color || theme.colors.green};
    margin-right: 10px; 
`;

export const ValueHomeSuccess = styled.Text`
    color: ${props => props.color || theme.colors.green};
    font-size: 18px;
    flex-shrink: 0; 
`;

export const VerticalBarSuccess = styled.View`
    width: 3px;
    height: 100%;
    background-color: ${props => props.color || theme.colors.green};
    margin-right: 10px; 
`;

export const ValueHomeWarning = styled.Text`
    color: ${theme.colors.orange};
    font-size: 18px;
`;

export const VerticalBarWarning = styled.View`
    width: 3px;
    height: 100%;
    background-color: ${theme.colors.orange};
    margin-right: 10px; 
`;

