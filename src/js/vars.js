const abaAprovados = document.querySelector('#aba_aprovados');
const abaPendentes = document.querySelector('#aba_pendentes');
const abaComentados = document.querySelector('#aba_comentados');
const corpo = document.querySelector('#corpo');
const modalComentario = document.querySelector('#modal-comentario');
const cancelarComentario = document.querySelector('#cancelar-comentario');
const salvarComentario = document.querySelector('#salvar-comentario');
const ambiente = 'http://localhost:3000';
const headers = { "Content-Type": "application/json" }

let botoesRemover;
let botoesAprovar;
let botoesComentar;