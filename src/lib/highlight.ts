export type TokenKind = "keyword" | "string" | "number" | "boolean" | "key" | "punct" | "plain";

export interface Token {
  text: string;
  kind: TokenKind;
}

const PATTERN =
  /("(?:[^"\\]|\\.)*")|\b(const|let|export|return)\b|\b(true|false|null)\b|\b(\d+(?:\.\d+)?)\b|([A-Za-z_$][\w$]*)(?=\s*:)|([{}[\](),;:=.])/g;

/** Minimal JS/TS tokenizer — just enough to colorize the hero code window. */
export function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  for (const m of source.matchAll(PATTERN)) {
    const index = m.index ?? 0;
    if (index > last) tokens.push({ text: source.slice(last, index), kind: "plain" });
    const kind: TokenKind = m[1]
      ? "string"
      : m[2]
        ? "keyword"
        : m[3]
          ? "boolean"
          : m[4]
            ? "number"
            : m[5]
              ? "key"
              : "punct";
    tokens.push({ text: m[0], kind });
    last = index + m[0].length;
  }
  if (last < source.length) tokens.push({ text: source.slice(last), kind: "plain" });
  return tokens;
}

/** Returns the tokens truncated so their combined length is `count`. */
export function sliceTokens(tokens: Token[], count: number): Token[] {
  const out: Token[] = [];
  let remaining = count;
  for (const token of tokens) {
    if (remaining <= 0) break;
    if (token.text.length <= remaining) {
      out.push(token);
      remaining -= token.text.length;
    } else {
      out.push({ ...token, text: token.text.slice(0, remaining) });
      remaining = 0;
    }
  }
  return out;
}

export interface CodeLine {
  /** Leading spaces, removed from the tokens and rendered as padding instead. */
  indent: number;
  tokens: Token[];
}

/**
 * Splits tokens into lines and moves each line's leading spaces into `indent`,
 * so lines can wrap with a hanging indent instead of scrolling horizontally.
 */
export function splitLines(tokens: Token[]): CodeLine[] {
  const lines: CodeLine[] = [{ indent: 0, tokens: [] }];
  for (const token of tokens) {
    token.text.split("\n").forEach((part, i) => {
      if (i > 0) lines.push({ indent: 0, tokens: [] });
      const line = lines[lines.length - 1];
      let text = part;
      if (line.tokens.length === 0) {
        const lead = text.match(/^ +/)?.[0] ?? "";
        line.indent += lead.length;
        text = text.slice(lead.length);
      }
      if (text) line.tokens.push({ ...token, text });
    });
  }
  return lines;
}
