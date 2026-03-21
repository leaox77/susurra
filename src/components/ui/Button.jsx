import { motion } from 'framer-motion'

const variants = {
  primary:  'bg-violeta text-blanco hover:bg-purpura active:scale-95',
  outline:  'border-2 border-purpura text-purpura hover:bg-lav-l active:scale-95',
  ghost:    'text-purpura hover:bg-lav-l active:scale-95',
  danger:   'bg-rosa-l border border-rosa text-[#72243E] hover:opacity-90 active:scale-95',
  success:  'bg-[#D4F0E8] border border-menta text-[#085041] hover:opacity-90 active:scale-95',
}

export default function Button({
  children, variant = 'primary', className = '',
  fullWidth = false, loading = false, ...props
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      className={`
        inline-flex items-center justify-center gap-2 font-sans font-semibold
        rounded-full px-6 py-3 text-sm transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}
      `}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : children}
    </motion.button>
  )
}
