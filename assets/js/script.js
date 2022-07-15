document.querySelector('.busca').addEventListener('submit', async (e) => {
    e.preventDefault();

    let input = document.querySelector('#searchInput').value;
    let uf = input.split(',');


    if (input !== '') {
        clearInfo();
        showWarning('<img id="loading" src="assets/images/loading.svg" alt="loading"> Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)},${uf[1]}&appid=9bf3f22949a42c3fff5779f5adc01e74&units=metric&lang=pt_br`;
        let results = await fetch(url);
        let json = await results.json();

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min,
                tempIcon: json.weather[0].icon,
                tempDescription: json.weather[0].description,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning("<i class='fas fa-exclamation-triangle' style='font-size:35px;color:yellow'></i> Não foi possível localizar.");
        }
    } else {
        clearInfo();
    }
});

const showInfo = (json) => {
    showWarning('');


    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.temperatura').innerHTML = `${json.temp.toFixed(0)} <sup>ºC</sup>`;
    document.querySelector('.tmin').innerHTML = `Mín ${json.tempMin.toFixed(0)}. <sup>ºC</sup>`;
    document.querySelector('.tmax').innerHTML = `Máx: ${json.tempMax.toFixed(0)} <sup>ºC</sup>`;
    document.querySelector('.velocidade').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector('.itemd img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('.nuvensdesc').innerHTML = `${json.tempDescription[0].toUpperCase() + json.tempDescription.substring(1)}`;

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;
    document.querySelector('.ventodesc').innerHTML = `${json.windAngle}<sup>o</sup> ${orientationAng(json.windAngle)}`;

    document.querySelector('.resultado').style.display = 'flex';
}

const orientationAng = (angulo) => {
    if ((angulo === 0) || (angulo === 360) || (angulo > 0) && (angulo < 45)) {
        return "Norte";
    } else if ((angulo > 315) && (angulo < 360)) {
        return "Norte";
    } else if ((angulo > 45) && (angulo < 135) || (angulo === 90)) {
        return "Leste";
    } else if ((angulo === 180) || (angulo > 135) && (angulo < 225)) {
        return "Sul";
    } else if ((angulo === 270) || (angulo > 225) && (angulo < 315)) {
        return "Oeste";
    }

    if (angulo === 45) {
        return "Nordeste";
    }
    if (angulo === 135) {
        return "Sudeste";
    }
    if (angulo === 225) {
        return "Sudoeste";
    }
    if (angulo === 315) {
        return "Noroeste";
    }
}

const clearInfo = () => {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

const showWarning = (msg) => {
    document.querySelector('.aviso').innerHTML = msg;
}