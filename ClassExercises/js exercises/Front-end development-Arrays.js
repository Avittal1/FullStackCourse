const data = [ 
    { 
        name: "John", 
        birthday: "1-1-1995", 
        favoriteFoods: { 
            meats: ["hamburgers", "sausages"], 
            fish: ["salmon", "pike"], 
        }, 
    }, 
    { 
        name: "Mark", 
        birthday: "10-5-1980", 
        favoriteFoods: { 
            meats: ["hamburgers", "steak", "lamb"], 
            fish: ["tuna", "salmon", "barracuda"], 
        }, 
    }, 
    { 
        name: "Mary", 
        birthday: "1-10-1977", 
        favoriteFoods: { 
            meats: ["cow", "chicken"], 
            fish: ["pike"], 
        },
    }, 
    { 
        name: "Thomas", 
        birthday: "1-10-1990", 
        favoriteFoods: { 
            meats: ["bird", "rooster"], 
            fish: ["salmon"], 
        }, 
    }, 
    { 
        name: "Mary", 
        birthday: "1-10-1977", 
        favoriteFoods: { 
            meats: ["hamburgers", "lamb"], 
            fish: ["bass", "tuna"], 
        }, 
    }, 
];

function allNames(dataArr){
    return dataArr.map(person => person.name);
}

function bornBefore1990(dataArr) {
    return dataArr.filter(person => {
        const year = Number(person.birthday.split('-')[2]);
        return year < 1990;
    });
}

function countFoods(dataArr){
    const foodCount = {};

    dataArr.forEach(person => {
        person.favoriteFoods.meats.forEach(meat => {
            if (foodCount[meat]) {
                foodCount[meat]++;
            } else {
                foodCount[meat] = 1;
            }
        });

        person.favoriteFoods.fish.forEach(fishItem => {
            if (foodCount[fishItem]) {
                foodCount[fishItem]++;
            } else {
                foodCount[fishItem] = 1;
            }
        });
    });

    return foodCount;
}