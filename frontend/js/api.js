const API_BASE_URL = 'http://localhost:8080';

async function requisitar(caminho, opcoes = {}) {
  const token = localStorageObterToken();

  const cabecalhos = {
    'Content-Type': 'application/json',
    ...(opcoes.headers || {}),
  };

  if (token) {
    cabecalhos['Authorization'] = `Bearer ${token}`;
  }

  let resposta;
  try {
    resposta = await fetch(`${API_BASE_URL}${caminho}`, {
      ...opcoes,
      headers: cabecalhos,
    });
  } catch (erroDeRede) {
    throw new ErroApi('Não foi possível conectar ao servidor. Tente novamente.', 0, null);
  }

  const corpoTexto = await resposta.text();
  const corpo = corpoTexto ? JSON.parse(corpoTexto) : null;

  if (!resposta.ok) {
    const mensagem = corpo?.mensagem || 'Ocorreu um erro inesperado.';
    throw new ErroApi(mensagem, resposta.status, corpo);
  }

  return corpo;
}

class ErroApi extends Error {
  constructor(mensagem, status, corpo) {
    super(mensagem);
    this.status = status;
    this.corpo = corpo;
  }
}

function login(matricula, senha) {
  return requisitar('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ matricula, senha }),
  });
}

function solicitarRecuperacaoSenha(matricula) {
  return requisitar('/auth/recuperar-senha', {
    method: 'POST',
    body: JSON.stringify({ matricula }),
  });
}

function buscarClientes(termo) {
  return requisitar(`/clientes/busca?q=${encodeURIComponent(termo)}`, { method: 'GET' });
}

function cadastrarCliente(dadosCliente) {
  return requisitar('/clientes', {
    method: 'POST',
    body: JSON.stringify(dadosCliente),
  });
}

function cadastrarColaborador(dadosColaborador) {
  return requisitar('/colaboradores', {
    method: 'POST',
    body: JSON.stringify(dadosColaborador),
  });
}

function listarProdutos() {
  return requisitar('/pizzas', { method: 'GET' });
}

function buscarProdutos(termo) {
  return requisitar(`/pizzas/busca?q=${encodeURIComponent(termo)}`, { method: 'GET' });
}

async function consultarCep(cep) {
  const cepLimpo = cep.replace(/\D/g, '');
  if (cepLimpo.length !== 8) return null;

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    const dados = await resposta.json();
    if (dados.erro) return null;
    return {
      rua: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
    };
  } catch {
    return null;
  }
}

function criarPedido(dadosPedido) {
  return requisitar('/pedidos', {
    method: 'POST',
    body: JSON.stringify(dadosPedido),
  });
}

function cancelarPedido(pedidoId) {
  return requisitar(`/pedidos/${pedidoId}`, { method: 'DELETE' });
}

function localStorageSalvarSessao({ token, nome, id, nivelAcesso }) {
  localStorage.setItem('cityPizzas_token', token);
  localStorage.setItem('cityPizzas_usuario', JSON.stringify({ nome, id, nivelAcesso }));
}

function localStorageObterToken() {
  return localStorage.getItem('cityPizzas_token');
}

function localStorageObterUsuario() {
  const bruto = localStorage.getItem('cityPizzas_usuario');
  return bruto ? JSON.parse(bruto) : null;
}

function localStorageEncerrarSessao() {
  localStorage.removeItem('cityPizzas_token');
  localStorage.removeItem('cityPizzas_usuario');
}

function usuarioEstaLogado() {
  return Boolean(localStorageObterToken());
}

function usuarioEhAdministrador() {
  return localStorageObterUsuario()?.nivelAcesso === 'ADMINISTRADOR';
}
