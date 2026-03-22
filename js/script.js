// --- DOM Elements
const DOM = {
  inputs: {
    get clientName() {
      return document.getElementById("client-name");
    },
    get wppNumber() {
      return document.getElementById("client-phone-number");
    },
    get managerName() {
      return document.getElementById("manager-name");
    },
    get assistentName() {
      return document.getElementById("assistent-name");
    },
    get msgSelected() {
      return document.getElementById("wpp-message");
    },
    get greetingMsg() {
      return document.getElementById("greeting");
    },
    get respPerson() {
      return document.querySelector("input[name=personSelected]:checked");
      // return Array.from(document.querySelectorAll("input[name=personSelected]:checked")); -> seleciona todos os radios
    },
  },
  buttons: {
    get msgGenerator() {
      return document.getElementById("btn-message");
    },
    get qrCodeGenerator() {
      return document.getElementById("btn-qrcode");
    },
    get editMsg() {
      return document.getElementById("btn-editmsg");
    },
  },
  outputs: {
    get msgArea() {
      return document.getElementById("message-area");
    },
    get qrCodeArea() {
      return document.getElementById("qrCode-area");
    },
  },
};

// --- BASE DE DADOS
const dbPreposicao = ["de", "do", "da", "dos", "das"];
const dbControlPronome = {
  F: ["da", "sua"],
  M: ["do", "seu"],
};
const dbCarteira = [
  { carteira: "18", nome: "Maria de Fátima", sexo: "F" },
  { carteira: "19", nome: "Wallyson", sexo: "M" },
  { carteira: "20", nome: "Nei Evandro", sexo: "M" },
  { carteira: "21", nome: "Adriano", sexo: "M" },
  { carteira: "22", nome: "Rodrigo", sexo: "M" },
  { carteira: "24", nome: "Rogério", sexo: "M" },
  { carteira: "46", nome: "Najara", sexo: "F" },
  { carteira: "47", nome: "", sexo: "" },
  { carteira: "51", nome: "Rubens", sexo: "M" },
  { carteira: "52", nome: "Rafael", sexo: "M" },
];
const dbMensagemSelect = [
  { value: "agendaRelacional", text: "Agenda Relacional" },
  { value: "universoOurocard", text: "Universo Ourocard" },
  { value: "rendeFacil", text: "Rende Fácil" },
];
const dbMensagens = {
  introducao: {
    geral: "Olá, *{nomeCliente}*! Tudo bem?",
    assistente: `Aqui é o *{nomeAssistente}*, assistente {of} *{nomeGerente}*, {your} Gerente Estilo BB.`,
    gerente: `Aqui é o *{nomeGerente}*, {your} Gerente Estilo BB.`,
  },
  produto: {
    agendaRelacional: `*{primeiroNomeCliente}*, passando para saber como você está e reforçar que estou à disposição para ajudar em qualquer demanda relacionada ao Banco do Brasil - seja *crédito, investimento, seguro, financiamento, consórcio, cartão ou outra demanada*.\n\nSe precisar de alguma orientação personalizada, pode contar conosco por aqui! ❤️📲`,
    universoOurocard: `Quero aproveitar para te falar de um benefício que muitos clientes Estilo têm gostado `,
    rendeFacil: `Rende Fácil`,
  },
  fechamento: {
    assistente: `Se precisar de alguma orientação personalizada, pode contar conosco por aqui! ❤️📲`,
    gerente: `Se precisar de alguma orientação personalizada, pode contar comigo por aqui! ❤️📲`,
  },
};

// --- CREATE SELECTS
const createSelectOption = (dataSource, targetElement, valueField, textField) => {
  dataSource.forEach((item) => {
    if (!item[textField]) return;

    const option = document.createElement("option");
    option.value = item[valueField];
    option.textContent = item[textField];
    targetElement.appendChild(option);
  });
};

try {
  createSelectOption(dbCarteira, DOM.inputs.managerName, "carteira", "nome");
  createSelectOption(dbMensagemSelect, DOM.inputs.msgSelected, "value", "text");
} catch (error) {
  console.error("Erro ao criar o select:", error);
}

// --- GETTING ELEMENTS

// *-*-*- version 001
DOM.buttons.msgGenerator.addEventListener("click", () => {
  const editName = (rawName) => {
    return rawName.trim().replace(/\s+/g, " ");
  };
  const editClientName = (rawName) => {
    if (!rawName) return;
    const dbPronomeTratamento = ["sr", "sra", "dr", "dra", "sgto", "sgta"];

    const namePart = editName(rawName).split(" ");
    const tratamento = dbPronomeTratamento.includes(namePart[0].toLowerCase().replace(".", "")) ? namePart.shift() : ""; // remove pronome e salva
    const preposicao = dbPreposicao.includes(namePart.at(-2)) ? namePart.at(-2) : "";
    const clientName = `${tratamento} ${namePart[0]} ${preposicao} ${namePart.at(-1)}`;

    return {
      firstName: namePart[0],
      name: editName(clientName),
    };
  };
  const getManagerData = (dataSource, selectValue) => {
    if (!dataSource || !selectValue) return;

    return dataSource.find((ctrNum) => ctrNum.carteira === selectValue);
  };
  const editFinalMessage = (cName, wGroup, aName, gMsg, pMsg) => {
    const editC = editClientName(cName);
    const c = editC.name;
    const fc = editC.firstName;
    const g = wGroup.nome;
    const a = editName(aName);

    const rawMsgFinal = gMsg + pMsg;
    const finalMessage = rawMsgFinal
      .replaceAll("{nomeCliente}", c)
      .replaceAll("{primeiroNomeCliente}", fc)
      .replaceAll("{nomeAssistente}", a)
      .replaceAll("{of}", dbControlPronome[wGroup.sexo][0])
      .replaceAll("{your}", dbControlPronome[wGroup.sexo][1])
      .replaceAll("{nomeGerente}", g);

    return finalMessage;
  };

  const inputCName = DOM.inputs.clientName.value;
  const inputCarteira = getManagerData(dbCarteira, DOM.inputs.managerName.value);
  const inputAName = DOM.inputs.assistentName.value;
  const isGreetingChecked = DOM.inputs.greetingMsg.checked;
  const inputRP = DOM.inputs.respPerson.value;
  const tmplMsg = isGreetingChecked ? `${dbMensagens.introducao.geral}\n\n${dbMensagens.introducao[inputRP]}\n\n` : "";
  const mp = dbMensagens.produto[DOM.inputs.msgSelected.value];

  DOM.outputs.msgArea.value = editFinalMessage(inputCName, inputCarteira, inputAName, tmplMsg, mp);
});

// QR CODE Button
DOM.buttons.qrCodeGenerator.addEventListener("click", () => {
  // generateMessage(DOM.inputs);
  const nameRaw = DOM.inputs.clientName.value;
  const name = nameRaw.trim().replace(/\s+/g, " ").split(/\s+/);

  if (checkFormalTitles(name)) {
    console.log(name[0]);
  }
});

function checkFormalTitles(inputName) {
  if (!inputName) return;

  const formalTitles = ["sr", "sra", "dr", "dra", "sgto", "sgta"];
  return formalTitles.includes(inputName[0].toLowerCase()) || formalTitles.includes(inputName[0].toLowerCase().replace(/\./g, "")) ? true : false;
}

// function

// function generateMessage(inputElements) {
//   if (!inputElements) return;

//   const customerFullName = inputElements.clientName.value;
//   const customerNumberRaw = inputElements.wppNumber.value;
//   const managerName = inputElements.managerName.value;
//   const assistentName = inputElements.assistentName.value;
//   const tmplMsgSelected = inputElements.msgSelected.value;
//   const greetingChecked = inputElements.greetingMsg.checked;
//   const respPersonSelected = inputElements.respPerson.value;

//   // Add intro message
//   let msgTmplRaw = greetingChecked ? msg.greeting + "\n\n" + msg[respPersonSelected + "Intro"] + "\n\n" : "";

//   // Message selected template
//   msgTmplRaw += msg[tmplMsgSelected] == undefined ? "" : msg[tmplMsgSelected];

//   const fName = editName(customerFullName);

//   DOM.outputs.msgArea.value = msgTmplRaw + "\n\n" + fName;
// }

// function firstName(name) {
//   if (!name) return;
// }

// function editName(fullNameInput) {
//   if (!fullNameInput) return;

//   const formalTitles = ["sr", "sra", "dr", "dra", "sgto", "sgta"];
//   let fName = fullNameInput.trim().replace(/\s+/g, " ").split(/\s+/);

//   if (formalTitles.includes(fName[0].toLowerCase()) || formalTitles.includes(fName[0].toLowerCase().replace(/\./g, ""))) {
//     let usedFormalTitles = fName[0];
//     fName.shift();
//   }

//   let firstName = fName[0];
//   // let compostName =

//   // if (fName[0].toLowerCase().includes(formalTitles)) {
//   //   return fName[0];
//   // }

//   // return fName;
// }

// function setupGreeting(inputElement) {
//   if (!inputElement) return;
//   return inputElement.checked;
// }

// function getFunciResp(inptuElement) {
//   if (!inptuElement) return;
//   return inptuElement.value;
// }

// function getCustomerName(inputElement) {
//   if (!inputElement) return;
//   return inputElement.value;
// }

// function getCustomerNumber(inputElement) {
//   if (!inputElement) return;
//   const numRaw = inputElement.value;
//   const num = numRaw.replace(/\D/g, "");
//   return num;
// }

// DOM.buttons.msgGenerator.addEventListener("click", () => {
//   const cNameRaw = getCustomerName(DOM.inputs.clientName);
//   const fResp = getFunciResp(DOM.inputs.respPerson);

//   console.log(fResp);

//   let introMsgRaw = setupGreeting(DOM.inputs.greetingMsg) ? msg.greeting + "\n\n" : "";
//   let introRespRaw = fResp == "assistent" ? msg.assistentIntro + "\n\n" : msg.managerIntro + "\n\n";
//   let tmplMsg = setupGreeting(DOM.inputs.greetingMsg) ? msg.greeting : "";

//   let msgTmpl = "";
//   msgTmpl += introMsgRaw + introRespRaw + tmplMsg;

//   DOM.outputs.msgArea.value = msgTmpl;
//   // let msgTmpl = setupGreeting(DOM.inputs.greetingMsg) ? msg.greeting : "";
//   // msgTmpl += getCustomerName(DOM.inputs.clientName);
// });
// // --- FEATS - BUTTONS

// // * EDIT MESSAGE
// const setupTextAreaToggle = (triggerElement, targetElement) => {
//   if (!triggerElement || !targetElement) return;

//   const handleToggleEdit = () => {
//     const { readOnly } = targetElement; // same as: const isReadOnly = targetElement.readOnly;
//     targetElement.readOnly = !readOnly;

//     triggerElement.classList.toggle("enabled-bg", !targetElement.readOnly);
//     triggerElement.classList.toggle("disabled-bg", targetElement.readOnly);
//     triggerElement.setAttribute("aria-pressed", !targetElement.readOnly);

//     if (!targetElement.readOnly) {
//       activateTargetElement(targetElement);
//     }
//   };

//   const activateTargetElement = (e) => {
//     e.focus();
//     const length = e.value.length;
//     e.setSelectionRange(length, length);
//   };

//   triggerElement.addEventListener("click", () => handleToggleEdit());
// };
// setupTextAreaToggle(DOM.buttons.editMsg, DOM.outputs.msgArea);

// * GENERATOR MESSAGE
// const showTextMessage = (triggerElement, inputArrayData, targetElement) => {
//   if (!triggerElement || !inputArrayData?.respPerson) return;

//   const msg = targetElement;

//   const getRespPerson = (radioSelect) => {
//     // alert(radioSelect.respPerson.value);
//     msg.value = radioSelect.respPerson.value;
//   };

//   // DOM.outputs.msgArea.value = getRespPerson();

//   triggerElement.addEventListener("click", () => getRespPerson(inputArrayData));
// };
// showTextMessage(DOM.buttons.msgGenerator, DOM.inputs, DOM.outputs.msgArea);

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
// DOM.buttons.qrCodeGenerator.addEventListener("click", () => {
//   alert(selectRespPerson());
// });

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
