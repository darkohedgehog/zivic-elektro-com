export function BackgroundSystem() {
  return (
    <div aria-hidden="true" className="background-system">
      <div className="background-system__base" />
      <div className="background-system__mesh" />
      <div className="background-system__glow background-system__glow--top" />
      <div className="background-system__glow background-system__glow--right" />
      <div className="background-system__glow background-system__glow--bottom" />
      <div className="background-system__grid" />
      <div className="background-system__vignette" />
    </div>
  );
}
