import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  Clock3,
  Code2,
  ExternalLink,
  GraduationCap,
  Menu,
  MessageCircle,
  MonitorPlay,
  Sparkles,
  Target,
  X,
  Zap,
} from 'lucide-react'
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { quizQuestions, tracks, type Track, type TrackId } from './data'

const ease = [0.22, 1, 0.36, 1] as const
const assetUrl = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const frame = window.requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView()
      })
      return () => window.cancelAnimationFrame(frame)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

function Logo() {
  return (
    <Link className="logo" to="/" aria-label="SCTEC — início">
      <img src={assetUrl('logo-sctec.png')} alt="SCTEC" width="320" height="89" />
    </Link>
  )
}

function Header({ onQuiz }: { onQuiz: () => void }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24)

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  return (
    <>
      <div className={scrolled ? 'government-bar is-scrolled' : 'government-bar'}>
        <a href="https://sc.gov.br/" target="_blank" rel="noreferrer">
          sc.gov.br
        </a>
        <span>
          <img src={assetUrl('bandeira-sc.png')} alt="" width="44" height="28" />
          Secretaria de Estado da Ciência, Tecnologia e Inovação
        </span>
      </div>
      <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
        <Logo />
        <nav
          className={open ? 'main-nav is-open' : 'main-nav'}
          onClick={() => setOpen(false)}
        >
          <Link to="/#programa">O programa</Link>
          <Link to="/#trilhas">Trilhas</Link>
          <Link to="/#como-funciona">Como funciona</Link>
          <Link to="/duvidas">Dúvidas</Link>
        </nav>
        <button className="header-cta" type="button" onClick={onQuiz}>
          Descobrir minha trilha
          <ArrowRight size={16} />
        </button>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
    </>
  )
}

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.85, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

function Hero({ onQuiz }: { onQuiz: () => void }) {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '6%'])
  const videoScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.965])
  const contentY = useTransform(scrollYProgress, [0, 0.85], ['0%', '-18%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55, 0.88], [1, 1, 0])

  return (
    <section className="hero" ref={heroRef}>
      <motion.div className="hero-media" style={{ y: videoY, scale: videoScale }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={assetUrl('hero-poster.jpg')}
          aria-label="Pessoas percebem uma luz verde em meio à cidade"
        >
          <source src={assetUrl('sctec-hero.optimized.mp4')} type="video/mp4" />
        </video>
        <div className="hero-focus-blur" aria-hidden="true" />
        <div className="hero-overlay" />
        <div className="hero-grid" />
      </motion.div>

      <motion.div
        className="hero-content"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Santa Catarina, prepare-se
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 28, filter: 'blur(14px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.35, ease }}
        >
          O futuro está
          <br />
          chamando. <em>Qual caminho</em>
          <br />
          você vai <br className="mobile-only" />
          escolher?
        </motion.h1>
        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.55, ease }}
        >
          Formações gratuitas em tecnologia e Inteligência Artificial para
          transformar curiosidade em novas possibilidades.
        </motion.p>
        <motion.div
          className="hero-choice-deck"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
        >
          <button className="hero-choice hero-choice-primary" type="button" onClick={onQuiz}>
            <span className="hero-choice-kicker">Comece por aqui</span>
            <strong>Descobrir minha trilha</strong>
            <span className="hero-choice-icon">
              <ArrowRight />
            </span>
          </button>
          <Link className="hero-choice hero-choice-featured" to="/trilhas/carreira-tech">
            <span className="hero-choice-kicker">Em destaque</span>
            <strong>Carreira Tech 2026</strong>
            <span className="hero-choice-meta">Conheça a jornada de formação</span>
            <span className="hero-choice-icon">
              <ArrowRight />
            </span>
          </Link>
          <Link className="hero-opportunity" to="/trilhas/ia-pratica">
            <span className="hero-opportunity-top">
              Oportunidade aberta
            </span>
            <strong>IA na Prática</strong>
            <span>
              Matrículas abertas <ArrowRight />
            </span>
          </Link>
        </motion.div>
      </motion.div>

      <div className="hero-proof" aria-label="Diferenciais do programa">
        <span>
          <Check size={14} /> Gratuito
        </span>
        <span>
          <MonitorPlay size={14} /> 100% online
        </span>
        <span>
          <Award size={14} /> Certificado SENAI
        </span>
        <span>
          <Target size={14} /> Para moradores de SC
        </span>
      </div>

      <a className="scroll-indicator" href="#programa">
        <span>Explore</span>
        <ArrowDown size={16} />
      </a>
    </section>
  )
}

function ProgramSection() {
  return (
    <section className="section program-section" id="programa">
      <div className="section-index">01 / O PROGRAMA</div>
      <div className="program-layout">
        <Reveal className="program-title">
          <h2>
            Tecnologia muda caminhos.
            <br />
            <span>O SCTEC abre o próximo.</span>
          </h2>
        </Reveal>
        <Reveal className="program-copy" delay={0.12}>
          <p>
            Uma iniciativa do Governo de Santa Catarina, executada em parceria
            com o SENAI/SC, para preparar pessoas de diferentes perfis para a
            transformação tecnológica.
          </p>
          <p>
            Você não precisa entender todas as opções agora. Nós ajudamos a
            encontrar a formação que combina com o seu momento.
          </p>
        </Reveal>
      </div>
      <div className="stats-grid">
        {[
          ['3', 'jornadas para diferentes momentos'],
          ['100%', 'formações gratuitas e online'],
          ['14+', 'anos para começar a participar'],
          ['SC', 'oportunidades para todo o estado'],
        ].map(([value, label], index) => (
          <Reveal className="stat" delay={index * 0.07} key={value}>
            <strong>{value}</strong>
            <span>{label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function TrackCard({ track, index }: { track: Track; index: number }) {
  return (
    <motion.article
      className="track-card"
      style={{ '--track-color': track.color } as React.CSSProperties}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease }}
      whileHover={{ y: -8 }}
    >
      <div className="track-card-top">
        <span className="track-number">0{index + 1}</span>
        <span className="track-status">
          <span />
          {track.status}
        </span>
      </div>
      <p className="track-eyebrow">{track.eyebrow}</p>
      <h3>{track.name}</h3>
      <p className="track-short">{track.short}</p>
      <div className="track-meta">
        <span>
          <Clock3 size={16} />
          {track.duration}
        </span>
        <span>
          <MonitorPlay size={16} />
          {track.format}
        </span>
      </div>
      <Link className="track-link" to={`/trilhas/${track.id}`}>
        Conhecer esta trilha
        <ArrowRight />
      </Link>
      <div className="track-glow" />
    </motion.article>
  )
}

function TracksSection({ onQuiz }: { onQuiz: () => void }) {
  return (
    <section className="section tracks-section" id="trilhas">
      <div className="section-heading">
        <div>
          <div className="section-index">02 / ESCOLHA SEU CAMINHO</div>
          <Reveal>
            <h2>
              Uma transformação.
              <br />
              <span>Três pontos de partida.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal className="section-heading-side" delay={0.12}>
          <p>
            Compare as opções ou responda a duas perguntas para receber uma
            recomendação.
          </p>
          <button className="text-link" type="button" onClick={onQuiz}>
            Descobrir minha trilha <ArrowRight />
          </button>
        </Reveal>
      </div>
      <div className="track-grid">
        {tracks.map((track, index) => (
          <TrackCard key={track.id} track={track} index={index} />
        ))}
      </div>
    </section>
  )
}

function HowItWorks() {
  const items = [
    {
      icon: <Sparkles />,
      title: 'Descubra seu perfil',
      text: 'Conte o que você busca e qual é sua experiência hoje.',
    },
    {
      icon: <Target />,
      title: 'Escolha sua trilha',
      text: 'Veja a recomendação, os requisitos e a jornada completa.',
    },
    {
      icon: <GraduationCap />,
      title: 'Comece a aprender',
      text: 'Inscreva-se na oferta disponível ou acompanhe a próxima turma.',
    },
  ]

  return (
    <section className="section journey-section" id="como-funciona">
      <div className="section-index">03 / COMO FUNCIONA</div>
      <Reveal>
        <h2>
          Seu próximo passo
          <br />
          <span>não precisa ser complicado.</span>
        </h2>
      </Reveal>
      <div className="journey-list">
        {items.map((item, index) => (
          <Reveal className="journey-item" delay={index * 0.1} key={item.title}>
            <span className="journey-number">0{index + 1}</span>
            <span className="journey-icon">{item.icon}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

type AudiencePerson = {
  image: string
  label: string
  profile: string
  className: string
  convergeX: number
  convergeY: number
}

function AudiencePortrait({
  person,
  progress,
  index,
}: {
  person: AudiencePerson
  progress: MotionValue<number>
  index: number
}) {
  const x = useTransform(progress, [0.05, 0.78], [0, person.convergeX])
  const y = useTransform(progress, [0.05, 0.78], [0, person.convergeY])

  return (
    <motion.figure
      className={`audience-card ${person.className}`}
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.76, filter: 'blur(14px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, delay: index * 0.08, ease }}
    >
      <img
        src={person.image}
        alt={`${person.label}: ${person.profile}`}
        loading="lazy"
        draggable="false"
        width="480"
        height="640"
      />
    </motion.figure>
  )
}

function FinalCta({ onQuiz }: { onQuiz: () => void }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const people: AudiencePerson[] = [
    {
      image: assetUrl('publico-estudante.webp'),
      label: 'Começar do zero',
      profile: 'Estudantes',
      className: 'audience-one',
      convergeX: 90,
      convergeY: 45,
    },
    {
      image: assetUrl('publico-transicao.webp'),
      label: 'Mudar de carreira',
      profile: 'Transição profissional',
      className: 'audience-two',
      convergeX: -90,
      convergeY: 45,
    },
    {
      image: assetUrl('publico-empreendedor.webp'),
      label: 'Fazer o negócio crescer',
      profile: 'Empreendedores',
      className: 'audience-three',
      convergeX: 95,
      convergeY: -45,
    },
    {
      image: assetUrl('publico-dev.webp'),
      label: 'Evoluir com IA',
      profile: 'Desenvolvedores',
      className: 'audience-four',
      convergeX: -95,
      convergeY: -45,
    },
    {
      image: assetUrl('publico-recolocacao.webp'),
      label: 'Recomeçar',
      profile: 'Recolocação profissional',
      className: 'audience-five',
      convergeX: 115,
      convergeY: 0,
    },
    {
      image: assetUrl('publico-profissional.webp'),
      label: 'Trabalhar melhor',
      profile: 'Profissionais de todas as áreas',
      className: 'audience-six',
      convergeX: -115,
      convergeY: 0,
    },
  ]

  return (
    <section className="final-cta" id="comece-agora" ref={sectionRef}>
      <div className="final-cta-grid" />
      {people.map((person, index) => (
        <AudiencePortrait
          key={person.label}
          person={person}
          progress={scrollYProgress}
          index={index}
        />
      ))}
      <Reveal className="final-cta-content">
        <h2>
          Seu futuro pode
          <br />
          começar <em>agora.</em>
        </h2>
        <p>
          A transformação já faz parte da vida de pessoas como você. Encontre
          seu lugar e escolha por onde começar.
        </p>
        <button className="button button-primary" type="button" onClick={onQuiz}>
          Descobrir minha trilha
          <ArrowRight />
        </button>
      </Reveal>
    </section>
  )
}

function Home({ onQuiz }: { onQuiz: () => void }) {
  return (
    <main>
      <Hero onQuiz={onQuiz} />
      <ProgramSection />
      <TracksSection onQuiz={onQuiz} />
      <HowItWorks />
      <FinalCta onQuiz={onQuiz} />
    </main>
  )
}

function TrackPage() {
  const { trackId } = useParams()
  const track = tracks.find((item) => item.id === trackId)

  if (!track) return <Navigate to="/" replace />

  return (
    <main className="track-page" style={{ '--track-color': track.color } as React.CSSProperties}>
      <section className="track-hero">
        <div className="track-hero-grid" />
        <motion.div
          className="track-hero-content"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
        >
          <Link className="back-link" to="/#trilhas">
            <ArrowLeft /> Todas as trilhas
          </Link>
          <p className="eyebrow">{track.eyebrow}</p>
          <h1>{track.name}</h1>
          <p className="track-hero-lead">{track.short}</p>
          <div className="track-hero-actions">
            <a className="button button-primary" href="#participar">
              {track.id === 'ia-pratica' ? 'Quero me matricular' : 'Quero participar'}
              <ArrowRight />
            </a>
            <a className="button button-ghost" href="#conteudo">
              Ver o que vou aprender
            </a>
          </div>
        </motion.div>
        <div className="track-hero-facts">
          {[
            ['Para quem é', track.audience],
            ['Duração', track.duration],
            ['Formato', track.format],
            ['Entrada', track.access],
          ].map(([label, value], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 + index * 0.08 }}
            >
              <span>{label}</span>
              <strong>{value}</strong>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section track-audience">
        <div className="section-index">01 / ESTA TRILHA É PARA VOCÊ?</div>
        <div className="two-column">
          <Reveal>
            <h2>
              Você não precisa
              <br />
              <span>adivinhar se combina.</span>
            </h2>
          </Reveal>
          <Reveal className="audience-panel" delay={0.12}>
            <p className="mini-label">PERFIL RECOMENDADO</p>
            <h3>{track.audience}</h3>
            <p>
              Esta trilha foi desenhada para o seu momento e deixa claro o que
              acontece antes, durante e depois da formação.
            </p>
            <div className="free-seal">
              <Check />
              <span>
                <strong>É gratuito.</strong>
                Toda a formação é custeada pelo Governo de Santa Catarina.
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section content-section" id="conteudo">
        <div className="section-index">02 / O QUE VOCÊ VAI APRENDER</div>
        <Reveal>
          <h2>
            Conhecimento para
            <br />
            <span>usar no mundo real.</span>
          </h2>
        </Reveal>
        <div className="module-list">
          {track.modules.map((module, index) => (
            <Reveal className="module-row" delay={index * 0.06} key={module}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{module}</h3>
              {index % 2 === 0 ? <Sparkles /> : <Code2 />}
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section steps-section">
        <div className="section-index">03 / SUA JORNADA</div>
        <div className="section-heading">
          <Reveal>
            <h2>
              Entenda cada passo
              <br />
              <span>antes de começar.</span>
            </h2>
          </Reveal>
          <Reveal className="section-heading-side" delay={0.12}>
            <p>
              Eventos, cursos e processos aparecem no momento certo e sempre
              ligados a uma etapa da sua trilha.
            </p>
          </Reveal>
        </div>
        <div className="steps-grid">
          {track.steps.map((step, index) => (
            <Reveal className="step-card" delay={index * 0.08} key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="track-participate" id="participar">
        <Reveal>
          <p className="eyebrow">{track.status}</p>
          <h2>Pronto para dar o próximo passo?</h2>
          <p>
            Consulte a situação atual desta trilha e receba as orientações para
            participar.
          </p>
          <a
            className="button button-primary"
            href="https://sctec.scti.sc.gov.br/"
            target="_blank"
            rel="noreferrer"
          >
            Acessar inscrição oficial
            <ExternalLink />
          </a>
        </Reveal>
      </section>
    </main>
  )
}

function FaqPage() {
  const faqs = [
    [
      'O SCTEC é gratuito?',
      'Sim. As jornadas são custeadas pelo Governo de Santa Catarina e não há cobrança para participar.',
    ],
    [
      'Quem pode participar?',
      'Pessoas a partir de 14 anos que residam em Santa Catarina. Algumas trilhas possuem requisitos específicos.',
    ],
    [
      'As aulas são presenciais ou online?',
      'As formações são online. Algumas são ao vivo e outras podem ser realizadas no seu ritmo.',
    ],
    [
      'Todas as trilhas funcionam da mesma forma?',
      'Não. IA na Prática tem matrícula direta, IA para DEVs possui processo seletivo e Carreira Tech tem uma jornada por etapas.',
    ],
    [
      'Os eventos são uma formação separada?',
      'Nem sempre. No Carreira Tech, por exemplo, palestras e experiências rápidas fazem parte da etapa inicial da jornada.',
    ],
    [
      'Recebo certificado?',
      'Sim. O SENAI emite certificado após a conclusão dos requisitos de cada formação.',
    ],
  ]
  const [open, setOpen] = useState(0)

  return (
    <main className="faq-page">
      <section className="page-intro">
        <p className="eyebrow">Sem tecnologia complicada</p>
        <h1>
          Perguntas simples.
          <br />
          <em>Respostas diretas.</em>
        </h1>
        <p>
          Tudo o que você precisa saber para escolher e começar com segurança.
        </p>
      </section>
      <section className="faq-list">
        {faqs.map(([question, answer], index) => (
          <div className={open === index ? 'faq-item is-open' : 'faq-item'} key={question}>
            <button type="button" onClick={() => setOpen(open === index ? -1 : index)}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{question}</strong>
              <ChevronDown />
            </button>
            <AnimatePresence initial={false}>
              {open === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease }}
                >
                  <p>{answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </section>
      <section className="contact-strip">
        <div>
          <MessageCircle />
          <span>
            <strong>Ainda tem dúvidas?</strong>
            Fale com a equipe do programa.
          </span>
        </div>
        <a
          className="button button-ghost"
          href="https://wa.me/5548988706277"
          target="_blank"
          rel="noreferrer"
        >
          Conversar no WhatsApp <ArrowRight />
        </a>
      </section>
    </main>
  )
}

function Quiz({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [question, setQuestion] = useState(0)
  const [scores, setScores] = useState<Record<TrackId, number>>({
    'ia-pratica': 0,
    'carreira-tech': 0,
    'ia-devs': 0,
  })
  const [result, setResult] = useState<TrackId | null>(null)
  const navigate = useNavigate()

  const resultTrack = useMemo(
    () => tracks.find((track) => track.id === result),
    [result],
  )

  useEffect(() => {
    if (!open) {
      const timer = window.setTimeout(() => {
        setQuestion(0)
        setResult(null)
        setScores({ 'ia-pratica': 0, 'carreira-tech': 0, 'ia-devs': 0 })
      }, 400)
      return () => window.clearTimeout(timer)
    }
  }, [open])

  function answer(track: TrackId) {
    const nextScores = { ...scores, [track]: scores[track] + 1 }
    setScores(nextScores)
    if (question < quizQuestions.length - 1) {
      setQuestion((value) => value + 1)
      return
    }
    const winner = (Object.entries(nextScores) as [TrackId, number][]).sort(
      (a, b) => b[1] - a[1],
    )[0][0]
    setResult(winner)
  }

  function viewResult() {
    if (!result) return
    onClose()
    navigate(`/trilhas/${result}`)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="quiz-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Descubra sua trilha"
        >
          <motion.div
            className="quiz-panel"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 15 }}
            transition={{ duration: 0.45, ease }}
          >
            <div className="quiz-header">
              <Logo />
              <button type="button" onClick={onClose} aria-label="Fechar">
                <X />
              </button>
            </div>
            <div className="quiz-progress">
              <span
                style={{
                  width: result
                    ? '100%'
                    : `${((question + 1) / quizQuestions.length) * 100}%`,
                }}
              />
            </div>
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  className="quiz-content"
                  key={question}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35, ease }}
                >
                  <p>
                    Pergunta {question + 1} de {quizQuestions.length}
                  </p>
                  <h2>{quizQuestions[question].title}</h2>
                  <div className="quiz-options">
                    {quizQuestions[question].answers.map((item) => (
                      <button
                        type="button"
                        key={item.label}
                        onClick={() => answer(item.track)}
                      >
                        <span>{item.label}</span>
                        <ArrowRight />
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="quiz-content quiz-result"
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <span className="result-icon">
                    <Zap />
                  </span>
                  <p>Sua recomendação</p>
                  <h2>{resultTrack?.name}</h2>
                  <p className="result-copy">{resultTrack?.short}</p>
                  <button
                    className="button button-primary"
                    type="button"
                    onClick={viewResult}
                  >
                    Ver minha jornada <ArrowRight />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div>
          <Logo />
          <p>
            Tecnologia e Inteligência Artificial
            <br />
            para transformar Santa Catarina.
          </p>
        </div>
        <div>
          <span className="footer-label">Navegue</span>
          <Link to="/#programa">O programa</Link>
          <Link to="/#trilhas">Trilhas</Link>
          <Link to="/duvidas">Dúvidas</Link>
        </div>
        <div>
          <span className="footer-label">Fale conosco</span>
          <a href="mailto:sctec@scti.sc.gov.br">sctec@scti.sc.gov.br</a>
          <a href="tel:4833808300">(48) 3380–8300</a>
          <a href="https://wa.me/5548988706277">WhatsApp</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Governo de Santa Catarina · SCTI · SENAI/SC</span>
        <span>Portal oficial do Programa SCTEC</span>
      </div>
    </footer>
  )
}

export default function App() {
  const [quizOpen, setQuizOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      <ScrollToTop />
      <Header onQuiz={() => setQuizOpen(true)} />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home onQuiz={() => setQuizOpen(true)} />} />
            <Route path="/trilhas/:trackId" element={<TrackPage />} />
            <Route path="/duvidas" element={<FaqPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </motion.div>
      </AnimatePresence>
      <Quiz open={quizOpen} onClose={() => setQuizOpen(false)} />
    </>
  )
}
