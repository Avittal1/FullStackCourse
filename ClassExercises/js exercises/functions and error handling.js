function extractNumbers(arr){
    if (!Array.isArray(arr)) {
        throw new TypeError("Input must be an array");
    }
    return arr.filter(num => typeof num === "number" && !isNaN(num));
}

function sumNumbersSafe(arr){
    try{
        const allNums = extractNumbers(arr);
        const sum = allNums.reduce((acc, num) => acc + num, 0);
        return sum;
    }
    catch{
        console.warn("Invalid input, returns 0");
        return 0;
    }
}

function filterLargeSums(arrList, minTotal){
    if (!Array.isArray(arrList)) {
        throw new TypeError("Input must be an array");
    }
    
    return arrList.filter(subArr => {
        const sum = sumNumbersSafe(subArr);
        return sum >= minTotal;
    });
}

function summaryStats(arrList){
    const validArrays = filterLargeSums(arrList, 10);
    
    return validArrays.map(subArr => {
        const sum = sumNumbersSafe(subArr);
        const validNums = extractNumbers(subArr);
        const average = validNums.length > 0 ? sum / validNums.length : 0;
        
        return { sum, average };
    });
}

function safeCalculator(a, b, operation){
    if (typeof a !== typeof b) {
        throw new TypeError("Arguments must be of the same type");
    }
    
    if (operation === "add") return a + b;
    if (operation === "subtract") return a - b;
    if (operation === "multiply") return a * b;
    if (operation === "divide") {
        if (b === 0) throw new Error("Division by zero");
        return a / b;
    }
    
    throw new Error("Invalid operation");
}