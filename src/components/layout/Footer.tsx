export default function Footer() {
  return (
    <footer>
      {/* Bottom bar */}
      <div className="flex items-center justify-between px-6 py-6 sm:px-8 md:px-12">
        <p className="text-[0.7rem] tracking-wide text-text-tertiary">
          &copy; {new Date().getFullYear()}
        </p>
        <p className="text-[0.7rem] tracking-wide text-text-tertiary">
          L4D Team
        </p>
      </div>
    </footer>
  );
}
