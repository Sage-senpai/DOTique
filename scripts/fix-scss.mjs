import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, extname } from "path";

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "node_modules" && entry.name !== "dist") {
      files.push(...walk(full));
    } else if (entry.isFile() && extname(entry.name) === ".scss") {
      files.push(full);
    }
  }
  return files;
}

let fixed = 0;

for (const file of walk("src")) {
  let src = readFileSync(file, "utf8");
  if (!src.includes("lighten(") && !src.includes("darken(")) continue;

  // Add @use "sass:color" if not already present
  if (!src.includes('@use "sass:color"') && !src.includes("@use 'sass:color'")) {
    src = '@use "sass:color";\n' + src;
  }

  // Replace lighten($var, N%) → color.adjust($var, $lightness: N%)
  src = src.replace(/lighten\((\$[\w-]+),\s*([\d.]+)%\)/g, "color.adjust($1, $lightness: $2%)");
  // Replace darken($var, N%) → color.adjust($var, $lightness: -N%)
  src = src.replace(/darken\((\$[\w-]+),\s*([\d.]+)%\)/g, "color.adjust($1, $lightness: -$2%)");

  writeFileSync(file, src, "utf8");
  fixed++;
  console.log("Fixed:", file);
}

console.log(`\nDone — fixed ${fixed} file(s).`);
