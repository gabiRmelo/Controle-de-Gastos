const controleGastos = {
    ganhos: 0,
    despesas: 0,
    saldo: 0
};

const InputGanhoNome = document.querySelector('.InputGanhoNome');
const InputGanhoValor = document.querySelector('.InputGanhoValor');
const buttonGanho = document.querySelector('.InputGanhos button');

buttonGanho.addEventListener('click', capturarValorGanho);

function capturarValorGanho() {
    const nomeGanho = InputGanhoNome.value;
    const valorGanho = Number(InputGanhoValor.value);

    controleGastos.ganhos += valorGanho;
    controleGastos.saldo += valorGanho;

    atualizarInterface();

    mensagem();

    adicionarGanhoInterface(nomeGanho, valorGanho);
    
    limparCampo();
}

const InputDespesaNome = document.querySelector('.InputDespesaNome');
const InputDespesaValor = document.querySelector('.InputDespesaValor');
const buttonDespesa = document.querySelector('.InputDespesas button');

buttonDespesa.addEventListener('click', capturarValorDespesa);

function capturarValorDespesa() {
    const nomeDespesa = InputDespesaNome.value;
    const valorDespesa = Number(InputDespesaValor.value);

    controleGastos.despesas += valorDespesa;
    controleGastos.saldo -= valorDespesa;

    atualizarInterface();

    mensagem();

    adicionarDespesaInterface(nomeDespesa, valorDespesa);
    
    limparCampo();  
}

const ganhos = document.querySelector('.ResultadoGanhos p');
const despesas = document.querySelector('.ResultadoDespesas p');
const saldo = document.querySelector('.ResultadoSaldo p');

function atualizarInterface() {
    ganhos.innerText = `+ R$ ${controleGastos.ganhos}`;
    despesas.innerText = `- R$ ${controleGastos.despesas}`;
    saldo.innerText = `R$ ${controleGastos.saldo}`;
}

const listaGeral = document.querySelector('.CDLista');

function adicionarDespesaInterface(nomeDespesa, valorDespesa) {
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const img = document.createElement('img');

    h3.innerText = nomeDespesa;
    p.innerText = `R$ ${valorDespesa}`;

    img.src = './assets/trash.png';
    img.alt = 'Icone Lixeira';
    
    img.addEventListener('click', removerDespesa);

    li.dataset.valor = valorDespesa;
    li.appendChild(h3);
    li.appendChild(p);
    li.appendChild(img);

    listaGeral.appendChild(li);
}

function adicionarGanhoInterface(nomeGanho, valorGanho) {
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const img = document.createElement('img');

    h3.innerText = nomeGanho;
    p.innerText = `R$ ${valorGanho}`;

    img.src = './assets/trash.png';
    img.alt = 'Icone Lixeira';
    
    img.addEventListener('click', removerGanho);

    li.dataset.valor = valorGanho;
    li.appendChild(h3);
    li.appendChild(p);
    li.appendChild(img);

    listaGeral.appendChild(li);
}

function adicionarDespesaInterface(nomeDespesa, valorDespesa) {
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const img = document.createElement('img');

    li.className = 'ListaDespesa';
    
    h3.innerText = nomeDespesa;
    p.innerText = `R$ ${valorDespesa}`;

    img.src = './assets/trash.png';
    img.alt = 'Icone Lixeira';
    
    img.addEventListener('click', removerDespesa);

    li.dataset.valor = valorDespesa;
    li.appendChild(h3);
    li.appendChild(p);
    li.appendChild(img);

    listaGeral.appendChild(li);
}

function removerDespesa(evento) {
    const apagarDespesa = evento.target.parentNode;
    const DespesaApagada = Number(apagarDespesa.dataset.valor);

    controleGastos.despesas -= DespesaApagada;
    controleGastos.saldo += DespesaApagada;

    atualizarInterface();
    apagarDespesa.remove();
}

function removerGanho(evento) {
    const apagarGanho = evento.target.parentNode;
    const GanhoApagado = Number(apagarGanho.dataset.valor);

    controleGastos.ganhos -= GanhoApagado;
    controleGastos.saldo -= GanhoApagado;

    atualizarInterface();
    apagarGanho.remove();
}

function limparCampo() {
    InputGanhoNome.value = '';
    InputGanhoValor.value ='';
    InputDespesaNome.value = '';
    InputDespesaValor.value ='';
}

const Toast = {
    init() {
      this.hideTimeout = null;
      
      this.el = document.createElement('div');
      this.el.className = 'toast';
      document.body.appendChild(this.el);
    },
    show(message) {
        clearTimeout(this.hideTimeout);

        this.el.textContent = message;
        this.el.className = 'toast toast--visible';
        
        this.hideTime = setTimeout(() => {
            this.el.classList.remove('toast--visible');
        }, 2000);    
    }
};

function mensagem() {
    if (controleGastos.saldo <= 0)
    {
        Toast.init();
        Toast.show('Alerta vermelho! Hora de economizar =)');          
    }
}


