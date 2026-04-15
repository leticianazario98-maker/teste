const QUIZ_CONFIG = {
  title: "Descubra sua seleção ideal",
  description: "Responda algumas perguntas e receba uma curadoria especial.",
  submitUrl: "COLE_AQUI_A_URL_DO_SEU_APPS_SCRIPT",
  redirectMap: {
    elegante: "/resultado-elegante.html",
    casual: "/resultado-casual.html",
    moderno: "/resultado-moderno.html"
  },
  steps: [
    {
      id: "contato",
      title: "Antes de começar",
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
      title: "Conte um pouco sobre você",
      fields: [
        {
          name: "estilo",
          label: "Qual estilo combina mais com você?",
          type: "radio",
          required: true,
          options: [
            { label: "Casual", value: "casual" },
            { label: "Elegante", value: "elegante" },
            { label: "Moderno", value: "moderno" }
          ]
        }
      ]
    },
    {
      id: "momento",
      title: "Para qual ocasião você busca algo?",
      fields: [
        {
          name: "ocasiao",
          label: "Ocasião principal",
          type: "select",
          required: true,
          options: [
            { label: "Selecione", value: "" },
            { label: "Trabalho", value: "trabalho" },
            { label: "Dia a dia", value: "dia-a-dia" },
            { label: "Evento", value: "evento" }
          ]
        },
        {
          name: "faixa_preco",
          label: "Faixa de preço",
          type: "select",
          required: true,
          options: [
            { label: "Selecione", value: "" },
            { label: "Até R$199", value: "ate-199" },
            { label: "R$200 a R$399", value: "200-399" },
            { label: "Acima de R$400", value: "400+" }
          ]
        }
      ]
    }
  ]
};