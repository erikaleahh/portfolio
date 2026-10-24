import type { SVGProps } from 'react'

// Brand marks are kept separate from the Lucide interface icons.
export function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 .75a11.25 11.25 0 0 0-3.558 21.924c.563.104.77-.244.77-.542 0-.268-.01-1.155-.015-2.096-3.13.68-3.79-1.329-3.79-1.329-.512-1.3-1.25-1.646-1.25-1.646-1.022-.699.077-.685.077-.685 1.13.08 1.725 1.16 1.725 1.16 1.005 1.723 2.638 1.225 3.28.937.103-.728.393-1.225.715-1.507-2.5-.284-5.128-1.25-5.128-5.565 0-1.23.44-2.235 1.16-3.023-.117-.284-.503-1.43.11-2.981 0 0 .945-.303 3.094 1.154A10.79 10.79 0 0 1 12 6.222c.956.004 1.919.129 2.819.379 2.147-1.457 3.09-1.154 3.09-1.154.615 1.55.229 2.697.112 2.981.722.788 1.158 1.793 1.158 3.023 0 4.325-2.632 5.278-5.14 5.557.404.35.764 1.041.764 2.1 0 1.516-.014 2.736-.014 3.108 0 .3.203.651.775.54A11.252 11.252 0 0 0 12 .75Z" />
    </svg>
  )
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 10v7m4-7v7m0-4a3 3 0 0 1 6 0v4" />
      <circle cx="7" cy="7" r=".7" fill="currentColor" stroke="none" />
    </svg>
  )
}
