import styled from 'styled-components'

interface ButtonProps{
    color: string;
    textColor?: any;
}

export const Botao = styled.button<ButtonProps>`
background-color: ${props => props.color};
color: ${props => props.textColor};
padding: 5px;
border-radius: 5px;
border: none;
outline: none;
`