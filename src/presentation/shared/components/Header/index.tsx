import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  margin: 0px;
  padding: 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);

  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1000;
  background-color: #ffffff;
`;
const HeaderContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  gap: 10px;
`;
const VerticalDivider = styled.div`
  border: 1px solid;
  margin-right: 2px;
  width: 0.1rem;
  height: 100%;
  background-color: #1b1d37;
`;
const HeaderTitleContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
`;

const HeaderTitle = styled.span`
  font-weight: bold;
  color: #1b1d37;
`;

const HeaderSubtitle = styled(HeaderTitle)`
  font-weight: 400;
  font-size: small;
  color: #1b1d37;
`;

const SignoutButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 70px;
`;

const SignoutButton = styled.i`
  color: #1b1d37;
  font-size: 20px;
  cursor: pointer;
`;

export const AppHeader = ({
  showLogout,
  onLogout,
}: {
  showLogout?: boolean;
  onLogout?: () => void;
}) => {
  const { logout } = useAuth();

  return (
    <Header>
      <HeaderContent>
        <VerticalDivider />
        <HeaderTitleContent>
          <HeaderTitle>TODO LIST</HeaderTitle>
          <HeaderSubtitle>Teste Desenvolvimento Web</HeaderSubtitle>
        </HeaderTitleContent>
      </HeaderContent>
      {showLogout && (
        <SignoutButtonContainer>
          <SignoutButton
            className="pi pi-sign-out"
            onClick={logout}
          ></SignoutButton>
        </SignoutButtonContainer>
      )}
    </Header>
  );
};
