/* eslint-disable react/prop-types */
import { ConceptFlipCard } from '@/components/aprender/ConceptFlipCard'

export function ConceptGrid({ concepts }) {
  return (
    <div
      className="grid gap-3 md:gap-4 mb-4"
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}
    >
      {concepts.map((concept) => (
        <ConceptFlipCard key={concept.id} concept={concept} />
      ))}
    </div>
  )
}
