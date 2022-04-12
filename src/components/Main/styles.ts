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

export const HallItemContent = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 1.2rem;
  padding: 15px;
`;

export const HallItemPoster = styled(HallItemContent)<{ $poster?: string }>`
  background: ${({ $poster }) =>
    `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.2)), 50% 0% / cover url(${imageBase}${$poster})`};
  transform: scale(1.05);
  transition: all 1s ease-out;
`;

export const HallItem = styled.div`
  overflow: hidden;
  position: relative;
  height: 300px;
  border-radius: ${baseTheme.borderRadius};
  background: ${baseTheme.colors.primary};
  &:hover ${HallItemPoster} {
    transform: scale(1);
    transition: all 1s ease-in;
  }
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
