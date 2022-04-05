import styled, { css } from "styled-components";
import { baseTheme } from "styles/theme";
import { Link } from "react-router-dom";

export const HallHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  font-size: 1.8rem;
  background-color: ${baseTheme.colors.dark};
`;

const ButtonStyles = css`
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  padding: 5px 10px;
  border: none;
  font-size: 1rem;
  border-radius: ${baseTheme.borderRadius};
  color: ${baseTheme.colors.font};
  background-color: ${baseTheme.colors.dark};
  transition: background-color ${baseTheme.durations.ms200}ms ease-out;
  &:hover {
    background-color: ${baseTheme.colors.secondary};
  }
`;

export const StyledLink = styled(Link)`
  ${ButtonStyles}
`;

export const Button = styled.button`
  ${ButtonStyles}
`;

export const ButtonDel = styled(Button)`
  background-color: ${baseTheme.colors.light};
  &:hover {
    background-color: ${baseTheme.colors.danger};
  }
`;

export const Controls = styled.div`
  margin-top: 10px;
  display: flex;
  column-gap: 10px;
  row-gap: 10px;
  flex-wrap: wrap;
`;
