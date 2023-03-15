const generateAction = async (req, res) => {
    console.log('Received request');

    const input = JSON.parse(req.body).input;

    const response = await fetch(
        `https://api-inference.huggingface.co/models/Haaniya-Iram17/Haaniya-Iram17/sd-1-5-hira`,
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_AUTH_KEY}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            inputs: input,
          }),
        }
      );
  };


  export default generateAction;