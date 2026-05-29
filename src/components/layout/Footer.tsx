export default function Footer() {
  return (
    <footer>
      {/* Bottom bar */}
      <div className="flex items-center justify-between px-6 py-6 sm:px-8 md:px-12">
        <p className="text-[0.7rem] tracking-wide text-text-tertiary">
          &copy; {new Date().getFullYear()} Sophie. From Vietnam with love.
        </p>
        <a
          href="https://www.linkedin.com/in/nguyen-xuan-196037211/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.7rem] tracking-wide text-text-tertiary transition-all duration-300 hover:text-text-primary hover:underline hover:decoration-accent hover:underline-offset-4"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
