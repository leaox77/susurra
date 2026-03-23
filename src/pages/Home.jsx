/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

const modules = [
  {
    id: 'ayuda',
    title: 'Pedir ayuda',
    desc: 'Cuéntanos lo que está pasando. Te escuchamos sin juzgar.',
    path: '/chat',
    bg: 'bg-violeta',
    titleColor: 'text-blanco',
    descColor: 'text-lavanda',
    iconBg: 'bg-white/15',
    icon: ChatIcon,
  },
  {
    id: 'aprender',
    title: 'Aprender',
    desc: 'Tus derechos, salud sexual y cómo protegerte.',
    path: '/aprender',
    bg: 'bg-azul-l',
    titleColor: 'text-[#0C447C]',
    descColor: 'text-[#185FA5]',
    iconBg: 'bg-azul/20',
    icon: BookIcon,
  },
  {
    id: 'contactar',
    title: 'Contactar a alguien',
    desc: 'Líneas de ayuda y servicios reales cerca de ti.',
    path: '/contactar',
    bg: 'bg-rosa-l',
    titleColor: 'text-[#72243E]',
    descColor: 'text-[#993556]',
    iconBg: 'bg-rosa/25',
    icon: PhoneIcon,
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

function Home() {
  const navigate = useNavigate()

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-10 pt-5 pb-6 md:pt-10 md:pb-10">

      {/* Hero desktop */}
      <div className="grid md:grid-cols-[1.1fr,0.9fr] gap-6 md:gap-10 items-center mb-8 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <Badge color="purple" className="text-[10px] md:text-[11px] px-3 py-1">Su está disponible</Badge>
            <span className="text-[11px] md:text-xs text-purpura/70">Anonimato activo</span>
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-2xl md:text-4xl text-noche leading-tight text-balance">
              Hola, <span className="text-purpura">estamos aquí</span> para escucharte.
            </h1>
            <p className="text-sm md:text-base text-purpura/80 max-w-xl">
              Su te acompaña con apoyo inmediato, aprendizaje seguro y contactos confiables. Sin registros, sin juicio.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={() => navigate('/chat')} className="shadow-sm hover:shadow-md">Hablar con Su</Button>
            <Button variant="outline" onClick={() => navigate('/aprender')} className="text-purpura border-purpura/50">
              Explorar recursos
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3 pt-1 text-xs md:text-sm text-purpura/70">
            <div className="flex items-center gap-2 bg-white/70 rounded-full px-3 py-2 border border-lavanda/40">
              <ShieldIcon className="w-4 h-4 text-purpura" />
              100% anónimo
            </div>
            <div className="flex items-center gap-2 bg-white/70 rounded-full px-3 py-2 border border-lavanda/40">
              <SparkleIcon className="w-4 h-4 text-purpura" />
              Respuestas empáticas y claras
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative bg-white/80 border border-lavanda/30 rounded-3xl p-4 md:p-5 shadow-sm"
        >
          <div className="hidden md:inline-flex absolute -top-4 -right-4 bg-lavanda text-noche text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            Siempre en línea
          </div>
          <div className="flex items-center gap-4">
            <div className="w-18 h-18 md:w-24 md:h-24 rounded-2xl bg-lav-l flex items-center justify-center overflow-hidden">
              <img src="/terry-lavanda.png" alt="Su" className="w-full h-full object-contain" />
            </div>
            <div className="space-y-2">
              <p className="text-xs md:text-sm text-purpura/70">Tu guía</p>
              <h3 className="font-serif text-lg md:text-xl text-noche leading-tight">Su te escucha sin juicio</h3>
              <p className="text-sm text-purpura/70 leading-relaxed md:max-w-sm">
                Comparte lo que pasa y recibe pasos claros, información confiable y contactos seguros cerca de ti.
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-purpura/80">
            <div className="bg-lav-l/70 border border-lavanda/40 rounded-xl p-3">
              <p className="font-semibold text-purpura">Apoyo inmediato</p>
              <p className="text-xs mt-1 text-purpura/70">Chat anónimo con orientación práctica.</p>
            </div>
            <div className="bg-lav-l/70 border border-lavanda/40 rounded-xl p-3">
              <p className="font-semibold text-purpura">Recursos claros</p>
              <p className="text-xs mt-1 text-purpura/70">Aprende a cuidarte y a pedir ayuda.</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Label sección */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-[11px] md:text-xs font-semibold tracking-[0.18em] text-purpura/60 uppercase mb-4"
      >
        ¿cómo podemos ayudarte?
      </motion.p>

      {/* Módulos — con IDs para el tutorial */}
      <motion.div
        id="tut-modules"
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {modules.map((mod) => (
          <motion.div
            key={mod.id}
            id={`tut-${mod.id}`}
            variants={item}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(mod.path)}
            className={`module-card ${mod.bg} cursor-pointer shadow-[0_10px_30px_-18px_rgba(42,25,100,0.4)]`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full ${mod.iconBg} flex items-center justify-center flex-shrink-0`}>
                <mod.icon className={`w-[18px] h-[18px] ${mod.titleColor}`} />
              </div>
              <h3 className={`font-semibold text-base ${mod.titleColor}`}>{mod.title}</h3>
              <span className={`ml-auto text-xl opacity-40 ${mod.titleColor}`}>›</span>
            </div>
            <p className={`text-sm leading-relaxed ${mod.descColor} pl-12`}>{mod.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Info de privacidad */}
      <motion.div
        id="tut-privacidad"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-7 md:mt-9 bg-white/70 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-start gap-3 border border-lavanda/30"
      >
        <div className="w-11 h-11 rounded-2xl bg-lav-l flex items-center justify-center flex-shrink-0">
          <ShieldIcon className="w-5 h-5 text-purpura" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-violeta">100% anónimo y seguro</p>
          <p className="text-sm text-purpura/70 leading-relaxed max-w-2xl">
            No necesitas registrarte. No guardamos tu nombre, teléfono ni ubicación. Puedes regresar cuando quieras; tu privacidad es primero.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Home

function ChatIcon({ className }) {
  return <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M2 9C2 5.7 5.1 3 9 3s7 2.7 7 6-3.1 6-7 6H2.5L1.5 17"/><circle cx="6.5" cy="9" r=".7" fill="currentColor"/><circle cx="9" cy="9" r=".7" fill="currentColor"/><circle cx="11.5" cy="9" r=".7" fill="currentColor"/></svg>
}
function BookIcon({ className }) {
  return <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M3 3h8a2 2 0 012 2v9a2 2 0 01-2 2H3V3z"/><path d="M11 3h2a2 2 0 012 2v9a2 2 0 01-2 2h-2"/><path d="M6 7h4M6 10h3"/></svg>
}
function PhoneIcon({ className }) {
  return <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 3.5h4l1.5 3.5L7 8.5a7.5 7.5 0 003.5 3.5L12 10l3.5 1.5V15A1.5 1.5 0 0114 16.5 13.5 13.5 0 011.5 4 1.5 1.5 0 013.5 2.5"/></svg>
}
function ShieldIcon({ className }) {
  return <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 2L3 4.5V9c0 3.5 2.5 6.5 6 7.5 3.5-1 6-4 6-7.5V4.5L9 2z"/><path d="M6.5 9l2 2 3-3"/></svg>
}
function SparkleIcon({ className }) {
  return <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3l1.4 3.6L15 8l-3.6 1.4L10 13l-1.4-3.6L5 8l3.6-1.4L10 3z"/><path d="M4 14l.8 2 .8-2L8 13.2 6 12.4 5.6 10.4 4.8 12.4 3 13.2 4 14z"/><path d="M15 4l.7 1.6L17 6l-1.3.4L15 8l-.7-1.6L13 6l1.3-.4L15 4z"/></svg>
}
