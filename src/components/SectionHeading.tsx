interface SectionHeadingProps {
  number: string
  label: string
  title: string
  id: string
}

export function SectionHeading({
  number,
  label,
  title,
  id,
}: SectionHeadingProps) {
  return (
    <div className="section-heading" data-heading>
      <p className="eyebrow">
        <span className="section-number">{number}</span>
        {label}
      </p>
      <h2 id={id} aria-label={title}>
        {title.split(' ').map((word, index, words) => (
          <span key={`${word}-${index}`}>
            <span className="heading-word-wrap" aria-hidden="true">
              <span data-heading-word className={index === words.length - 1 ? 'heading-word heading-word-accent' : 'heading-word'}>{word}</span>
            </span>{index < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </h2>
    </div>
  )
}
