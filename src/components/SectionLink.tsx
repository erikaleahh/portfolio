import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'
import type { SectionId } from '../data/navigation'

type SectionLinkProps = Omit<ComponentProps<typeof Link>, 'to'> & {
  section: SectionId
}

export function SectionLink({ section, ...props }: SectionLinkProps) {
  return <Link {...props} to={`/#${section}`} />
}
