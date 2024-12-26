const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function analyzeReport(results) {
  try {
    const prompt = `Analyze the following blood test results and provide a comprehensive interpretation:
    Hemoglobin: ${results.hemoglobin}
    White Blood Cells: ${results.whiteBloodCells}
    Red Blood Cells: ${results.redBloodCells}
    Platelets: ${results.platelets}`;

    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('AI Analysis Error:', error);
    throw new Error('Failed to analyze report');
  }
}

module.exports = analyzeReport; 