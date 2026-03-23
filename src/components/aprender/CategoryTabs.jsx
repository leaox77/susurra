/* eslint-disable react/prop-types */
import { motion } from 'framer-motion'

export function CategoryTabs({ categories, activeCategoryId, onSelectCategory }) {
  return (
    <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-4 px-4 custom-scroll">
      {categories.map((cat, index) => (
        <motion.button
          key={cat.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.04 }}
          onClick={() => onSelectCategory(cat.id)}
          className={`shrink-0 text-[13px] font-bold px-4 py-2 rounded-full transition-all border ${
            activeCategoryId === cat.id
              ? 'bg-violeta text-blanco border-violeta shadow-md'
              : 'bg-lav-l text-purpura border-lavanda hover:bg-lavanda/20'
          }`}
        >
          {cat.title}
        </motion.button>
      ))}
    </div>
  )
}
