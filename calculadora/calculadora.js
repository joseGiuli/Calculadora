'use strict';

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=num]'); //Qualquer elemento que parte do atributo seja num
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;

const calcular = () => {
    if (operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.')); // Encontrar a virgula e trocar por ponto
        novoNumero = true;

        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`); //Usando eval
        atualizarDisplay(resultado);
        
         // Teste
        /* if (operador == '+'){
            atualizarDisplay(numeroAnterior + numeroAtual);
        }else if (operador == '-'){
            atualizarDisplay(numeroAnterior - numeroAtual);
        }else if (operador == '*'){
            atualizarDisplay(numeroAnterior * numeroAtual);
        }else if (operador == '/'){
            atualizarDisplay(numeroAnterior / numeroAtual);
        } */
    }
}

const atualizarDisplay = (texto) => { 
    if (novoNumero){
        // texto.toLocaleString('BR') símbolo decimal do Brasil
        display.textContent = texto.toLocaleString('BR'); // também  é possível utilizando REPLACE 
        novoNumero = false;
    } else {
        display.textContent += texto;
    }
    
}
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach (numero => numero.addEventListener('click', inserirNumero));

const selecionarOperador = (evento) => {
    if (!novoNumero){
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',','.')); // replace na , por .
    }
}

operadores.forEach (operador => operador.addEventListener('click', selecionarOperador));

const ativarIgual = () => {
    calcular();
    operador = undefined;
}

document.getElementById('igual').addEventListener('click', ativarIgual);

const limparTela = () => display.textContent = '';
document.getElementById('limparTela').addEventListener('click', limparTela);

const limparCalculo = () => {
    limparTela();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}

document.getElementById('limparCalculo').addEventListener('click', limparCalculo);
// Como o textContent retorna uma string, e uma string é um array de caracteres, é possível utilizar o slice.
const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1); 
document.getElementById('apagar').addEventListener('click', removerUltimoNumero);

const inverterSinal = () => { 
 novoNumero = true;
 atualizarDisplay (display.textContent * -1);
 }
document.getElementById('inverter').addEventListener('click', inverterSinal);

const existeDecimal = () => display.textContent.indexOf(',') !== -1; // Procurar se existe a , no texto
const existeValor = () => display.textContent.length > 0; // Ver se o valor é maior que 0

const inserirDecimal = () => {
    if(!existeDecimal()){
        if (existeValor()){
        atualizarDisplay(',');
    }else{
        atualizarDisplay('0,');
    }
  }
}

document.getElementById('decimal').addEventListener('click', inserirDecimal);







