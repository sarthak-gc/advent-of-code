import fs from "node:fs";

let sum = 0;

const part1 = (starting, ending) => {
  for (let i = starting; i <= ending; i++) {
    const stringifiedI = i.toString();
    if (stringifiedI.length % 2 != 0) {
      continue;
    }
    const half = String(i).length / 2
    const firstHalf = stringifiedI.slice(0, half)
    const secondHalf = stringifiedI.slice(half)

    if (firstHalf == secondHalf) {
      sum += Number(stringifiedI)
    }
  }
}

async function readFile() {
  const data = fs.readFileSync("example.txt", "utf-8")
  const ranges = data.split(",")
  ranges.filter(range => {
    const starting = Number(range.split("-")[0])
    const ending = Number(range.split("-")[1])
    part1(starting, ending)
  })
}
await readFile()
console.log(sum)
