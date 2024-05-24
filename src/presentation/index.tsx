import { Outlet } from "react-router-dom";
import { AuthProvider } from "./shared/contexts/auth";
import tw from "tailwind-styled-components";
import { AppHeader } from "./shared/components/Header";

const Wrapper = tw.div`
  flex
  flex-col
`;

export default function App() {
  return (
    <AuthProvider>
      <Wrapper>
        <AppHeader />
        <Outlet />
      </Wrapper>
    </AuthProvider>
  );
}
