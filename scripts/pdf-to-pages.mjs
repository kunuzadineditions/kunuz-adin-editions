/**
 * Converts PDF pages to high-quality JPGs for the FlipBook component.
 *
 * NOTE: pdf2pic requires ImageMagick (convert/gm) which is not available on
 * this machine. This script delegates to the native macOS CoreGraphics renderer
 * via Python (no installation required — uses macOS system frameworks).
 *
 * Usage:
 *   node scripts/pdf-to-pages.mjs              # convert first 20 pages
 *   node scripts/pdf-to-pages.mjs --pages 10   # first 10 pages only
 *   node scripts/pdf-to-pages.mjs --force       # overwrite existing images
 *
 * Or call the Python script directly:
 *   python3 scripts/pdf-to-pages.py
 *   python3 scripts/pdf-to-pages.py 10         # first N pages
 */

import { execSync } from "child_process";
import { resolve } from "path";

const args   = process.argv.slice(2);
const pages  = args[args.indexOf("--pages") + 1] ?? "20";
const force  = args.includes("--force");

const script = resolve("scripts/pdf-to-pages.py");

const cmd = `python3 "${script}"${force ? " --force" : ""} ${pages}`;
console.log(`Running: ${cmd}\n`);
execSync(cmd, { stdio: "inherit" });
