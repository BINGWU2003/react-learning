import type { ReactNode } from "react";

type ProfileCardProps = {
  children: ReactNode;
  footer: ReactNode;
  title: string;
};

export function ProfileCard({ children, footer, title }: ProfileCardProps) {
  return (
    <section className="demo-card">
      <span className="demo-tag">children / footer prop</span>
      <h2>{title}</h2>
      <div>{children}</div>
      <div className="demo-actions">{footer}</div>
    </section>
  );
}

