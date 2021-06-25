const abaAprovados = document.querySelector('#aba_aprovados');
const abaPendentes = document.querySelector('#aba_pendentes');
const abaComentados = document.querySelector('#aba_comentados');
const abaRevisao = document.querySelector('#aba_revisao');
const corpo = document.querySelector('#corpo');
const modalComentario = document.querySelector('#modal-comentario');
const comentario = document.querySelector('#comentario');
const cancelarComentario = document.querySelector('#cancelar-comentario');
const salvarComentario = document.querySelector('#salvar-comentario');
const ambiente = 'http://localhost:3000';
const headers = { "Content-Type": "application/json" }
const delayEntreAcoes = 200;
const delayAtualizacao = 50;
const delayCarregamentoDoArtigo = 4000;
const seletorTopico = ".topico";

let podeAgir = true;
let botoesRemover;
let botoesAprovar;
let botoesComentar;
let botoesRevisado;