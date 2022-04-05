import styled from "styled-components";
import { baseTheme } from "styles/theme";

export const MainContainer = styled.main`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr ${baseTheme.sizes.aside.width}px;
  grid-template-rows: ${baseTheme.sizes.header.height}px 1fr;
  color: ${baseTheme.colors.font};
  background-color: ${baseTheme.colors.bg};
`;
