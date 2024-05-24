import { Link } from "react-router-dom";
import styled from "styled-components";

export const FlexWrapper = styled.div<{
    $type?: "column" | "row",
    $spacing?: string,
    $alignment?: string;
}>`
    display: flex;
    flex-direction: ${(props) => props.$type ?? "column"};
    gap: ${(props) => props.$spacing ?? "auto"};
    align-items: ${(props) => props.$alignment ?? "center"};
    justify-content: ${(props) => props.$alignment ?? "center"};
    width: 100%;
    `;


export const RegisterLink = styled(Link)`
    text-decoration: none;
    color: #1B1D37;
    font-size: 1rem;
    font-weight: 500;
    &:hover {
        text-decoration: underline;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
    margin: 0 auto;
`;

export const LoadingWrapper = styled(Wrapper)`
  margin-top: 0px;
  postiion: relative;
  width: 100%;
  height: 100%;
  background-color: indigo;
`;

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 300px;
`;

export const LoginHeaderTitle = styled.div`
    font-size: 2rem;
    font-weight: bold;
    margin-top: 2rem;
    text-align: left;
    color: #1B1D37;
    `;

export const LoginHeaderSubtitle = styled.div`
    font-size: .7rem;
    font-weight: 600;
    text-align: left;
    color: #1B1D37;
`;

export const FormItemWrapper = styled.div<{ $alignment?: string }>`
    display: flex;
    flex-direction: column;
    align-items: ${props => props.$alignment ?? "flex-start"};
    width: 300px;
    gap: 20px;
`;

export const Input = styled.input`
    display: flex;
    flex: 1;
    text-indent: 10px;
    min-height: 40px;
    font-size: small; 
    background-color: #F2F2F2; 
    outline: none; 
    border: 1px solid #1B1D37;
    border-radius: 6px;
`;

export const SubmitButton = styled.button`
    font-weight: 600; 
    color: white; 
    text-align: center;
    margin-top: 4px;
    border: none;
    border-radius: 7px; 
    background-color: #1B1D37;
    transition: .2s ease-in;
    &:hover {
        background-color: #1B1D37EC; 
    }

    cursor: pointer;
    min-width: 100%;
    height: 40px;
`;

export const ErrorContainer = styled.div<{ $hasError?: boolean }>`
  margin-top: 10px;
  height: 40px;
  width: 98%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const SuccessContainer = styled(ErrorContainer)``;

export const ErrorMessageContainer = styled.div`
height: 100%;
width: 100%;
padding-left: 10px;
font-size: 14;
background-color: rgba(255, 100, 100, 0.9);
color: white;
font-weight: 500;
border-radius: 10px;
display: flex;
align-items: center;
justify-content: flex-start;
gap: 10px;
`;
export const SuccessMessageContainer = styled(ErrorMessageContainer)`
    background-color: #1CA21CB5;
`;

export const ErrorsWrapper = styled.div`
    display: flex;    
    width: 100%;
    align-items: flex-start;
    justify-content: flex-start;
`;

export const ErrorText = styled.span`
    text-align: left; 
    color: #dc2626;
    font-size: .7rem;
    font-weight: bold;
`;

export const maskedInputStyle = `
    flex-1 
    pl-2 mr-2
    min-h-[40px]
    text-sm 
    bg-[#F2F2F2] 
    outline-0 
    border border-[#1B1D37] rounded
`;