const colors = {
  purple:  'bg-lav-l text-violeta border border-lavanda',
  blue:    'bg-azul-l text-[#0C447C] border border-azul',
  pink:    'bg-rosa-l text-[#72243E] border border-rosa',
  mint:    'bg-[#D4F0E8] text-[#085041] border border-menta',
  dark:    'bg-noche text-blanco',
}

export default function Badge({ children, color = 'purple', className = '' }) {
  return (
    <span className={`
      inline-block text-xs font-semibold font-sans px-3 py-1 rounded-full
      ${colors[color]} ${className}
    `}>
      {children}
    </span>
  )
}
