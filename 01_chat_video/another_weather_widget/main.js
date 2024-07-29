//import OpenAI from "openai";

//const openai=new OpenAI({})

console.log (process.env)
const apiKey = process.env.OPEN_WEATHER_API_KEY;

async function getCurrentLocation() {
    fetch("http://ipapi.co/json/")
        .then((response) => response.json())
        .then((data) => {
            // store the data in a variable of our choosing
            let current_weather_data = data;
            // log the data to the browser console
            console.log(current_weather_data);
            // The return statement allows the getCurrentWeather() function to produce output that can be used elsewhere in the program.
            // return current_weather_data
    })
}

async function getCurrentLocation(latitude, longitude) {

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        // store the data in a variable of our choosing
        let current_weather_data = data;
        // log the data to the browser console
        console.log(current_weather_data);
        // The return statement allows the getCurrentWeather() function to produce output that can be used elsewhere in the program.
        return current_weather_data
});
}

const tools = [
    {
  type: "function",
  function: {
    name: "getCurrentWeather",
    description: "Get the current weather in a given location",
    parameters: {
      type: "object",
      properties: {
        latitude: {
          type: "string",
        },
        longitude: {
          type: "string",
        },
      },
      required: ["longitude", "latitude"],
    },
  }
},
{
  type: "function",
  function: {
    name: "getCurrentLocation",
    description: "Get the current location based on IP address",
    parameters: {
      type: "object",
      properties: {},
    },
  }
},
];

const messages = [
    {
      role: "system",
      content:
        "You are a helpful assistant. Only use the functions you have been provided with.",
    },
  ];

  async function agent(userInput) {
    messages.push({
      role: "user",
      content: userInput,
    });
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
      tools: tools,
    });
    console.log(response);
  }

  agent("Where am I currently located?")