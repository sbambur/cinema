import styled from "styled-components";

export const SideHeader = styled.p`
  font-size: 1.5rem;
  text-align: center;
  font-weight: 400;
`;

export const StatisticContainer = styled.div`
  margin-top: 40px;
  > div {
    margin-top: 20px;
  }
`;

export const MoviePoster = styled.div`
  max-width: 70%;
  margin: 0 auto;
`;

export const MoviesListSlider = styled.div`
  height: 500px;
  overflow-y: hidden;
`;

export const MoviesItem = styled.div`
  text-align: center;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  padding: 20px 0 40px;
`;

export const MovieItem = styled.div`
  height: 500px;
  overflow: auto;
  padding: 20px 0 40px;
  p {
    margin: 15px 0;
  }
`;
