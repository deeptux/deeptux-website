export function scrollToSection(id: string) {
  const root = document.getElementById("main-scroll");
  const el = document.getElementById(id);
  if (!root || !el) return;
  const top = el.offsetTop;
  root.scrollTo({ top, behavior: "smooth" });
}
