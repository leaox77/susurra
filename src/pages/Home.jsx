import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

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

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">

      {/* Saludo */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="font-serif text-2xl text-noche leading-tight">
          Hola, <span className="text-purpura">estamos aquí.</span>
        </h2>
        <p className="text-sm mt-1 text-purpura/70">¿Qué necesitas hoy?</p>
      </motion.div>

      {/* Label sección */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-[10px] font-semibold tracking-widest text-purpura/60 uppercase mb-3"
      >
        ¿cómo podemos ayudarte?
      </motion.p>

      {/* Módulos — con IDs para el tutorial */}
      <motion.div
        id="tut-modules"
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-3"
      >
        {modules.map((mod) => (
          <motion.div
            key={mod.id}
            id={`tut-${mod.id}`}
            variants={item}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(mod.path)}
            className={`module-card ${mod.bg} cursor-pointer`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-9 h-9 rounded-full ${mod.iconBg} flex items-center justify-center flex-shrink-0`}>
                <mod.icon className={`w-[18px] h-[18px] ${mod.titleColor}`} />
              </div>
              <h3 className={`font-semibold text-sm ${mod.titleColor}`}>{mod.title}</h3>
              <span className={`ml-auto text-lg opacity-40 ${mod.titleColor}`}>›</span>
            </div>
            <p className={`text-xs leading-relaxed ${mod.descColor} pl-12`}>{mod.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Info de privacidad */}
      <motion.div
        id="tut-privacidad"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 bg-white/60 rounded-2xl p-4 flex items-start gap-3"
      >
        <ShieldIcon className="w-5 h-5 text-purpura flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-violeta mb-0.5">100% anónimo</p>
          <p className="text-xs text-purpura/70 leading-relaxed">
            No necesitas registrarte. No guardamos tu nombre, teléfono ni ubicación.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

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