const apiKey = '2aeb2ae7b5523b8ec68c803dfe74fe29'


        async function getWeather() {
            const city = document.getElementById('cityInput').value
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`


            try {
                // Await with Fecth
                const response = await fetch(url)
                // if the response is not ok will throw an HTTP error
                if (!response.ok) {
                    // throw in async/await context
                    throw new Error(`HTTP error! Status: ${response.status}`);

                }
                // Destructuring JSON Response
                const data = await response.json();
                displayWeather(data)

            } catch (error) {
                console.error('Failed to feth weather data: ', error);
                alert('Failed to feth weather data')
            }
        }

        function displayWeather(data) {
            // Destructuring data for easier access to nested data
            const { main: { temp, humidity }, weather, wind: { speed }, sys: { country }, name } = data
            // Nested destructuring
            const [{ main: weatherMain, description, icon }] = weather

            // Const for DOM Manupulation
            const weatherDisplay = document.getElementById('weatherDisplay')
            if (data.cod !== 200) {
                weatherDisplay.innerHTML = `<p>Error: ${data.message}</p>`;
                return;
            }

            // Template literals for HTML Generation

            const weatherHTML = `
        <h2>Weather in ${name},${country}</h2>
        <p>Temprature: ${temp}°C</p>
        <p>Weather: ${weatherMain} (${description})</p>
        <p>Humidity: ${humidity}%<p/>
        <p>Speed: ${speed}m/s<p/>
        `;
            weatherDisplay.innerHTML = weatherHTML

        }
