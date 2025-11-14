# AI Learning Assistant - Chatbot Application

A beautiful, modern chatbot application designed for rural students to enhance their learning experience. This project uses HTML, CSS, and JavaScript with integration to open-source AI APIs.

## Features

- 🤖 **AI-Powered Chatbot**: Get intelligent responses to your study questions
- 🎨 **Modern UI**: Beautiful, responsive design that works on all devices
- 📚 **Educational Focus**: Designed specifically for students in rural areas
- 🔓 **Multiple AI APIs**: Supports Groq (free), OpenAI, Anthropic, Google Gemini, and Together AI
- 💾 **Local Storage**: Saves your API key securely in your browser
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- An internet connection
- (Optional) A Hugging Face account for API access

### Installation

1. Download or clone this project
2. (Optional) Copy `config.example.js` to `config.js` and configure your API settings
3. Open `index.html` in your web browser
4. That's it! The chatbot is ready to use

### Using the API (Optional)

For the best AI-powered responses, you can use one of the supported AI APIs. **We recommend Groq** as it offers a generous free tier and is very fast.

#### Supported AI Providers

1. **Groq** (Recommended - Free tier available) - Fast and free
2. **OpenAI** - GPT-3.5-turbo, GPT-4
3. **Anthropic** - Claude 3 models
4. **Google Gemini** - Free tier available
5. **Together AI** - Open-source models

#### Option 1: Configure in Code (Recommended for Development)

1. Copy `config.example.js` to `config.js`
2. Choose your provider and get an API key:
   - **Groq (Recommended)**: https://console.groq.com/keys (Free)
   - **OpenAI**: https://platform.openai.com/api-keys
   - **Anthropic**: https://console.anthropic.com/
   - **Google Gemini**: https://makersuite.google.com/app/apikey (Free)
   - **Together AI**: https://api.together.xyz/
3. Open `config.js` and:
   - Set the `provider` field (e.g., `'groq'`)
   - Paste your API key in the corresponding provider's `apiKey` field:
     ```javascript
     provider: 'groq',
     groq: {
         apiKey: 'your-api-key-here',
         // ...
     }
     ```
4. You can also customize the model and API parameters in `config.js`

**Note**: Never commit `config.js` with your actual API key to version control!

#### Option 2: Use the UI

1. Get an API key from one of the providers above
2. Paste the token in the API key field at the bottom of the chat interface
3. Click "Save"

**Note**: The chatbot works in demo mode without an API key, but responses will be more limited.

## Project Structure

```
ai-learning-chatbot/
│
├── index.html          # Main HTML structure
├── styles.css          # Styling and responsive design
├── script.js           # Chatbot logic and API integration
├── config.js           # AI API configuration (create from config.example.js)
├── config.example.js   # Example configuration template
└── README.md           # This file
```

## How It Works

1. **User Input**: Students type their questions in the chat input
2. **API Request**: The application sends the question to the selected AI API provider
3. **AI Response**: The API processes the question and returns an intelligent answer
4. **Display**: The response is displayed in a user-friendly chat interface

## Customization

### Configuring AI API Settings

All AI API configuration is managed through `config.js`. Edit this file to customize:

- **Provider**: Choose which AI API to use (`groq`, `openai`, `anthropic`, `google`, `together`)
- **API Key**: Set your API key for the selected provider
- **Model**: Choose which AI model to use
- **API Parameters**: Adjust `temperature` and `max_tokens`

Example configuration in `config.js` (using Groq):

```javascript
provider: 'groq',
groq: {
    apiKey: 'your-api-key-here',
    model: 'llama-3.1-8b-instant',
    temperature: 0.7,
    max_tokens: 1024
}
```

### Changing the AI Provider and Model

In `config.js`, you can change the provider and model:

```javascript
provider: 'groq', // Change to 'openai', 'anthropic', 'google', or 'together'

groq: {
    model: 'llama-3.1-8b-instant', // Change to other Groq models
    // Available: 'llama-3.1-8b-instant', 'llama-3.1-70b-versatile', 'mixtral-8x7b-32768'
}

openai: {
    model: 'gpt-3.5-turbo', // Change to 'gpt-4', 'gpt-4-turbo', etc.
}

anthropic: {
    model: 'claude-3-haiku-20240307', // Change to 'claude-3-sonnet-20240229', etc.
}
```

### Styling

Modify `styles.css` to customize:
- Colors and gradients
- Fonts and typography
- Layout and spacing
- Animations

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Limitations

- Demo mode provides basic responses
- API rate limits may apply on free tier
- Requires internet connection for API calls

## Future Enhancements

- Support for multiple languages
- Subject-specific learning modules
- Progress tracking
- Offline mode with local AI models
- Voice input/output

## License

This project is open source and available for educational purposes.

## Support

For issues or questions:
1. Check the API documentation for your selected provider
2. Verify your API key is correct in `config.js`
3. Check browser console for error messages
4. Make sure the `provider` field in `config.js` matches your API key

## Contributing

Feel free to fork this project and make it your own! Some ideas:
- Add more educational features
- Improve the UI/UX
- Add support for more AI models
- Create subject-specific chatbots

---

**Made with ❤️ for rural students**

