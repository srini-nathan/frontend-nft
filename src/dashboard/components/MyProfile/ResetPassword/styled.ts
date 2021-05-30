import styled from "styled-components";

export const MainContainer = styled.main`
  width: auto;
  margin: 2rem;
  padding-top: 2.125rem;
  flex: auto;
  flex-direction: column;
  @media (max-width: 800px) {
    width: initial;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }
`;
