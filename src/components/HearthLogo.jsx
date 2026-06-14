// HearthLogo wordmark — used in the host header.
// Renders as an inline SVG logotype in Space Grotesk display style.

export default function HearthLogo({ inverted = false }) {
  return (
    <span
      style={{
        fontFamily: 'var(--f-display)',
        fontSize: 22,
        fontWeight: 500,
        letterSpacing: '-0.02em',
        color: inverted ? '#fff' : 'var(--c-near-black)',
        userSelect: 'none',
      }}
    >
      stay and eat
    </span>
  );
}
