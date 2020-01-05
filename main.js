var data = [
  {
    name: "Tyrion Lannister",
    birthday: "12/02/1996"
  },
  {
    name: "Cersei Lannister",
    birthday: "11/02/1996"
  },
  {
    name: "Daenerys Targaryen",
    birthday: "11/24/1991"
  },
  {
    name: "Arya Stark",
    birthday: "11/25/1996"
  },
  {
    name: "Jon Snow",
    birthday: "12/03/1989"
  },
  {
    name: "Sansa Stark",
    birthday: "15/08/1992"
  },
  {
    name: "Jorah Mormont",
    birthday: "12/16/1968"
  },
  {
    name: "Jaime Lannister",
    birthday: "12/06/1975"
  },
  {
    name: "Sandor Clegane",
    birthday: "11/07/1969"
  },
  {
    name: "Tywin Lannister",
    birthday: "10/12/1951"
  },
  {
    name: "Theon Greyjoy",
    birthday: "12/31/1989"
  },
  {
    name: "Samwell Tarly",
    birthday: "12/07/1990"
  },
  {
    name: "Joffrey Baratheon",
    birthday: "06/12/1992"
  },
  {
    name: "Catelyn Stark",
    birthday: "12/03/1962"
  },
  {
    name: "Bran Stark",
    birthday: "12/02/1995"
  },
  {
    name: "Petyr Baelish",
    birthday: "11/20/1974"
  },
  {
    name: "Robb Stark",
    birthday: "11/28/1986"
  },
  {
    name: "Brienne of Tarth",
    birthday: "11/27/1985"
  },
  {
    name: "Margaery Tyrell",
    birthday: "12/02/1989"
  },
  {
    name: "Stannis Baratheon",
    birthday: "09/14/1971"
  },
  {
    name: "Davos Seaworth",
    birthday: "02/13/1973"
  },
  {
    name: "Tormund Giantsbane",
    birthday: "12/14/1974"
  },
  {
    name: "Jeor Mormont",
    birthday: "11/01/1955"
  },
  {
    name: "Eddard Stark",
    birthday: "12/02/1963"
  },
  {
    name: "Khal Drogo",
    birthday: "12/05/1980"
  },
  {
    name: "Ramsay Bolton",
    birthday: "12/05/1976"
  },
  {
    name: "Robert Baratheon",
    birthday: "12/02/1965"
  },
  {
    name: "Daario Naharis",
    birthday: "12/02/1985"
  },
  {
    name: "Viserys Targaryen",
    birthday: "12/06/1984"
  }
];

var birthdaysByDay = [0, 0, 0, 0, 0, 0, 0]; // initialize birthdays per day as 0
let squareSize = ["sq1", "sq2", "sq3", "sq4"]; // styling to be used to display squares
let currentInput = ""; // to store input by user

showData();
createWeekCards();

//SHOW JSON DATA IN TEXTAREA
function showData() {
  let myData = JSON.stringify(data, undefined, data.length);
  document.getElementById("data").innerHTML = myData;
}

//CREATE WEEKCARDS FOR 7 DAYS
function createWeekCards() {
  let weekCard, weekName, weekNameText, birthdayCard;
  let weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

//ON CLICKING UPDATE BUTTON
function onClickUpdate() {
  event.preventDefault();
  event.stopPropagation();
  let inputVal = document.getElementById("myInput").value;
  if (currentInput != inputVal) currentInput = inputVal;
  else return;
  birthdaysByDay = birthdaysByDay.map(_ => 0);
  let birthdaysFound = data.filter(d => d.birthday.includes(inputVal));
  updateCards(birthdaysFound);
}

//UPDATE WEEKCARDS ON INPUT
function updateCards(birthdaysFound) {
  //adding new key birthdate to object
  birthdaysFound = updateBirthdaysFound(birthdaysFound);
  createBirthdaysList(birthdaysFound);

  //sorting on the basis of age(birthDate)
  birthdaysByDay = sortBirthdaysByAge(birthdaysByDay);
  displaySquares();
}

//ADDING NEW KEY "BIRTHDATE" IN BIRTHDAYSFOUND TO FIND AGE
function updateBirthdaysFound(birthdaysFound) {
  const newBirthdaysFound = birthdaysFound.map(birthDay => {
    let newBirthDay = birthDay;
    let birthDate = new Date(birthDay.birthday);
    newBirthDay["birthDate"] = birthDate;
    return newBirthDay;
  });
  return newBirthdaysFound;
}

//CREATING LIST OF PERSONS' BIRTHDAY AFTER ADDING NEW KEY
function createBirthdaysList(birthdaysFound) {
  birthdaysFound.forEach(birthday => {
    //getting day of week
    let weekDay = birthday.birthDate.getDay();

    if (birthdaysByDay[weekDay] === 0) {
      //updating birthdays for the cards that has to be updated
      let list = []; // creating a new list if no previous element is there
      list.push(birthday); // and pushing that person's bday
      birthdaysByDay[weekDay] = list;
    } else {
      birthdaysByDay[weekDay].push(birthday); // else push new element to the previous one
    }
  });
}

//SORTING LIST ON THE BASIS OF AGE
function sortBirthdaysByAge(birthdays) {
  return birthdays.map(birthday => {
    const newBirthDay =
      birthday === 0
        ? birthday
        : birthday.sort((a, b) => a.birthDate < b.birthDate);
    return newBirthDay;
  });
}

//DISPLAYING SQUARES IN WEEKCARD
function displaySquares() {
  birthdaysByDay.forEach((birthdays, idx) => {
    let card = document.getElementById(idx); //getting weekcard from its index
    birthdayDiv = card.childNodes.item(1); //  getting 1st child of weekcard(div where squares will be shown)

    // remove old children from birthday card
    while (birthdayDiv.firstChild) {
      birthdayDiv.removeChild(birthdayDiv.firstChild);
    }

    if (birthdays !== 0) {
      birthdays.forEach(a => {
        let initials = getInitials(a.name);
        const squareIndex = birthdays.length - 1;
        //passing div that needs to be updated, type of sqr size and initials
        renderPerson(birthdayDiv, squareIndex, initials);
      });
    } else {
      renderDefault();
    }
  });
}

//GET INITIALS FROM NAME
function getInitials(string) {
  const names = string.split(" ");
  const initials = names.map(name => name[0].toUpperCase());
  if (initials.length > 1) {
    return `${initials[0]}${initials[initials.length - 1]}`;
  }
  return initials[0];
}

//RENDER THIS IF NO PERSON BIRTHDAY FOUND
function renderDefault() {
  //render not found div
  let div = document.createElement("div");
  div.className = "not_found";
  div.append("__");
  birthdayDiv.appendChild(div);
}

//RENDER THIS IF PERSON BIRTHDAY FOUND
function renderPerson(birthdayDiv, squareIndex, name) {
  //creating a square for a Person
  let birthdayCard = document.createElement("div");
  birthdayCard.className = squareIndex < 4 ? squareSize[squareIndex] : "sq4";
  birthdayCard.style.background = generateRandomColor();

  //creating a span element for name
  let birthdayCardName = document.createElement("span");
  birthdayCardName.className = "birthdayCardName";

  birthdayCardName.append(name);
  birthdayCard.append(birthdayCardName);
  birthdayDiv.append(birthdayCard);
}

function getRandomColorValue() {
  return Math.floor(Math.random() * 256);
}

//GENERATE RANDOM COLORED SQUARES
function generateRandomColor() {
  const r = getRandomColorValue();
  const g = getRandomColorValue();
  const b = getRandomColorValue();
  return `rgb(${r}, ${g}, ${b})`;
}
