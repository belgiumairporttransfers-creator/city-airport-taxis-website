'use client'

import { TrustpilotIcon } from '@/components/icons'
import { SOCIAL_LINKS } from '@/constants/app-default'
import { cn } from '@/lib/utils'

const DEFAULT_TRUSTPILOT_URL = SOCIAL_LINKS.trustpilot

interface TrustpilotProps {
  href?: string
  className?: string
}

export function Trustpilot({
  href = DEFAULT_TRUSTPILOT_URL,
  className,
}: TrustpilotProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-2.5 transition-transform duration-150 active:scale-95',
        className
      )}
      aria-label="Rated Excellent with 5 stars on Trustpilot"
    >
      <span className="text-base font-bold tracking-tight text-[#191919]">
        EXCELLENT
      </span>

      <div className="flex items-center gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex h-5 w-5 items-center justify-center bg-[#00B67A]"
          >
            <TrustpilotIcon className="size-3 text-white" />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1">
        <TrustpilotIcon className="size-5 text-[#00B67A]" />
        <span className="text-lg font-normal tracking-tight text-[#191919]">
          Trustpilot
        </span>
      </div>
    </a>
  )
}
