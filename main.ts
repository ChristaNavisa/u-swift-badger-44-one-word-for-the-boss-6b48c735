import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const word = "Echo";

function resolveOutDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function writeEntry(outDir: string, text: string): string {
  if (text.length < 1 || text.length > 30) {
    throw new Error("entry must be 1-30 characters");
  }
  if (/\s/.test(text)) {
    throw new Error("entry must be exactly one word");
  }
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, text, "utf8");
  return target;
}

const target = writeEntry(resolveOutDir(), word);
console.log(`wrote ${word.length} characters to ${target}`);
