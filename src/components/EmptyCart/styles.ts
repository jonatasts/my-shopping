import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  margin-top: 32px;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.Image.attrs({
  resizeMode: "contain",
})`
  width: 200px;
  height: 200px;
  margin-right: 40px;
`;

export const Description = styled.Text`
  font-size: 20px;
  font-family: ${({ theme }) => theme.FONTS.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY800};
  text-align: center;
  margin-top: 10px;
`;
