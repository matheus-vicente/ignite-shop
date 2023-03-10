import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
});

export const Header = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",
});
