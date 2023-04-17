import styled from 'styled-components'

export const Input = styled.input`
    width: 50%;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 4px; 
    background-color: white;
    color: black;
    text-align: center;
    @media (max-width: 768px) {
        width: 100%;
    }
`