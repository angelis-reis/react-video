import styled from "styled-components";

const StyledVideo = styled.div`
  position: relative;
  -webkit-box-flex: 2;
  -ms-flex: 2 0 900px;
  flex: 2 0 900px;
  margin-right: 8px;

  @media screen and (max-width: 1200px) {
    width: 100%;
    display: block;
  }
`;

export default StyledVideo;