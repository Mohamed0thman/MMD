function div(first, second) {
  return first / second;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function generateDirection() {
  return Math.random() < 0.5 ? -1 : 1;
}

function parseArg(config, args, state) {
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    switch (arg) {
      case '-l':
      case '--level':
        const level = parseInt(args[index + 1]);
        if (!isNaN(level) && level <= state.length) {
          config.level = level;
        } else {
          console.log(
            'Invalid value for level option so we will use default one',
          );
        }
        break;
      case '-n':
      case '--number':
        config.length = parseInt(args[index + 1]);
        if (isNaN(config.length)) {
          console.log(
            'Invalid value for number option so we will use default one',
          );
        }
        break;
      default:
        break;
    }
  }
}

function parse_number(hand, number, direction) {
  const max = hand.max;
  if (direction > 0) {
    const sum = number + hand.value;
    if (sum > max) {
      return false;
    }
    hand.value = sum;
    return true;
  } else {
    const sub = hand.value - number;
    if (sub < 0) {
      return false;
    }
    hand.value = sub;
    return true;
  }
}
export function leve_1(length = 9, level = 1) {
  let stage = [];
  let state = [
    {
      value: 0,
      max: 9,
    },
    {
      value: 0,
      max: 99,
    },
    {
      value: 0,
      max: 999,
    },
    {
      value: 0,
      max: 9999,
    },
    {
      value: 0,
      max: 99999,
    },
    {
      value: 0,
      max: 999999,
    },
    {
      value: 0,
      max: 9999999,
    },
    {
      value: 0,
      max: 99999999,
    },
    {
      value: 0,
      max: 999999999,
    },

    {
      value: 0,
      max: 9999999999,
    },
  ];
  let config = { length, level };
  const result = [];
  let sum = 0;
  const max_range_number = Math.pow(10, config.level);
  const min_range_number = Math.pow(10, config.level - 1);
  outer: while (result.length < config.length) {
    let number = parseInt(
      getRandomArbitrary(min_range_number, max_range_number),
    );
    let work_number = number;
    let direction = generateDirection();

    stage = JSON.parse(JSON.stringify(state));

    for (let i = config.level - 1; i >= 0; i--) {
      if (work_number === 0) {
        continue;
      }
      const position = Math.pow(10, i);
      const the_number = parseInt(div(work_number, position));
      if (the_number < 1) {
        continue;
      }
      const value = the_number * position;
      work_number -= value;

      if (!parse_number(stage[i], value, direction)) {
        continue outer;
      }
    }
    state = JSON.parse(JSON.stringify(stage));
    number *= direction;
    sum += number;
    result.push(number);
  }
  console.log(result, '=', sum);
  console.log('-------------------------------------');

  return { result, sum };
}
