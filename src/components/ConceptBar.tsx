/* Transparency notice: this is not the business's official website. */
export function ConceptBar() {
  return (
    <div className="bg-surface text-muted">
      <div className="frame small flex flex-wrap items-center justify-center gap-x-6 gap-y-0.5 py-2 text-center md:justify-between md:text-left">
        <p>Independent website concept, not affiliated with or endorsed by Diwan Auto Care LLP.</p>
        <p>
          Official site:{' '}
          <a className="link text-ink" href="https://diwanautocare.com" target="_blank" rel="noopener noreferrer">
            diwanautocare.com
          </a>
        </p>
      </div>
    </div>
  )
}
