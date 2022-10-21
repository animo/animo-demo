import { KBarPortal, KBarPositioner, KBarAnimator, KBarSearch } from 'kbar'

import { RenderResults } from './RenderResults'

export const CommandBar = () => {
  const searchStyle = {
    padding: '12px 16px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box' as React.CSSProperties['boxSizing'],
    outline: 'none',
    border: 'none',
    background: '#FFFFF',
    color: 'var(--foreground)',
  }

  const animatorStyle = {
    maxWidth: '500px',
    width: '100%',
    background: '#FFFFF',
    color: 'var(--foreground)',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  }

  return (
    <KBarPortal>
      <KBarPositioner>
        <KBarAnimator style={animatorStyle}>
          <KBarSearch style={searchStyle} placeholder="I see you found the secret menu…" />
          <RenderResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  )
}
