var data = [
    {
        name: "Tyrion Lannister",
        birthday: "12/02/1996"
    }, {
        name: "Cersei Lannister",
        birthday: "11/02/1996"
    }, {
        name: "Daenerys Targaryen",
        birthday: "11/24/1991"
    }, {
        name: "Arya Stark",
        birthday: "11/25/1996"
    }, {
        name: "Jon Snow",
        birthday: "12/03/1989"
    }, {
        name: "Sansa Stark",
        birthday: "15/08/1992"
    }, {
        name: "Jorah Mormont",
        birthday: "12/16/1968"
    }, {
        name: "Jaime Lannister",
        birthday: "12/06/1975"
    }, {
        name: "Sandor Clegane",
        birthday: "11/07/1969"
    }, {
        name: "Tywin Lannister",
        birthday: "10/12/1951"
    }, {
        name: "Theon Greyjoy",
        birthday: "12/31/1989"
    }, {
        name: "Samwell Tarly",
        birthday: "12/07/1990"
    }, {
        name: "Joffrey Baratheon",
        birthday: "06/12/1992"
    }, {
        name: "Catelyn Stark",
        birthday: "12/03/1962"
    }, {
        name: "Bran Stark",
        birthday: "12/02/1995"
    }, {
        name: "Petyr Baelish",
        birthday: "11/20/1974"
    }, {
        name: "Robb Stark",
        birthday: "11/28/1986"
    }, {
        name: "Brienne of Tarth",
        birthday: "11/27/1985"
    }, {
        name: "Margaery Tyrell",
        birthday: "12/02/1989"
    }, {
        name: "Stannis Baratheon",
        birthday: "09/14/1971"
    }, {
        name: "Davos Seaworth",
        birthday: "02/13/1973"
    }, {
        name: "Tormund Giantsbane",
        birthday: "12/14/1974"
    }, {
        name: "Jeor Mormont",
        birthday: "11/01/1955"
    }, {
        name: "Eddard Stark",
        birthday: "12/02/1963"
    }, {
        name: "Khal Drogo",
        birthday: "12/05/1980"
    }, {
        name: "Ramsay Bolton",
        birthday: "12/05/1976"
    }, {
        name: "Robert Baratheon",
        birthday: "12/02/1965"
    }, {
        name: "Daario Naharis",
        birthday: "12/02/1985"
    }, {
        name: "Viserys Targaryen",
        birthday: "12/06/1984"
    }
]

showData();
createWeekCards();
var birthdays = [0,0,0,0,0,0,0] // initially showing no ones birthdays

function showData() {
    let myData = JSON.stringify(data, undefined, data.length);
    document.getElementById('data').innerHTML = myData;
}

function createWeekCards() {
    let weekCard, weekName, weekNameText, birthdayCard;
    let weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    for (i = 0; i < 7; i++) {

        weekCard = document.createElement("div");  
        weekCard.id = i;
        weekCard.className = "weekcard";

        //making weekname div (upper div of weekcard)
        weekName = document.createElement("div");
        weekName.className = "weekName";
        weekNameText = document.createElement("h3");
        weekNameText.className = "weekNameText";        
        weekNameText.append(weekDay[i]);  
        weekName.append(weekNameText);
        weekCard.append(weekName);

        //making weekname div (upper div of weekcard)
        birthdayCard = document.createElement("div");
        birthdayCard.className = "birthdayCard";
        weekCard.append(birthdayCard);   

        document.getElementById("main").appendChild(weekCard);
    }
}

function onClickUpdate() {
    let currentInput = ""
    let inputVal = document.getElementById("myInput").value;
    if(currentInput != inputVal) currentInput = inputVal;
    else return;
    birthdays = birthdays.map(_ => 0)
    let bdays_found = data.filter(d => d.birthday.includes(inputVal))
    // console.log(bdays_found)
    updateCards(bdays_found)
}

function updateCards(bdays_found) {
    
    let birthdayDiv;
    let squareSize = ["sq1", "sq2", "sq3", "sq4"]
    bdays_found.map(d => {
        let birthDate = new Date(d.birthday);
        let weekDay = birthDate.getDay()
        // console.log(weekDay); // 1 , 6, 1 

        //updating birthdays for the cards that has to be updated
        
        if(birthdays[weekDay]==0) { 
            let list = [] // iif no previous element is there creating a new list
            list.push(d) // ad pushing that person's bday
            birthdays[weekDay] = list; 
        } else {
            birthdays[weekDay].push(d) // else push new element to the previous one
            birthdays[weekDay].sort((a, b) => a.name.localeCompare(b.name)); // sort on the basis of name
        }  
    })

    // console.log(birthdays);  //[0,[{"",""}], 0, 0, 0 ,[{""}]]
    birthdays.map((val,idx)=> { //mapping it to 
        
            let card = document.getElementById(idx) //getting weekcard from its index
            // console.log(card);
            birthdayDiv = card.childNodes.item(1) //  getting 1st child of weekcard(div where squares will be shown) 
            // console.log(birthdayDiv);
            
            while (birthdayDiv.firstChild) {
                birthdayDiv.removeChild(birthdayDiv.firstChild);
            }

        if (val != 0) {
            val.map(a => {
                let initials = getInitials(a.name);
                // console.log(initials);
                renderPerson(birthdayDiv, squareSize[val.length - 1], initials) //passing div that needs to be updated, type of sqr siz and initials
            });
        } else {
            //render ot found div
            let div = document.createElement("div");
            div.className = "not_found"
            div.append("__")
            birthdayDiv.appendChild(div);
            // console.log(birthdayDiv);
        }
    })
}

const getInitials = string => {
    const names = string.split(' ');
    const initials = names.map(name => name.charAt(0).toUpperCase())
    if (initials.length > 1) {
        return `${initials[0]}${initials[initials.length - 1]}`;
    } else {
        return initials[0];
    }
};

function renderPerson(birthdayDiv, square, name) {
    //creating a square for a Person
    let bdcard = document.createElement("div");
    bdcard.className = square;
    bdcard.style.background = generateRandomColor();

    //creating a span element for name 
    let bdcardText = document.createElement("span");
    bdcardText.className = "bdcardText"

    bdcardText.append(name); 
    bdcard.append(bdcardText);
    birthdayDiv.append(bdcard);
}

function  generateRandomColor() {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    let color = "rgb(" + x + "," + y + "," + z + ")";
    // console.log(color);
    return color;
}

