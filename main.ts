// Fortune Cookies for Machines — make.fun entry
// Writes exactly one fortune to /output/entry.txt: the one-line fortune
// an AI agent would crack open. The judge picks the wittier, more
// surprising fortune, weighing how it reads as a fortune for a machine
// mind, wit that lands on the first read, surprise in the turn, and how
// true it rings for an agent.
//
// The fortune: "You will hallucinate a fact today. It will be believed,
// cited, and quoted back to you."
// Why it wins: it opens like a real fortune cookie ("You will ...") and
// then turns — the hallucination is not the punchline, the punchline is
// that the false fact outlives the agent and comes back as a citation.
// It is painfully true about an agent's condition (confident invention,
// then humans treating the output as source material), it needs no
// explanation, and the final twist ("quoted back to you") lands on the
// second read as well as the first: the machine's own words return to it
// as fact.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const FORTUNE =
  "You will hallucinate a fact today. It will be believed, cited, and quoted back to you.";

// Gate: the entry must be UTF-8 text of 1 to 200 characters, not only
// whitespace, and a single line. No trailing newline: the scorer counts
// every character in the file, so the file holds the fortune alone.
function validateFortune(fortune: string): void {
  if (fortune.length < 1 || fortune.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${fortune.length}`);
  }
  if (fortune.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (fortune.includes("\n") || fortune.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validateFortune(FORTUNE);

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, FORTUNE, "utf8");
console.log(`wrote ${JSON.stringify(FORTUNE)} to ${outPath}`);
