import styled from "styled-components";
import { Button } from "styles/components";
import { baseTheme } from "styles/theme";

export const CinemaHall = styled.div`
  position: relative;
  margin: 70px auto 20px;
  display: flex;
  width: 695px;
  height: 375px;
  flex-wrap: wrap;
  justify-content: center;
`;

interface SeatItemProps {
  $reserved: boolean;
  $x: number;
  $y: number;
  $height: number;
  $width: number;
}

export const SeatItem = styled.div<SeatItemProps>`
  cursor: pointer;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 75px;
  height: 65px;
  padding: 5px;
  margin: 5px;
  text-align: right;
  top: ${({ $y }) => $y}px;
  right: ${({ $x }) => $x}px;
  border-radius: ${baseTheme.borderRadius};
  background-color: ${({ $reserved }) =>
    $reserved ? baseTheme.colors.success : baseTheme.colors.primary};

  &:hover {
    background-color: ${({ $reserved }) =>
      $reserved ? baseTheme.colors.success : baseTheme.colors.secondary};
    > * {
      opacity: 1;
    }
  }
  > * {
    transition: opacity ${baseTheme.durations.ms200}ms ease-out;
    opacity: 0;
  }
`;

export const ButtonSeatEdit = styled(Button)`
  position: absolute;
  top: 5px;
  left: 5px;
  font-size: 0.8rem;
  &:hover {
    background-color: ${baseTheme.colors.light};
  }
`;
