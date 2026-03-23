/* eslint-disable react/prop-types */
export function RecommendationList({ items }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className="flex items-start gap-2 text-[12px] font-medium text-texto bg-blanco/50 p-1.5 rounded-md"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-violeta mt-1 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  )
}
