import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/lib/projects'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="group block">
      <div className="img-hover aspect-[4/5] relative mb-4">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h3 className="text-base mb-1 group-hover:opacity-70 transition-opacity">
        {project.title}
      </h3>
      <p className="font-serif italic text-sm text-gray-600">{project.tagline}</p>
    </Link>
  )
}
