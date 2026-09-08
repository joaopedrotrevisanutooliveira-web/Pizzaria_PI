document.addEventListener('DOMContentLoaded', () => {
  configurarAbas();
  configurarFormularioCliente();
  configurarConsultaCep();
});

/* ---------- Abas ---------- */

function configurarAbas() {
  const botoesAba = document.querySelectorAll('.cadastro__aba');
  const conteudos = {
    cliente: document.getElementById('abaCliente'),
    colaborador: document.getElementById('abaColaborador'),
    produto: document.getElementById('abaProduto'),
  };

  botoesAba.forEach((botao) => {
    botao.addEventListener('click', () => {
      botoesAba.forEach((b) => b.classList.remove('ativa'));
      botao.classList.add('ativa');

      Object.values(conteudos).forEach((el) => (el.style.display = 'none'));
      conteudos[botao.dataset.aba].style.display = 'block';
    });
  });
}

/* ---------- Formulário de cliente ---------- */

function configurarFormularioCliente() {
  const formulario = document.getElementById('formCliente');
  const mensagemErro = document.getElementById('mensagemErro');
  const mensagemSucesso = document.getElementById('mensagemSucesso');
  const botaoCadastrar = document.getElementById('botaoCadastrar');

  const campos = {
    nome: document.getElementById('nome'),
    telefone: document.getElementById('telefone'),
    cep: document.getElementById('cep'),
    numero: document.getElementById('numero'),
    bairro: document.getElementById('bairro'),
    rua: document.getElementById('rua'),
  };

  formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    esconderMensagens();

    if (!validarFormulario()) return;

    alternarCarregando(true);

    const dadosCliente = {
      nome: campos.nome.value.trim(),
      telefone: campos.telefone.value.trim(),
      endereco: {
        cep: campos.cep.value.trim(),
        rua: campos.rua.value.trim(),
        numero: campos.numero.value.trim(),
        bairro: campos.bairro.value.trim(),
      },
    };

    try {
      await cadastrarCliente(dadosCliente);
      mensagemSucesso.textContent = 'Cliente cadastrado com sucesso.';
      mensagemSucesso.style.display = 'block';
      formulario.reset();
    } catch (erro) {
      mensagemErro.textContent = erro.message || 'Não foi possível cadastrar o cliente.';
      mensagemErro.style.display = 'block';
    } finally {
      alternarCarregando(false);
    }
  });

  function validarFormulario() {
    let valido = true;

    if (!campos.nome.value.trim()) {
      document.getElementById('erroNome').style.display = 'block';
      valido = false;
    }
    if (!campos.telefone.value.trim()) {
      document.getElementById('erroTelefone').style.display = 'block';
      valido = false;
    }

    return valido;
  }

  function esconderMensagens() {
    mensagemErro.style.display = 'none';
    mensagemSucesso.style.display = 'none';
    document.querySelectorAll('.campo__erro').forEach((el) => (el.style.display = 'none'));
  }

  function alternarCarregando(carregando) {
    botaoCadastrar.disabled = carregando;
    botaoCadastrar.textContent = carregando ? 'Cadastrando...' : 'Cadastrar cliente';
  }
}

/* ---------- Preenchimento automático por CEP ---------- */

function configurarConsultaCep() {
  const campoCep = document.getElementById('cep');

  campoCep.addEventListener('blur', async () => {
    const dados = await consultarCep(campoCep.value);
    if (!dados) return;
    const campoRua = document.getElementById('rua');
    const campoBairro = document.getElementById('bairro');

    if (!campoRua.value) campoRua.value = dados.rua || '';
    if (!campoBairro.value) campoBairro.value = dados.bairro || '';
  });
}
