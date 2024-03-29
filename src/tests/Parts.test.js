import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Parts from '../pages/Parts';

describe('testes da tela Parts', () => {

  beforeEach(() => {
    render(
      <BrowserRouter>
        <Parts/>
      </BrowserRouter>
    );
  });

  it('Existe card em Parts?', () => {
    expect(screen.getByTestId('mycard')).toBeInTheDocument();
  });

  it('Existe link Novo em Parts?', () => {
    expect(screen.getByTestId('mylink')).toBeInTheDocument();
  });

  it('Existe tabela em Parts?', () => {
    expect(screen.getByTestId('mytable')).toBeInTheDocument();
  });

  it('Existe botão editar em Parts?', () => {
    expect(screen.getByTestId('mybtn1')).toBeInTheDocument();
  });

  it('Existe botão excluir em Parts?', () => {
    expect(screen.getByTestId('mybtn2')).toBeInTheDocument();
  });

});