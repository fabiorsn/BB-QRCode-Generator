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
// DOM Elements
const DOM = {
  inputs: {
    clienteName: document.getElementById("client-name"),
    wppNumber: document.getElementById("client-phone-number"),
    managerName: document.getElementById("manager-name"),
    assistentName: document.getElementById("assistent-name"),
    msgSelected: document.getElementById("wpp-message"),
    greetingMsg: document.getElementById("greeting"),
    respPerson: [...document.querySelectorAll("input[name=personSelected]")],
  },
  buttons: {
    msgGenerator: document.getElementById("btn-message"),
    qrCodeGenerator: document.getElementById("btn-qrcode"),
    editMsg: document.getElementById("btn-editmsg"),
  },
  outputs: {
    msgArea: document.getElementById("message-area"),
    qrCodeArea: document.getElementById("qrCode-area"),
  },
};

// --- FEATS - BUTTONS
const setupTextAreaToggle = (triggerElement, targetElement) => {
  if (!triggerElement || !targetElement) return;

  const handleToggleEdit = () => {
    const { readOnly } = targetElement; // same as: const isReadOnly = targetElement.readOnly;
    targetElement.readOnly = !readOnly;

    if (!targetElement.readOnly) {
      activateTargetElement(targetElement);
    }
  };

  const activateTargetElement = (e) => {
    e.focus();
  };

  triggerElement.addEventListener("click", handleToggleEdit);
};

setupTextAreaToggle(DOM.buttons.editMsg, DOM.outputs.msgArea);

// function toggleTextAreaEdit(inputElement, outputElement) {
//   inputElement.addEventListener("click", () => {
//     outputElement.readOnly = !outputElement.readOnly;
//     if (!outputElement.readOnly) {
//       outputElement.focus();
//       // outputElement.setSelectionRange();
//     }
//   });
// }

// toggleTextAreaEdit(DOM.buttons.editMsg, DOM.outputs.msgArea);

// --- FUNCTIONS
function selectRespPerson() {
  return DOM.inputs.respPerson.find((radio) => radio.checked).value || null;
}

// --- EVENTS
DOM.buttons.qrCodeGenerator.addEventListener("click", () => {
  alert(selectRespPerson());
});

// // --- TESTE
// btnElements["qrCodeGenerator"].addEventListener("click", () => {
//   alert(selectRespPerson().value);
// });

// btnElements["msgGenerator"].addEventListener("click", () => {
//   // if (addGreeting()) {
//   if (inputElements["greetingMsg"].checked) {
//     outputElements["msgArea"].value = `${msg["greeting"]}

// ${msg[`${selectSupport()}Intro`]}`;
//   }
// });

// inputElements["msgSelected"].addEventListener("change", () => {
//   // const msg = inputElements["msgSelected"].value;
//   // alert(msg);
//   alert(inputElements["msgSelected"].value);
// });

// // --- EVENTS

// //  *** CODE ***
// function addGreeting() {
//   return inputElements["greetingMsg"].checked;
// }

// function selectSupport() {
//   return document.querySelector('input[name="personSelected"]:checked').value;
// }

// // --- EVENT LISTENER
// selectMessageElement.addEventListener("change", () => {
//   const messageSelected = selectMessageElement.value;

//   if (messageSelected == "personalizada") {
//     textAreaElement.value = messageSelected;
//     textAreaElement.disabled = false;
//     textAreaElement.focus();
//   } else {
//     textAreaElement.value = messageSelected;
//     textAreaElement.disabled = true;
//   }
// });

// editMessageElement.addEventListener("click", () => {
//   if (textAreaElement.disabled) {
//     textAreaElement.disabled = false;
//     textAreaElement.focus();
//   } else {
//     textAreaElement.disabled = true;
//   }
// });
