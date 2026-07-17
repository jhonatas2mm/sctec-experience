export type TrackId = 'ia-pratica' | 'carreira-tech' | 'ia-devs'

export type Track = {
  id: TrackId
  name: string
  eyebrow: string
  short: string
  audience: string
  duration: string
  format: string
  access: string
  status: string
  color: string
  modules: string[]
  steps: { number: string; title: string; text: string }[]
}

export const tracks: Track[] = [
  {
    id: 'ia-pratica',
    name: 'IA na Prática',
    eyebrow: 'Comece do zero',
    short:
      'Use Inteligência Artificial para ganhar tempo, criar e resolver problemas no trabalho e na vida.',
    audience: 'Iniciantes, estudantes e profissionais de qualquer área',
    duration: 'Até 60 dias por curso',
    format: 'Online, no seu ritmo',
    access: 'Matrícula direta',
    status: 'Matrículas abertas',
    color: '#c6ff2e',
    modules: [
      'Fundamentos de Inteligência Artificial',
      'Prompts eficazes',
      'Ferramentas de IA',
      'Uso ético e responsável',
      'Aulas bônus aplicadas a diferentes áreas',
    ],
    steps: [
      {
        number: '01',
        title: 'Faça sua matrícula',
        text: 'Escolha a oferta disponível e cadastre-se gratuitamente.',
      },
      {
        number: '02',
        title: 'Estude no seu ritmo',
        text: 'Acesse o ambiente do SENAI onde e quando quiser.',
      },
      {
        number: '03',
        title: 'Conquiste seu certificado',
        text: 'Conclua a formação e valide uma nova habilidade.',
      },
    ],
  },
  {
    id: 'carreira-tech',
    name: 'Carreira Tech',
    eyebrow: 'Transforme sua carreira',
    short:
      'Conheça três áreas de tecnologia e avance até uma formação profissional completa.',
    audience: 'Quem quer começar ou mudar de carreira',
    duration: 'Jornada de até 518h',
    format: 'Online, com etapas ao vivo',
    access: 'Jornada classificatória',
    status: 'Lista de interesse',
    color: '#00df5e',
    modules: [
      'Desenvolvimento de Software',
      'Análise de Dados',
      'Inteligência Artificial',
      'Formação profissional',
      'Ações de empregabilidade',
    ],
    steps: [
      {
        number: '01',
        title: 'Despertar',
        text: 'Palestras e experiências rápidas para conhecer as áreas.',
      },
      {
        number: '02',
        title: 'Primeiros passos',
        text: 'Cursos introdutórios para confirmar a sua escolha.',
      },
      {
        number: '03',
        title: 'Profissionalizar',
        text: 'Formação principal de 300 horas na área escolhida.',
      },
      {
        number: '04',
        title: 'Aperfeiçoar',
        text: 'Conteúdos avançados e conexão com o mercado.',
      },
    ],
  },
  {
    id: 'ia-devs',
    name: 'IA para DEVs',
    eyebrow: 'Evolua seu código',
    short:
      'Integre IA ao desenvolvimento de software, dos prompts aos agentes e à automação.',
    audience: 'Desenvolvedores com experiência na área',
    duration: '180 horas',
    format: 'Online, com aulas ao vivo',
    access: 'Processo seletivo',
    status: 'Acompanhe as próximas turmas',
    color: '#1cffb0',
    modules: [
      'Engenharia de contexto e prompts',
      'Geração e refatoração de código',
      'Testes, documentação e qualidade',
      'Agentes de IA e automação',
      'APIs, RAG, MCP e integrações',
    ],
    steps: [
      {
        number: '01',
        title: 'Inscreva-se',
        text: 'Confira requisitos, datas e critérios no edital vigente.',
      },
      {
        number: '02',
        title: 'Participe da seleção',
        text: 'O processo identifica as competências necessárias.',
      },
      {
        number: '03',
        title: 'Construa na prática',
        text: 'Aplique IA em projetos e fluxos reais de desenvolvimento.',
      },
    ],
  },
]

export const quizQuestions = [
  {
    title: 'O que você busca agora?',
    answers: [
      {
        label: 'Usar IA no trabalho e no dia a dia',
        track: 'ia-pratica' as TrackId,
      },
      {
        label: 'Começar uma carreira em tecnologia',
        track: 'carreira-tech' as TrackId,
      },
      {
        label: 'Aplicar IA no desenvolvimento de software',
        track: 'ia-devs' as TrackId,
      },
    ],
  },
  {
    title: 'Como está sua experiência com tecnologia?',
    answers: [
      { label: 'Estou começando agora', track: 'ia-pratica' as TrackId },
      {
        label: 'Quero uma formação profissional completa',
        track: 'carreira-tech' as TrackId,
      },
      {
        label: 'Já trabalho com desenvolvimento',
        track: 'ia-devs' as TrackId,
      },
    ],
  },
]
