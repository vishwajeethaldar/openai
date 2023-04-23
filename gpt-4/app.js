
const API_KEY = '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'
async function fetchData(){
    try {
        const reaponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method:"POST",
        headers: {
            Authorization:`Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(
            {
              "model": "gpt-3.5-turbo",
              "messages": [{"role": "user", "content": "Hello!"}]
            }
        )
    });
        const data = await reaponse.json();
        console.log(data, 'data');
        return data;
    } catch (error) {
        console.log(error)
    }
} 

fetchData();

// console.log(fetchData())