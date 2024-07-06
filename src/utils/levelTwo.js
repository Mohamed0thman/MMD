

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function generateDirection() {
    return Math.random() < 0.5 ? -1 : 1;
}



export function levelTwo(length, level) {
   
    let config = { length, level };
    const result = [];
    let sum = 0;
    const max_range_number = Math.pow(10, config.level);
    const min_range_number = Math.pow(10, (config.level - 1));
    while (result.length < config.length) {
        let number = parseInt(getRandomArbitrary(min_range_number, max_range_number));
        let direction = generateDirection();
        if (direction < 0 && sum - number < 0) {
            continue
        }
        number *= direction;
        sum += number;
        result.push(number);
    }
    console.log(result, "=", sum);
    console.log("-------------------------------------");
    return { result, sum };

}

