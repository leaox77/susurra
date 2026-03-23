/* eslint-disable react/prop-types */
export function CharacterAvatar({ size = 96 }) {
  return (
    <div
      className="relative shrink-0 drop-shadow-xl z-20 mx-auto"
      style={{ width: size, height: size }}
    >
      <img
        src="/terry-lavanda.png"
        alt="Su Lavanda"
        width={size}
        height={size}
        className="w-full h-full object-contain"
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}
