import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Button from "./components/Button/Button";

describe("Login Page", () => {
  let component;

  beforeEach(() => {
    component = render(<Login />, { wrapper: BrowserRouter });
  });

  it("O teste deve renderizar a entrada de e-mail", () => {
    const emailInput = component.container.querySelector("#email");
    expect(emailInput).toBeVisible();
  });

  it("O teste deve renderizar a entrada de senha", () => {
    const passwordInput = component.container.querySelector("#password");
    expect(passwordInput).toBeVisible();
  });

  it("O teste deve renderizar o botao de login", () => {
    const loginButton = screen.getByText(/entrar/i);
    expect(loginButton).toBeVisible();
  });

  it("O teste deve mostrar que tem formatos invalidos", () => {
    const inputEmail = component.container.querySelector("#email");
    const inputPassword = component.container.querySelector("#password");
    const loginButton = screen.getByText(/entrar/i);

    const email = "test@gmail.com";
    fireEvent.change(inputEmail, { target: { value: email } });
    expect(inputEmail).toHaveValue(email);

    const password = "invalido";
    fireEvent.change(inputPassword, { target: { value: password } });
    expect(inputPassword).toHaveValue(password);

    fireEvent.click(loginButton);

    expect(screen.getByText(/incorreto/i)).toBeInTheDocument();
  });

  it("O teste deve buscar após o login", async () => {
    const inputEmail = component.container.querySelector("#email");
    const inputPassword = component.container.querySelector("#password");
    const loginButton = screen.getByText(/entrar/i);

    const email = "test@gmail.com";
    fireEvent.change(inputEmail, { target: { value: email } });
    expect(inputEmail).toHaveValue(email);

    const password = "Abcdef123.@1";
    fireEvent.change(inputPassword, { target: { value: password } });
    expect(inputPassword).toHaveValue(password);

    fireEvent.click(loginButton);

    await waitFor(() =>
      expect(screen.getByText(/incorreto/i)).toBeInTheDocument()
    );
  });
});

describe("Button", () => {
  it("O teste deve renderizar o botão com o child correto", () => {
    render(<Button children="test" />);
    expect(screen.getByText("test")).toBeVisible();
  });
});
