import fs from "node:fs";

let sum = 0;

const allSame = (stringifiedI) => {
  const newArr = stringifiedI.split(stringifiedI[0]);
  if (newArr.length == stringifiedI.length + 1) {
    return true;
  }
  return false;
};

const part1 = (i) => {
  const stringifiedI = i.toString();
  if (stringifiedI.length % 2 != 0) {
    return;
  }
  const half = String(i).length / 2;
  const firstHalf = stringifiedI.slice(0, half);
  const secondHalf = stringifiedI.slice(half);

  if (firstHalf == secondHalf) {
    console.log("same halves:", stringifiedI);
    sum += Number(stringifiedI);
  }
};

const part2 = (i) => {
  const stringifiedI = i.toString();
  if (stringifiedI.length == 1) {
    return;
  }

  // checking if all the numbers are same
  if (allSame(stringifiedI)) {
    sum += Number(stringifiedI);
  } else {
    for (let itr = 1; itr <= stringifiedI.length / 2; itr++) {
      const part = stringifiedI.slice(0, itr);
      const repeatedString = part.repeat(stringifiedI.length / itr);

      if (stringifiedI == repeatedString) {
        console.log("repeated", part);
        sum += Number(stringifiedI);
        // without break, 12121212 is counted twice, once for 12 12 12 12 and once for 1212 1212
        break;
      }
    }
  }
};

async function readFile() {
  const data = fs.readFileSync("input.txt", "utf-8");
  const ranges = data.split(",");
  ranges.filter((range) => {
    const starting = Number(range.split("-")[0]);
    const ending = Number(range.split("-")[1]);
    for (let i = starting; i <= ending; i++) {
      // part1(i);
      part2(i);
    }
  });
}

await readFile();
console.log(sum);
