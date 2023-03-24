let input = document.createElement('input');
let form = document.createElement('form');
let label = document.createElement('label');
let button = document.createElement('button');
button.type = 'submit';
button.innerHTML = 'Afficher la météo';
let week = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
let month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
label.for = "meteo";
label.innerHTML = "Saisissez votre ville :";
input.type = 'text';
input.id = 'meteo';
input.className = 'meteo';
form.appendChild(label);
form.appendChild(input);
form.appendChild(button);
function formAffiche() {
    document.body.appendChild(form);
}
formAffiche();
function clearBody() {
    console.log(document.querySelectorAll('div'))
    document.body.removeChild(document.querySelector('div'));
    document.body.removeChild(document.querySelector('div'));
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // let meteo = fetch(`api.openweathermap.org/data/2.5/weather?id=${input.value.charAt(0).toUpperCase() + input.value.slice(1)},uk&APPID=01ada84814cabcf30b8e05a48b3295fc`);
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}?unitGroup=metric&key=8MA8ABG7RUKR6DFQU8D8S6VZ6&contentType=json`)
    .then(function(response){
        if(response.ok) {
            response.json().then(data => afficher(data));
        }
        else {
            let errormessage = document.createElement('p');
            errormessage.innerHTML = "<p class='error'> Impossible d'obtenir les prévisions pour la ville saisie. </p>";
            document.body.append(errormessage);
        }
    } )
    .catch(error => {
        console.log(error);
        let errormessage = document.createElement('p');
        errormessage.innerHTML = "<p> Impossible d'obtenir les prévisions pour la ville saisie. </p>";
        document.body.append(errormessage);
    });
});

function afficher(data){
    if(document.querySelectorAll('div').length>0){
        clearBody();
    }
    let div = document.createElement('div');
    div.className = "prevision";
    let content = data.currentConditions;
    console.log(data);
    console.log(content);
    let location = document.createElement('h2');
    location.innerHTML = data.resolvedAddress;
    let time = document.createElement('p');
    time.innerHTML = `Dernier relevé de température à : ${content.datetime}`;
    let weather = document.createElement('p');
    weather.innerHTML = `Les conditions météos étaient : ${content.conditions}`;
    let humidity = document.createElement('p');
    humidity.innerHTML = `L'humidité était de : ${content.humidity}%`;
    let temperature = document.createElement('p'); 
    temperature.innerHTML = `La température était de : ${content.temp}°C`;
    div.append(location);
    div.append(time);
    div.append(weather);
    div.append(humidity);
    div.append(temperature);
    document.body.append(div);
    let div2 = document.createElement('div');
    div2.className = 'prevision semaine';
    div2.innerHTML = '<h2>Températures prévisionnelles pour les 15 prochains jours.</h2>'
    let hebdo = Object.values(data.days);
    hebdo.map(el => {
        let div3 = document.createElement('div');
        let date = new Date(el.datetime);
        div3.innerHTML = `<h3>${week[date.getDay()]} ${date.getDate()} ${month[date.getMonth()]}</h3><p>Température maximale : ${el.tempmax}</p><p>Température minimale : ${el.tempmin}</p><p>Température moyenne : ${el.temp}</p>`
        div2.append(div3);
    });
    document.body.append(div2);
}