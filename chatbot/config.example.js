// ============================================
// AI API Configuration File - EXAMPLE TEMPLATE
// ============================================
// Copy this file to config.js and update with your actual values.
// DO NOT commit config.js with your actual API keys to version control!
// ============================================

const AIConfig = {
    // Select which API provider to use
    // Options: 'groq', 'openai', 'anthropic', 'google', 'together'
    provider: 'groq',
    
    // Groq API Configuration (Free tier available - Recommended)
    // Get your free API key from: https://console.groq.com/keys
    groq: {
        apiKey: '',
        baseUrl: 'https://api.groq.com/openai/v1',
        model: 'llama-3.1-8b-instant', // Fast and free
        // Available models: 'llama-3.1-8b-instant', 'llama-3.1-70b-versatile', 'mixtral-8x7b-32768'
        temperature: 0.7,
        max_tokens: 1024
    },
    
    // OpenAI API Configuration
    // Get your API key from: https://platform.openai.com/api-keys
    openai: {
        apiKey: '',
        baseUrl: 'https://api.openai.com/v1',
        model: 'gpt-3.5-turbo', // or 'gpt-4', 'gpt-4-turbo'
        temperature: 0.7,
        max_tokens: 1000
    },
    
    // Anthropic Claude API Configuration
    // Get your API key from: https://console.anthropic.com/
    anthropic: {
        apiKey: '',
        baseUrl: 'https://api.anthropic.com/v1',
        model: 'claude-3-haiku-20240307', // Fast and affordable
        // Available models: 'claude-3-haiku-20240307', 'claude-3-sonnet-20240229', 'claude-3-opus-20240229'
        temperature: 0.7,
        max_tokens: 1024
    },
    
    // Google Gemini API Configuration
    // Get your API key from: https://makersuite.google.com/app/apikey
    google: {
        apiKey: '',
        baseUrl: 'https://generativelanguage.googleapis.com/v1',
        model: 'gemini-pro', // or 'gemini-pro-vision'
        temperature: 0.7,
        maxOutputTokens: 1024
    },
    
    // Together AI Configuration
    // Get your API key from: https://api.together.xyz/
    together: {
        apiKey: '',
        baseUrl: 'https://api.together.xyz/v1',
        model: 'meta-llama/Llama-3-8b-chat-hf',
        temperature: 0.7,
        max_tokens: 1024
    }
};

// ============================================
// Export configuration
// ============================================
// This makes the config available to other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIConfig;
}

