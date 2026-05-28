import { motion } from 'framer-motion'

const tools = [
  {
    name: 'Figma',
    badge: 'Design',
    icon: (
      <svg width="16" height="16" viewBox="0 0 200 300" fill="none">
        <path d="M50 300c27.6 0 50-22.4 50-50v-50H50c-27.6 0-50 22.4-50 50s22.4 50 50 50z" fill="#0ACF83" />
        <path d="M0 150c0-27.6 22.4-50 50-50h50v100H50c-27.6 0-50-22.4-50-50z" fill="#A259FF" />
        <path d="M0 50C0 22.4 22.4 0 50 0h50v100H50C22.4 100 0 77.6 0 50z" fill="#F24E1E" />
        <path d="M100 0h50c27.6 0 50 22.4 50 50s-22.4 50-50 50h-50V0z" fill="#FF7262" />
        <path d="M200 150c0 27.6-22.4 50-50 50s-50-22.4-50-50 22.4-50 50-50 50 22.4 50 50z" fill="#1ABCFE" />
      </svg>
    ),
  },
  {
    name: 'Claude',
    badge: 'AI Platform',
    icon: (
      <svg width="16" height="16" viewBox="0 0 100 100" fill="#D97757">
        <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" />
      </svg>
    ),
  },
  {
    name: 'Github',
    badge: 'Dev Platform',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-text-primary">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    name: 'NotebookLM',
    badge: 'AI Platform',
    icon: (
      <svg width="16" height="16" viewBox="0 0 106 78" fill="none">
        <path d="M52.96.1C23.71.1 0 23.61 0 52.62v25.15h9.76v-2.51c0-11.77 9.61-21.31 21.48-21.31s21.48 9.54 21.48 21.31v2.51h9.76v-2.51c0-17.11-13.99-30.98-31.24-30.98-6.72 0-12.94 2.1-18.03 5.69 5.33-10.51 16.31-17.73 28.99-17.73 17.91 0 32.43 14.41 32.43 32.16v13.36h9.76V52.5C105.92 23.61 82.21.1 52.96.1Z" fill="#ffffff" />
      </svg>
    ),
  },
]

const separator = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-text-tertiary">
    <path d="M8 3l1.5 3.5L13 8l-3.5 1.5L8 13l-1.5-3.5L3 8l3.5-1.5L8 3z" fill="currentColor" />
  </svg>
)

function ToolItem({ name, badge, icon }: typeof tools[number]) {
  return (
    <div className="flex items-center gap-4 px-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border">{icon}</span>
      <span className="whitespace-nowrap text-[18px] font-medium tracking-wide text-text-primary">
        {name}
      </span>
      <span className="whitespace-nowrap rounded-full border border-border px-3 py-1 text-[0.6875rem] uppercase tracking-widest text-text-tertiary">
        {badge}
      </span>
    </div>
  )
}

export default function ToolMarquee() {
  const items = [...tools, ...tools, ...tools]

  return (
    <section
      className="relative border-y border-border py-5 overflow-hidden bg-white/[0.02]"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }}
    >
      <motion.div
        className="flex items-center gap-6"
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{
          x: {
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        {items.map((tool, i) => (
          <div key={i} className="flex shrink-0 items-center gap-6">
            <ToolItem {...tool} />
            {separator}
          </div>
        ))}
      </motion.div>
    </section>
  )
}
