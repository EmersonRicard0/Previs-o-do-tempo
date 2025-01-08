async function fetchWeather() {
    const API_KEY = '9deda4bc2cf94fa486b212313250801'; // Sua chave da WeatherAPI
    const cityInput = document.getElementById('city-input').value.trim(); // Pega o valor digitado no campo de input
    const resultContainer = document.getElementById('result-container'); // Definindo o container de resultados
    resultContainer.innerHTML = '<p>Carregando...</p>'; // Exibe o texto "Carregando..."

    if (!cityInput) {
        resultContainer.innerHTML = '<p style="color: red;">Por favor, insira o nome de uma cidade.</p>';
        return; // Sai da função se o campo estiver vazio
    }

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityInput}&lang=pt`);
        
        if (!response.ok) {
            throw new Error('Erro ao buscar os dados.');
        }

        const data = await response.json();
        const { location, current } = data;

        resultContainer.innerHTML = `
            <div class="weather-card">
                <h2>${location.name}, ${location.region}</h2>
                <p>${current.condition.text}</p>
                <p><strong>Temperatura:</strong> ${current.temp_c}°C</p>
                <img src="https:${current.condition.icon}" alt="Ícone do clima">
            </div>
        `;
    } catch (error) {
        resultContainer.innerHTML = `<p style="color: red;">Erro: ${error.message}</p>`;
    }
}
