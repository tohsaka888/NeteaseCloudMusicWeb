import styled from "styled-components";
import HotDj from "./HotDj";
import Login from "./Login";
import TopArtists from "./TopArtists";

const Container = styled.div`
  width: 16vw;
  height: 100%;
  border: 1px solid #cecece;
  border-left: none;
  border-right: none;
  min-width: 25%;
  /* height: 100%; */
`;

export default function SideContent() {
  return (
    <Container>
      <Login />
      <TopArtists />
      <HotDj />
    </Container>
  );
}
