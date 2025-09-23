// Web3 functionality has been moved to a separate site
// This provider is kept for compatibility but no longer provides Web3 context

export default function OnboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
