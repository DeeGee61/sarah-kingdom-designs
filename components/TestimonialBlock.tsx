interface TestimonialBlockProps {
  quote: string
  author: string
}

export default function TestimonialBlock({ quote, author }: TestimonialBlockProps) {
  return (
    <blockquote className="max-w-2xl mx-auto text-center py-12 md:py-16">
      <p className="font-serif italic text-xl md:text-2xl leading-relaxed text-gray-800 mb-6">
        &ldquo;{quote}&rdquo;
      </p>
      <cite className="caption not-italic">&mdash; {author}</cite>
    </blockquote>
  )
}
