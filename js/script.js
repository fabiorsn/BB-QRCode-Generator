// --- BASE DE DADOS
const msg = {
  greeting: `Olá, *{clientName}*! Tudo bem?`,

  assistentIntro: `Aqui é o *{assistentName}*, assistente {of} *{managerName}*, {your} Gerente Estilo BB.`,

  managerIntro: `Aqui é o *{managerName}*, {your} Gerente Estilo BB.`,

  agendaRelacional: `*{firstNameClient}*, passando para saber como você está e reforçar que estou à disposição para ajudar em qualquer demanda no Banco do Brasil — seja *crédito, investimentos, seguros, financiamentos, consórcios ou cartões*.

Se precisar de alguma orientação personalizada, pode contar comigo por aqui!`,

  universoOurocard: `Universo Ourocard`,
  rendeFacil: `Rende Facil`,
  personalizada: `Personalizada`,
};

// --- GETTING ELEMENTS
// Inputs
const inputElements = {
  clienteName: document.getElementById("client-name"),
  wppNumber: document.getElementById("client-phone-number"),
  managerName: document.getElementById("manager-name"),
  assistentName: document.getElementById("assistent-name"),
  msgSelected: document.getElementById("wpp-message"),
  greetingMsg: document.getElementById("greeting"),
  suppPosition: document.getElementsByName("personSelected"),
};
// Buttons
const btnElements = {
  msgGenerator: document.getElementById("btn-message"),
  qrCodeGenerator: document.getElementById("btn-qrcode"),
  editMsg: document.getElementById("edit-message"),
};
// Outputs
const outputElements = {
  msgArea: document.getElementById("message-area"),
  qrCodeArea: document.getElementById("qrCode-area"),
};

// --- FUNCTIONS
function selectSuppPosition() {
  return inputElements["suppPosition"].find((radio) => radio.checked) || null;
}

// --- TESTE
btnElements["qrCodeGenerator"].addEventListener("click", () => {
  alert(selectSuppPosition().value);
});

btnElements["msgGenerator"].addEventListener("click", () => {
  // if (addGreeting()) {
  if (inputElements["greetingMsg"].checked) {
    outputElements["msgArea"].value = `${msg["greeting"]}

${msg[`${selectSupport()}Intro`]}`;
  }
});

inputElements["msgSelected"].addEventListener("change", () => {
  // const msg = inputElements["msgSelected"].value;
  // alert(msg);
  alert(inputElements["msgSelected"].value);
});

// --- EVENTS

//  *** CODE ***
function addGreeting() {
  return inputElements["greetingMsg"].checked;
}

function selectSupport() {
  return document.querySelector('input[name="personSelected"]:checked').value;
}

// --- EVENT LISTENER
selectMessageElement.addEventListener("change", () => {
  const messageSelected = selectMessageElement.value;

  if (messageSelected == "personalizada") {
    textAreaElement.value = messageSelected;
    textAreaElement.disabled = false;
    textAreaElement.focus();
  } else {
    textAreaElement.value = messageSelected;
    textAreaElement.disabled = true;
  }
});

editMessageElement.addEventListener("click", () => {
  if (textAreaElement.disabled) {
    textAreaElement.disabled = false;
    textAreaElement.focus();
  } else {
    textAreaElement.disabled = true;
  }
});
