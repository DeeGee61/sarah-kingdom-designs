interface SectionHeadingProps {
  caption?: string
  title: string
  subtitle?: string
  centered?: boolean
}

export default function SectionHeading({
  caption,
  title,
  subtitle,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}>
      {caption && <p className="caption mb-3">{caption}</p>}
      <h3>{title}</h3>
      {subtitle && (
        <p className="font-serif italic text-lg text-gray-600 mt-3 max-prose mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}
