document.addEventListener('DOMContentLoaded', () => {
  if (usuarioEstaLogado()) {
    window.location.href = 'pedidos.html';
    return;
  }

  const formulario = document.getElementById('formLogin');
  const campoUsuario = document.getElementById('usuario');
  const campoSenha = document.getElementById('senha');
  const erroUsuario = document.getElementById('erroUsuario');
  const erroSenha = document.getElementById('erroSenha');
  const mensagemErro = document.getElementById('mensagemErro');
  const botaoEntrar = document.getElementById('botaoEntrar');
  const linkEsqueciSenha = document.getElementById('linkEsqueciSenha');

  formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    esconderMensagens();

    const usuario = campoUsuario.value.trim();
    const senha = campoSenha.value;
    let valido = true;

    if (!usuario) {
      erroUsuario.style.display = 'block';
      valido = false;
    }

    if (!senha) {
      erroSenha.style.display = 'block';
      valido = false;
    }

    if (!valido) return;

    alternarCarregando(true);

    try {
      const resultado = await login(usuario, senha);
      localStorageSalvarSessao(resultado);
      window.location.href = 'pedidos.html';
    } catch (erro) {
      mensagemErro.textContent = erro.message || 'Usuário ou senha inválidos.';
      mensagemErro.style.display = 'block';
    } finally {
      alternarCarregando(false);
    }
  });

  linkEsqueciSenha.addEventListener('click', async (evento) => {
    evento.preventDefault();
    const usuario = campoUsuario.value.trim();

    if (!usuario) {
      mensagemErro.textContent = 'Informe seu usuário/matrícula acima antes de recuperar a senha.';
      mensagemErro.style.display = 'block';
      return;
    }

    try {
      await solicitarRecuperacaoSenha(usuario);
      alert('Se a matrícula existir, um código de recuperação foi enviado.');
    } catch (erro) {
      mensagemErro.textContent = erro.message || 'Não foi possível solicitar a recuperação de senha.';
      mensagemErro.style.display = 'block';
    }
  });

  const linkModoTeste = document.getElementById('linkModoTeste');
  linkModoTeste.addEventListener('click', (evento) => {
    evento.preventDefault();
    localStorageSalvarSessao({
      token: 'token-de-teste',
      nome: 'Atendente Teste',
      id: 1,
      nivelAcesso: 'FUNCIONARIO',
    });
    window.location.href = 'pedidos.html';
  });

  function esconderMensagens() {
    erroUsuario.style.display = 'none';
    erroSenha.style.display = 'none';
    mensagemErro.style.display = 'none';
  }

  function alternarCarregando(carregando) {
    botaoEntrar.disabled = carregando;
    botaoEntrar.textContent = carregando ? 'Entrando...' : 'Entrar';
  }
});
