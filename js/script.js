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
    assistente: `*{nomeAssistente}* aqui, assistente {of} *{nomeGerente}*, {your} Gerente Estilo BB.`,
    gerente: `*{nomeGerente}* aqui, {your} Gerente Estilo BB.`,
  },
  produto: {
    agendaRelacional: `*{primeiroNomeCliente}*, passando para saber como você está e reforçar que estou à disposição para ajudar em qualquer demanda relacionada ao Banco do Brasil - seja *crédito, investimento, seguro, financiamento, consórcio, cartão ou outra demanada*.\n\nSe precisar de alguma orientação personalizada, pode contar conosco por aqui! 📲`,
    universoOurocard: `Quero aproveitar para te falar de um benefício que muitos clientes Estilo têm gostado bastante: o *Universo Ourocard*.\n\n⭐É a plataforma de recompensas dos cartões BB, onde você ganha prêmios, cupons missões e vantagens exclusivas apenas por usar seu cartão no dia a dia.\n\nPara participar é bem simples:\n👉 Acesse: https://www.universoourocard.com.br/\n📲 Ou no App BB: *Menu > Cartões > Benefícios e promoções > Universo Ourocard*.`,
    rendeFacil: `Outro benefício importante que você pode ativer é o **BB Rende Fácil**, o novo modelo de conta Estilo que faz o seu saldo render todos os dias automaticamente, sem precisar investir por conta própria e sem custos para adesão.\n\n❤️📱 Para ativar:\n📲 Acesse: *App BB > Notificações > Pendência de Confirmação > BB Rende Fácil*.`,
  },
  fechamento: {
    assistente: `Se precisar de alguma orientação personalizada, pode contar conosco por aqui! 📲`,
    gerente: `Se precisar de alguma orientação personalizada, pode contar comigo por aqui! 📲`,
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

// *-*-*- version 002
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
  if (!DOM.outputs.msgArea.value) return alert("Gere a mensagem!");
  if (!DOM.inputs.wppNumber.value) return alert("Preencha o número de telefone!");

  const n = DOM.inputs.wppNumber.value.replace(/\D/g, "");
  const m = encodeURIComponent(DOM.outputs.msgArea.value);
  const qrcodeEle = DOM.outputs.qrCodeArea;
  qrcodeEle.innerHTML = "";
  new QRCode(qrcodeEle, {
    text: `https://wa.me/55${n}?text=${m}`,
    width: parseInt(window.getComputedStyle(qrcodeEle).width, 10),
    height: parseInt(window.getComputedStyle(qrcodeEle).height, 10),
    correctLevel: QRCode.CorrectLevel.L,
  });
});

// Edit Message Button
const setupBtnEdit = (triggerElement, targetElement) => {
  const toggleBtnBg = (btn) => {
    btn.classList.toggle("disabled-bg");
    btn.classList.toggle("enabled-bg");
  };

  const toggleEdition = (msg) => {
    msg.readOnly = !msg.readOnly;
    return !msg.readOnly;
  };

  const setCursorAtEnd = (msg) => {
    msg.focus();

    const textLength = msg.value.length;
    msg.setSelectionRange(textLength, textLength);
  };

  triggerElement.addEventListener("click", () => {
    toggleBtnBg(triggerElement);

    const isEditing = toggleEdition(targetElement);
    if (isEditing) {
      setCursorAtEnd(targetElement);
    }
  });
};

setupBtnEdit(DOM.buttons.editMsg, DOM.outputs.msgArea);
