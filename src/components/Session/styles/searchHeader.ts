import styled from "styled-components";
import { Button } from "styles/components";
import { baseTheme } from "styles/theme";

export const CinemaHeader = styled.div`
  margin: 40px 0 20px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ToggleButtonProps {
  $edit: boolean;
}

export const ToggleButton = styled(Button)<ToggleButtonProps>`
  margin-left: 20px;
`;

export const SearchForm = styled.div`
  position: relative;
`;

export const SearchInput = styled.input`
  outline: none;
  padding: 5px 10px;
  background: transparent;
  border: 2px solid #6fcefd;
  color: ${baseTheme.colors.primary};
  border-radius: ${baseTheme.borderRadius};
  box-shadow: ${baseTheme.shadow};
`;

export const AutocompleteList = styled.ul`
  position: absolute;
  left: 0;
  top: 52px;
  width: 100%;
  height: auto;
  overflow: auto;
  font-size: 1.1rem;
  max-height: 240px;
  color: ${baseTheme.colors.dark};
  box-shadow: ${baseTheme.shadow};
  border-radius: ${baseTheme.borderRadius};
  z-index: ${baseTheme.order.autocomplete};
  background-color: #fff;
  li {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    transition: background-color ${baseTheme.durations.ms200}ms ease-out;
    span {
      color: ${baseTheme.colors.light};
    }
    &:hover {
      cursor: pointer;
      background-color: #dbdbdb;
    }
  }
`;
