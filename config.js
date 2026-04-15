const QUIZ_CONFIG = {
  title: "THE REAL MOM STYLE",
  description: "Queremos ajudar você a acertar 100% nesse Dia das Mães.",
  submitUrl: "COLE_AQUI_A_URL_DO_SEU_APPS_SCRIPT",
  successMessage: "Recebemos suas respostas com sucesso.",
  redirectUrl: "",
  steps: [
    {
      id: "contato",
      kicker: "1 • Vamos começar",
      title: "Queremos te conhecer melhor",
      fields: [
        {
          name: "nome",
          label: "Seu nome",
          type: "text",
          placeholder: "Digite seu nome",
          required: true
        },
        {
          name: "telefone",
          label: "Seu telefone",
          type: "tel",
          placeholder: "(00) 00000-0000",
          required: true
        }
      ]
    },
    {
      id: "perfil",
      kicker: "2 • Seu estilo",
      title: "Qual estilo mais combina com você?",
      fields: [
        {
          name: "estilo",
          label: "Escolha uma opção",
          type: "radio",
          required: true,
          options: [
            { label: "Clássico", value: "classico" },
            { label: "Moderno", value: "moderno" },
            { label: "Casual chic", value: "casual_chic" },
            { label: "Elegante", value: "elegante" }
          ]
        }
      ]
    },
    {
      id: "ocasiao",
      kicker: "3 • Momento",
      title: "Para qual ocasião você procura algo?",
      fields: [
        {
          name: "ocasiao",
          label: "Selecione",
          type: "select",
          required: true,
          options: [
            { label: "Selecione", value: "" },
            { label: "Presente", value: "presente" },
            { label: "Uso no trabalho", value: "trabalho" },
            { label: "Evento especial", value: "evento" },
            { label: "Dia a dia", value: "dia_a_dia" }
          ]
        },
        {
          name: "faixa_preco",
          label: "Faixa de preço",
          type: "select",
          required: true,
          options: [
            { label: "Selecione", value: "" },
            { label: "Até R$199", value: "ate_199" },
            { label: "R$200 a R$399", value: "200_399" },
            { label: "R$400 a R$699", value: "400_699" },
            { label: "Acima de R$700", value: "700_mais" }
          ]
        }
      ]
    },
    {
      id: "foto",
      kicker: "4 • Referência",
      title: "Envie uma foto de referência",
      fields: [
        {
          name: "foto",
          label: "Suba uma imagem",
          type: "file",
          accept: "image/*",
          required: false
        }
      ]
    }
  ]
};
