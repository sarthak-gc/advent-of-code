import fs from "node:fs";
import readline from "node:readline";

let current_pointer = 50;
let cnt = 0;
let next_pointer;
const total_dial_count = 100;

const part1 = (direction, total_moves) => {
  if (direction == "L") {
    next_pointer = current_pointer - total_moves;
    if (next_pointer < 0) {
      current_pointer = total_dial_count + next_pointer;
    } else {
      current_pointer = next_pointer;
    }
  } else if (direction == "R") {
    next_pointer = current_pointer + total_moves;
    if (next_pointer >= total_dial_count) {
      current_pointer = next_pointer % total_dial_count;
    } else {
      current_pointer = next_pointer;
    }
  }
  if (current_pointer == 0) {
    cnt++;
  }
  return cnt;
}

async function processLineByLine() {
  const fileStream = fs.createReadStream("input.txt");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    const direction = line[0];
    const number = Number(line.substring(1));
    const total_moves = number % total_dial_count;
    cnt = part1(direction, total_moves);
    cnt = part2(number, direction);
  }
  console.log(cnt);
}

function part2(number, direction) {
  for (let i = 0; i < number; i++) {
    if (direction == "L") {
      current_pointer--;
    }
    if (direction == "R") {
      current_pointer++;
    }
    if (current_pointer == -1) {
      current_pointer = total_dial_count - 1;
    }
    if (current_pointer == total_dial_count) {
      current_pointer = 0;
    }
    if (current_pointer == 0) {
      cnt++;
    }
  }
  return cnt;
}

await processLineByLine();
