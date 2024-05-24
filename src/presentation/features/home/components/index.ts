import styled from "styled-components";
import tw from "tailwind-styled-components";

export const Wrapper = tw.div`
  flex flex-1
  items-center
  justify-center

  w-full h-full
  sm:mt-10
`;

export const TaskListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 32vh);
  overflow-y : scroll;

  &::-webkit-scrollbar {
    width: 0;
  }

  &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    background-color: transparent;
    transition: 0.5s linear;
  }

  &::-webkit-scrollbar-thumb {
    background: #9c9c9c;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #9c9c9cbd;
    cursor: pointer;
  }
`;

export const Content = tw.div`
    flex flex-col
    w-full
    sm:w-2/3
    p-5
`;
export const InputContainer = tw.div`
    flex
    flex-row
    justify-between
    h-10
`;
export const Input = tw.input`
    flex-1 
    pl-2 mr-2
    text-sm 
    bg-[#F2F2F2] 
    outline-0 
    border border-[#1B1D37] rounded
    focus-visible:text-sm 
    focus-visible:font-semibold
`;
export const Button = tw.button`
    font-semibold 
    text-white sm:text-sm text-[.6rem]
    px-2 py-1.5 
    rounded 
    bg-[#1B1D37]
    hover:bg-[#1B1D37]/[0.9] 
    hover:ease-in duration-200
    `;