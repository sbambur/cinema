import { imageBase } from "api/api";
import styled from "styled-components";
import { baseTheme } from "styles/theme";

export const ContentContainer = styled.div`
  padding: 10px;
  overflow: auto;
`;

export const Aside = styled.div`
  grid-row-start: span 2;
  border-left: 2px solid #717171;
  padding: 10px;
`;

export const HallList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
`;

interface HallItemProps {
  $poster?: string;
}

export const HallItem = styled.div<HallItemProps>`
  overflow: hidden;
  font-size: 1.2rem;
  padding: 15px;
  height: 300px;
  border-radius: ${baseTheme.borderRadius};
  background: ${({ $poster }) =>
    $poster
      ? `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.2)), 50% 0% / cover url(${imageBase}${$poster})`
      : baseTheme.colors.primary};
`;

export const HallItemCreate = styled(HallItem)`
  background-color: ${baseTheme.colors.light};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  cursor: pointer;
  transition: background-color ${baseTheme.durations.ms200}ms ease-out;
  &:hover {
    background-color: ${baseTheme.colors.secondary};
  }
`;
