type IconProps = {
  icon: string,
}
export function Icon({ icon } : IconProps) {
  const className = `bi bi-${icon} me-2`;
  return (
    <i className={className}></i>
  );
}
