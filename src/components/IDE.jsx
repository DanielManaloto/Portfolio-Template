import { useEffect, useMemo, useRef, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/*
 * Types out an array of { text, className } tokens.
 * Returns how many characters should currently be visible.
 *
 * - `enabled`: animate at all (false => show everything immediately)
 * - `started`: hold at zero characters until this becomes true
 */
function useTypewriter(tokens, { enabled, started, charsPerTick, intervalMs, onDone }) {
  const total = useMemo(
    () => (tokens ? tokens.reduce((n, t) => n + t.text.length, 0) : 0),
    [tokens]
  );

  // Respect the OS "reduce motion" setting: show everything immediately.
  const animate = enabled && !prefersReducedMotion();
  const [count, setCount] = useState(animate ? 0 : total);

  // Keep the latest onDone without restarting the timer when it changes.
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (!animate) {
      setCount(total);
      onDoneRef.current?.();
      return;
    }
    if (!started) return;

    setCount(0);
    let current = 0;
    const timer = setInterval(() => {
      current += charsPerTick;
      if (current >= total) {
        clearInterval(timer);
        setCount(total);
        onDoneRef.current?.();
        return;
      }
      setCount(current);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [animate, started, tokens, total, charsPerTick, intervalMs]);

  return { count, done: count >= total };
}

/** Returns the tokens truncated to `count` characters, as <span>s. */
function renderTokens(tokens, count) {
  const out = [];
  let remaining = count;
  for (let i = 0; i < tokens.length && remaining > 0; i++) {
    const chunk = tokens[i].text.slice(0, remaining);
    remaining -= chunk.length;
    out.push(
      <span key={i} className={tokens[i].className || undefined}>
        {chunk}
      </span>
    );
  }
  return out;
}

const countLines = (tokens) =>
  tokens.reduce((n, t) => n + t.text.split("\n").length - 1, 0) + 1;

/*
 * IDE
 *
 * Props:
 * - width, height, tabs : as before
 * - code        : JSX rendered as-is (no animation).
 * - tokens      : [{ text, className }] rendered instead of `code`.
 * - typing      : if true (and `tokens` is given), types the tokens out.
 * - startOnVisible : wait until the editor scrolls into view before typing.
 * - typingSpeed : { charsPerTick, intervalMs } (default 2 chars / 24ms)
 * - status      : { running, done } labels for an optional status bar.
 * - lineCount   : optional; derived from `tokens` when omitted.
 *
 * Tip: give <IDE> a `key` that changes with its content (e.g. the skill id)
 * so the animation restarts when the content is swapped.
 */
function IDE({
  width,
  height,
  tabs = [],
  code,
  tokens,
  typing = false,
  startOnVisible = false,
  typingSpeed,
  status,
  lineCount,
}) {
  const { charsPerTick = 2, intervalMs = 24 } = typingSpeed ?? {};

  const rootRef = useRef(null);
  const [visible, setVisible] = useState(!startOnVisible);

  useEffect(() => {
    if (visible) return;
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  const { count, done } = useTypewriter(tokens, {
    enabled: typing && !!tokens,
    started: visible,
    charsPerTick,
    intervalMs,
  });

  const fullText = useMemo(
    () => (tokens ? tokens.map((t) => t.text).join("") : ""),
    [tokens]
  );

  const lines = lineCount ?? (tokens ? countLines(tokens) : 1);
  const isTyping = typing && !!tokens && !done;

  let codeContent = code;
  if (tokens) {
    codeContent = (
      <>
        {renderTokens(tokens, count)}
        {isTyping && visible && (
          <span className="typing-caret" aria-hidden="true" />
        )}
      </>
    );
  }

  return (
    <div
      ref={rootRef}
      style={{ width, height, maxWidth: "100%" }}
      className="flex min-w-0 flex-col rounded-md bg-[#1e1e1e] text-sm text-[#cccccc] shadow-lg"
    >
      {/* Tabs */}
      {tabs.length > 0 && (
        <>
          <div className="flex h-10 shrink-0 overflow-x-auto bg-[#252526] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((tab, index) => (
              <div
                key={tab.name ?? index}
                className={`flex shrink-0 items-center gap-2 whitespace-nowrap px-4 ${
                  tab.active
                    ? "border-t-2 border-blue-400 bg-[#1e1e1e]"
                    : "text-[#858585]"
                }`}
              >
                <span className="text-blue-400">{tab.language}</span>
                <span>{tab.name}</span>
                <span className="ml-2 text-[#858585]">×</span>
              </div>
            ))}
          </div>

          {/* Breadcrumb */}
          <div className="h-7 shrink-0 truncate border-b border-[#333333] bg-[#1e1e1e] px-4 py-1 text-xs text-[#858585]">
            {tabs.find((tab) => tab.active)?.name}
          </div>
        </>
      )}

      {/* Code: one scroll container for both axes */}
      <div className="min-h-0 min-w-0 flex-1 overflow-auto bg-[#1e1e1e] font-mono text-xs">
        <div className="flex min-w-max">
          {/* Line numbers (stay pinned on horizontal scroll) */}
          <div
            aria-hidden="true"
            className="sticky left-0 w-10 shrink-0 select-none bg-[#1e1e1e] pr-2 pt-4 text-right leading-5 text-[#5a5a5a]"
          >
            {Array.from({ length: lines }, (_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>

          {/* Screen readers get the full text once, not partial characters. */}
          {tokens && <span className="sr-only">{fullText}</span>}
          <pre
            className="pt-4 pr-4 leading-5"
            aria-hidden={tokens ? "true" : undefined}
          >
            {codeContent}
          </pre>
        </div>
      </div>

      {/* Optional status bar */}
      {status && (
        <div
          role="status"
          className="flex h-8 shrink-0 items-center gap-2 border-t border-[#333333] bg-[#252526] px-4 text-xs text-[#858585]"
        >
          <i
            aria-hidden="true"
            className={`block h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
              isTyping ? "bg-amber-400" : "bg-emerald-400"
            }`}
          />
          <span>{isTyping ? status.running : status.done}</span>
        </div>
      )}
    </div>
  );
}

export default IDE;