// --- BASE DE DADOS
const msg = {
  greeting: `Olá, *{clientName}*! Tudo bem?`,

  assistentIntro: `Aqui é o *{assistentName}*, assistente {of} *{managerName}*, {your} Gerente Estilo BB.`,

  managerIntro: `Aqui é o *{managerName}*, {your} Gerente Estilo BB.`,

  agendaRelacional: `*{firstNameClient}*, passando para saber como você está e reforçar que estou à disposição para ajudar em qualquer demanda no Banco do Brasil — seja *crédito, investimentos, seguros, financiamentos, consórcios ou cartões*.

Se precisar de alguma orientação personalizada, pode contar comigo por aqui!`,

  universoOurocard: `
  `,
};

// *** GETTING ELEMENTS ***
// --- INPUTS
const inputElements = {
  clienteName: document.getElementById("client-name"),
  wppNumber: document.getElementById("client-phone-number"),
  managerName: document.getElementById("manager-name"),
  assistentName: document.getElementById("assistent-name"),
  msgSelected: document.getElementById("wpp-message"),
  greetingMsg: document.getElementById("greeting"),
  suppPosition: document.getElementsByName("personSelected"),
};

const btnElements = {
  msgGenerator: document.getElementById("btn-message"),
  qrCodeGenerator: document.getElementById("btn-qrcode"),
  editMsg: document.getElementById("edit-message"),
};

// --- TESTE
btnElements["qrCodeGenerator"].addEventListener("click", () => {
  for (const radio of inputElements["suppPosition"]) {
    if (radio.checked) {
      alert(radio.value);
    }
  }
});

const getGreetingElement = document.getElementById("greeting");
const selectMessageElement = document.getElementById("wpp-message");
const editMessageElement = document.getElementById("edit-message");

// --- OUTPUTS
const textAreaElement = document.getElementById("message-area");

// --- BUTTONS
const btnMessageElement = document.getElementById("btn-message");

//  *** CODE ***
function addGreeting() {
  return getGreetingElement.checked;
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

btnMessageElement.addEventListener("click", () => {
  if (addGreeting()) {
    textAreaElement.value = `${msg["greeting"]}

${msg[`${selectSupport()}Intro`]}`;
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

// btnMessageElement.addEventListener("click", () => {
//   const greetingChecked = getGreetingElement.checked;
//   const responsablePersonSelected = getResponsablePersonElement;

//   alert(responsablePersonSelected);

//   if (greetingChecked) {
//     textAreaElement.value = msg["greeting"];
//   }
// });

// // --- CAPTURA DOS ELEMENTOS
// const clientNameElement = document.getElementById("client-name");
// const clientWppNumber = document.getElementById("client-phone-number");
// const textAreaEle = document.getElementById("message-area");
// const btnMessageElement = document.getElementById("btn-message");

// textAreaEle.value = msg["agendaRelacional"];

// btnMessageElement.addEventListener("click", () => {
//   textAreaEle.value = `${msg["greeting"]}

// ${msg["assistentIntro"].replace('{---}', )}

// ${msg["agendaRelacional"]}`;
// });

// function generateWhatsappMessage() {
//   const test = clientNameElement.value.trim();
//   alert(test);
// }
