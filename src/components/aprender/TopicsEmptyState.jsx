/* eslint-disable react/prop-types */
import { CharacterAvatar } from '@/components/aprender/CharacterAvatar'

export function TopicsEmptyState({ title = 'Proximamente', message = 'Aun estamos preparando la informacion para esta categoria.' }) {
  return (
    <div className="bg-blanco rounded-[1.5rem] p-8 text-center border border-lavanda shadow-sm">
      <CharacterAvatar size={80} />
      <h3 className="text-xl font-bold text-violeta mt-4 mb-2">{title}</h3>
      <p className="text-[14px] text-texto opacity-70">{message}</p>
    </div>
  )
}
