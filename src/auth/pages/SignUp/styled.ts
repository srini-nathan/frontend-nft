import styled from "styled-components";

export const MainContainer = styled.main`
  width: 800px;
  margin: 0 auto;
  padding-top: 3.125rem;
  display: flex;
  flex-direction: column;
  height: 100vh;
  @media (max-width: 800px) {
    width: initial;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }
`;
