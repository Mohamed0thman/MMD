export function isEven(number: number) {
  return number % 2 === 0;
}
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function generateRandomNumber(
  maxDigits: number,
  allowNegative: boolean = false,
): string | number {
  let result = 0;

  while (result === 0) {
    let randomNumber = '';

    for (let i = 0; i < maxDigits; i++) {
      const digit = Math.floor(Math.random() * 10);
      randomNumber += digit;
    }

    result = parseInt(randomNumber, 10);
  }

  return allowNegative ? (Math.random() < 0.5 ? -result : result) : result;
}
export function generateRandomAbacusNumber(
  maxDigits: number,
  minValue: number = 1,
  maxValue: number = 9,
): number[] {
  const result = [];
  let sum = 0;

  // Generate random digits within the specified range
  for (let i = 0; i < maxDigits; i++) {
    let digit =
      Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

    // Ensure the digit is strictly greater than 0
    if (digit <= 0) {
      digit = 1;
    }

    // Adjust the digit if necessary to ensure the sum falls between 1 and 9
    if (sum + digit > 9) {
      digit = 9 - sum; // Set the digit to the remaining value needed to reach 9
    } else if (sum + digit < 1) {
      digit = 1 - sum; // Set the digit to the remaining value needed to reach 1
    }

    result.push(digit);
    sum += digit;
  }

  return result;
}
function getRandomElementFromArray() {
  return Math.floor(Math.random() * 9) + 1;
}
export function generateOneHandArithmeticProblems() {
  const len = 9;

  if (isNaN(len) || len <= 0) {
    console.error('Please provide a valid length as the first argument.');
    return;
  }
  const hand_map = {
    ahad: {
      big: false,
      smalls: 4,
    },
  };
  const result = [];
  let sum = 0;
  while (result.length < len) {
    let element = getRandomElementFromArray();
    let raise_big = hand_map.ahad.big;
    let available_smalls = hand_map.ahad.smalls;
    if (element < 5) {
      if (available_smalls - element >= 0) {
        hand_map.ahad.smalls -= element;
      } else {
        if (available_smalls + element <= 4) {
          hand_map.ahad.smalls += element;
          element *= -1;
        } else {
          continue;
        }
      }
    } else {
      const mod = element % 5;
      if (raise_big) {
        if (available_smalls + mod <= 4) {
          hand_map.ahad.smalls += mod;
          hand_map.ahad.big = false;
          element *= -1;
        } else {
          continue;
        }
      } else {
        if (available_smalls - mod >= 0) {
          hand_map.ahad.smalls -= mod;
          hand_map.ahad.big = true;
        } else {
          continue;
        }
      }
    }
    sum += element;
    result.push(element);
  }

  console.log(`${JSON.stringify(result)} = ${sum}`);
  return result;
}

export function generateOneHandArithmeticProblems2() {
  const len = 9;

  if (isNaN(len) || len <= 0) {
    console.error('Please provide a valid length as the first argument.');
    return;
  }
  const hand_map = {
    ahad: {
      big: false,
      smalls: 4,
    },
  };
  const result = [];
  let sum = 0;
  while (result.length < len) {
    let element = getRandomElementFromArray();
    let raise_big = hand_map.ahad.big;
    let available_smalls = hand_map.ahad.smalls;
    if (element < 5) {
      if (available_smalls - element >= 0) {
        hand_map.ahad.smalls -= element;
      } else {
        if (available_smalls + element <= 4) {
          hand_map.ahad.smalls += element;
          element *= -1;
        } else {
          continue;
        }
      }
    } else {
      const mod = element % 5;
      if (raise_big) {
        if (available_smalls + mod <= 4) {
          hand_map.ahad.smalls += mod;
          hand_map.ahad.big = false;
          element *= -1;
        } else {
          continue;
        }
      } else {
        if (available_smalls - mod >= 0) {
          hand_map.ahad.smalls -= mod;
          hand_map.ahad.big = true;
        } else {
          continue;
        }
      }
    }

    if (element <= 0) {
      // Skip negative numbers
      continue;
    }
    if (sum + element > 9) {
      // If adding the element would exceed the sum limit of 9, skip it
      element = 9 - sum;
      sum += element;
      result.push(element);
      break;
    }
    sum += element;
    result.push(element);
  }
  console.log(`rrr${JSON.stringify(result)} = ${sum}`);

  return result;
}

function div(first, second) {
  return first / second;
}

function rem(number, value) {
  return number % value;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function get_finger_count(finger, value) {
  return div(value, finger?.value);
}

function occupied(finger) {
  return finger?.count === 0;
}

function has_room_for_adding(finger, number) {
  return finger?.count + number <= finger?.max_count;
}

function has_room_for_taking(finger, number) {
  return finger?.count - number >= 0;
}

function decrement(finger, value) {
  finger.count -= value;
}

function increment(finger, value) {
  finger.count += value;
}

function parse_number(hand, number) {
  const max =
    hand?.thumb?.max_count * hand?.thumb?.value +
    hand?.others?.max_count * hand?.others?.value;
  if (max < number) {
    return { status: 'Invalid', hand };
  }
  if (number >= hand?.thumb?.value) {
    const mod_value = rem(number, hand.thumb.value);
    const others_count = get_finger_count(hand.others, mod_value);

    if (occupied(hand.thumb)) {
      if (!has_room_for_adding(hand.others, others_count)) {
        return { status: 'Invalid', hand };
      }
      increment(hand.others, others_count);
      increment(hand.thumb, 1);
      return { status: 'Negative', hand };
    } else {
      if (!has_room_for_taking(hand.others, others_count)) {
        return { status: 'Invalid', hand };
      }
      decrement(hand.others, others_count);
      decrement(hand.thumb, 1);
      return { status: 'Positive', hand };
    }
  } else {
    const others_count = get_finger_count(hand.others, number);
    if (has_room_for_taking(hand.others, others_count)) {
      decrement(hand.others, others_count);
      return { status: 'Positive', hand };
    } else if (has_room_for_adding(hand.others, others_count)) {
      increment(hand.others, others_count);
      return { status: 'Negative', hand };
    } else {
      return { status: 'Invalid', hand };
    }
  }
}
export function main0(length: number = 9, level: number = 1) {
  let stage = [];
  let state = [
    {
      thumb: { count: 1, max_count: 1, value: 5 },
      others: { count: 4, max_count: 4, value: 1 },
    },
    {
      thumb: { count: 1, max_count: 1, value: 50 },
      others: { count: 4, max_count: 4, value: 10 },
    },
    {
      thumb: { count: 1, max_count: 1, value: 500 },
      others: { count: 4, max_count: 4, value: 100 },
    },
    {
      thumb: { count: 1, max_count: 1, value: 5000 },
      others: { count: 4, max_count: 4, value: 1000 },
    },
    {
      thumb: { count: 1, max_count: 1, value: 50000 },
      others: { count: 4, max_count: 4, value: 10000 },
    },
    {
      thumb: { count: 1, max_count: 1, value: 500000 },
      others: { count: 4, max_count: 4, value: 100000 },
    },
    {
      thumb: { count: 1, max_count: 1, value: 5000000 },
      others: { count: 4, max_count: 4, value: 100000 },
    },
    {
      thumb: { count: 1, max_count: 1, value: 50000000 },
      others: { count: 4, max_count: 4, value: 1000000 },
    },
    {
      thumb: { count: 1, max_count: 1, value: 50000000 },
      others: { count: 4, max_count: 4, value: 1000000 },
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
    let direction = 0;
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
      // const s = typeof stage === 'string' ? JSON.parse(stage) : stage;

      const { status, hand } = parse_number(stage[i], value);
      stage[i] = hand;

      switch (status) {
        case 'Invalid':
          continue outer;
        case 'Positive':
          if (direction === 0) {
            direction = 1;
          } else if (direction !== 1) {
            continue outer;
          }
          break;
        case 'Negative':
          if (direction === 0) {
            direction = -1;
          } else if (direction !== -1) {
            continue outer;
          }
          break;
        default:
          break;
      }
    }
    if (direction === 0) {
      continue;
    }
    state = JSON.parse(JSON.stringify(stage));
    number *= direction;
    sum += number;
    result.push(number);
  }
  // console.log("---------------Config-----------------");
  // console.log(config);
  // console.log("---------------Board-----------------");
  // console.log(app.state.availabelHandes);
  // console.log("--------------Result-----------------");
  console.log(result, '=', sum);
  // console.log("-------------------------------------");

  return { result, sum };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

function generateDirection() {
  return Math.random() < 0.5 ? -1 : 1;
}

function parse_number_level_1(hand, number, direction) {
  const max =
    hand.thumb.max_count * hand.thumb.value +
    hand.others.max_count * hand.others.value;
  if (direction > 0) {
    if (max < number) {
      return { status: 'Invalid', hand };
    }
    if (number >= hand.thumb.value) {
      const mod_value = rem(number, hand.thumb.value);
      const others_count = get_finger_count(hand.others, mod_value);
      if (occupied(hand.thumb)) {
        return { status: 'Invalid', hand };
      } else {
        if (!has_room_for_taking(hand.others, others_count)) {
          return { status: 'Invalid', hand };
        }
        decrement(hand.others, others_count);
        decrement(hand.thumb, 1);
        return { status: 'Positive', hand };
      }
    } else {
      const others_count = get_finger_count(hand.others, number);
      if (has_room_for_taking(hand.others, others_count)) {
        decrement(hand.others, others_count);
        return { status: 'Positive', hand };
      } else {
        return { status: 'Invalid', hand };
      }
    }
  } else {
    if (number >= hand.thumb.value) {
      const mod_value = rem(number, hand.thumb.value);
      const others_count = get_finger_count(hand.others, mod_value);
      if (!occupied(hand.thumb)) {
        return { status: 'Invalid', hand };
      } else {
        if (!has_room_for_adding(hand.others, others_count)) {
          return { status: 'Invalid', hand };
        }
        increment(hand.others, others_count);
        increment(hand.thumb, 1);
        return { status: 'negative', hand };
      }
    } else {
      const others_count = get_finger_count(hand.others, number);
      if (has_room_for_adding(hand.others, others_count)) {
        increment(hand.others, others_count);
        return { status: 'negative', hand };
      } else {
        return { status: 'Invalid', hand };
      }
    }
  }
}

export function main1(length: number = 9, level: number = 1) {
  let stage = [];
  let state = [
    {
      thumb: { count: 1, max_count: 1, value: 5 },
      others: { count: 4, max_count: 4, value: 1 },
    },
    {
      thumb: { count: 1, max_count: 1, value: 50 },
      others: { count: 4, max_count: 4, value: 10 },
    },
    {
      thumb: { count: 1, max_count: 1, value: 500 },
      others: { count: 4, max_count: 4, value: 100 },
    },
    {
      thumb: { count: 1, max_count: 1, value: 5000 },
      others: { count: 4, max_count: 4, value: 1000 },
    },
    {
      thumb: { count: 1, max_count: 1, value: 50000 },
      others: { count: 4, max_count: 4, value: 10000 },
    },
    {
      thumb: { count: 1, max_count: 1, value: 500000 },
      others: { count: 4, max_count: 4, value: 100000 },
    },
    {
      thumb: { count: 1, max_count: 1, value: 5000000 },
      others: { count: 4, max_count: 4, value: 1000000 },
    },
    {
      thumb: { count: 1, max_count: 1, value: 5000000 },
      others: { count: 4, max_count: 4, value: 1000000 },
    },
    {
      thumb: { count: 1, max_count: 1, value: 50000000 },
      others: { count: 4, max_count: 4, value: 10000000 },
    },

    {
      thumb: { count: 1, max_count: 1, value: 500000000 },
      others: { count: 4, max_count: 4, value: 100000000 },
    },
  ];
  let config = { length, level };
  // parseArg(config, args, state);
  const result = [];
  let sum = 0;
  const max_range_number = Math.pow(10, config.level);
  const min_range_number = Math.pow(10, config.level - 1);
  // const max_range = parseInt('9'.repeat(config.level));
  const max_range = Math.pow(10, config.level) - 1;
  // console.log(('max_range' = `${max_range}`));
  while (result.length < config.length) {
    let number = null;
    if (result.length === 0) {
      number = parseInt(getRandomArbitrary(min_range_number, max_range_number));
    } else if (result.length === 1) {
      const target = min_range_number - sum;
      if (target > 0) {
        number = parseInt(getRandomArbitrary(target, max_range_number));
      } else {
        number = parseInt(
          getRandomArbitrary(min_range_number * 5, max_range_number),
        );
      }
    } else {
      number = parseInt(
        getRandomArbitrary(min_range_number * 5, max_range_number),
      );
    }
    let work_number = number;
    let direction = generateDirection();

    if (direction > 0 && max_range > sum + number) {
      result.push(number);
      sum += number;
    } else if (direction < 0 && sum - number > 0) {
      result.push(-1 * number);
      sum -= number;
    } else {
      continue;
    }
  }
  // console.log(result, '=', sum);
  // return
  //
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
      const { status, hand } = parse_number_level_1(stage[i], value, direction);
      stage[i] = hand;
      switch (status) {
        case 'Invalid':
          continue outer;
        default:
          break;
      }
    }
    if (direction === 0) {
      continue;
    }
    state = JSON.parse(JSON.stringify(state));
    number *= direction;
    sum += number;
    result.push(number);
  }
  // console.log("---------------Config-----------------");
  // console.log(config);
  // console.log("---------------Board-----------------");
  // console.log(app.state.availabelHandes);
  // console.log("--------------Result-----------------");
  console.log(result, '=', sum);
  console.log('-------------------------------------');

  return { result, sum };
}
export function main2(length: number = 9, level: number = 1) {
  let stage = [];
  let state = [
    {
      thumb: { count: 1, max_count: 1, value: 5 },
      others: { count: 4, max_count: 4, value: 1 },
    },
    {
      thumb: { count: 1, max_count: 1, value: 50 },
      others: { count: 4, max_count: 4, value: 10 },
    },
    {
      thumb: { count: 1, max_count: 1, value: 500 },
      others: { count: 4, max_count: 4, value: 100 },
    },
    {
      thumb: { count: 1, max_count: 1, value: 5000 },
      others: { count: 4, max_count: 4, value: 1000 },
    },
    {
      thumb: { count: 1, max_count: 1, value: 50000 },
      others: { count: 4, max_count: 4, value: 10000 },
    },
    {
      thumb: { count: 1, max_count: 1, value: 500000 },
      others: { count: 4, max_count: 4, value: 100000 },
    },
    {
      thumb: { count: 1, max_count: 1, value: 5000000 },
      others: { count: 4, max_count: 4, value: 1000000 },
    },
    {
      thumb: { count: 1, max_count: 1, value: 5000000 },
      others: { count: 4, max_count: 4, value: 1000000 },
    },
    {
      thumb: { count: 1, max_count: 1, value: 50000000 },
      others: { count: 4, max_count: 4, value: 10000000 },
    },

    {
      thumb: { count: 1, max_count: 1, value: 500000000 },
      others: { count: 4, max_count: 4, value: 100000000 },
    },
  ];
  let config = { length, level };
  const result = [];
  let sum = 0;
  const max_range_number = Math.pow(10, config.level);
  const min_range_number = Math.pow(10, config.level - 1);
  const max_range = Math.pow(10, config.level) - 1;

  while (result.length < config.length) {
    let number = parseInt(
      getRandomArbitrary(min_range_number, max_range_number),
    );
    let direction = generateDirection();
    if (direction > 0 && max_range >= sum + number) {
      result.push(number);
      sum += number;
    } else if (direction < 0 && sum - number >= 0) {
      result.push(-1 * number);
      sum -= number;
    }
  }
  console.log(result, '=', sum);
  return { result, sum };

  // while (result.length < config.length) {
  //     let direction=null;
  //     let number = null
  //     if (result.length === 0) {
  //         number = parseInt(getRandomArbitrary(min_range_number, max_range_number));
  //         direction = 1
  //     } else if (result.length === 1) {
  //         const target = (min_range_number * 5) - sum
  //         if (target > 0) {
  //             number = parseInt(getRandomArbitrary(target, max_range_number));
  //         } else {
  //             number = parseInt(getRandomArbitrary(min_range_number * 5, max_range_number));
  //         }
  //         direction =  generateDirection();
  //     } else {
  //         number = parseInt(getRandomArbitrary(min_range_number * 5, max_range_number));
  //         direction =  generateDirection();
  //     }
  //
  //     if ((direction > 0) && (max_range >= sum + number)) {
  //         result.push(number);
  //         sum += number;
  //     } else if ((direction < 0) && (sum - number >= 0)) {
  //         result.push(-1 * number);
  //         sum -= number
  //     }
  //
  // }
  // console.log(result, "=", sum);
  // return

  // outer: while (result.length < config.length) {
  //     let number = parseInt(getRandomArbitrary(min_range_number, max_range_number));
  //     let work_number = number;
  //     let direction = generateDirection();
  //     stage = structuredClone(state);
  //     for (let i = config.level - 1; i >= 0; i--) {
  //         if (work_number === 0) {
  //             continue;
  //         }
  //         const position = Math.pow(10, i);
  //         const the_number = parseInt(div(work_number, position));
  //         if (the_number < 1) {
  //             continue;
  //         }
  //         const value = the_number * position;
  //         work_number -= value;
  //         const {status, hand} = parse_number_level_1(stage[i], value, direction);
  //         stage[i] = hand;
  //         switch (status) {
  //             case "Invalid":
  //                 continue outer;
  //             default:
  //                 break;
  //         }
  //     }
  //     if (direction === 0) {
  //         continue
  //     }
  //     state = structuredClone(stage);
  //     number *= direction;
  //     sum += number;
  //     result.push(number);
  // }
  // // console.log("---------------Config-----------------");
  // // console.log(config);
  // // console.log("---------------Board-----------------");
  // // console.log(app.state.availabelHandes);
  // // console.log("--------------Result-----------------");
  // console.log(result, "=", sum);
  // console.log("-------------------------------------");
}

export function level_1() {
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
  let config = { length: 9, level: 1 };
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
    stage = JSON.parse(JSON.stringify(state));
    number *= direction;
    sum += number;
    result.push(number);
  }
  console.log('dsadsad', result, '=', sum);
  console.log('-------------------------------------');
}
