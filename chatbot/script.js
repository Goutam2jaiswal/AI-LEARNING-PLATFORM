// Chatbot Application for AI Learning Website
// Supports multiple AI API providers (Groq, OpenAI, Anthropic, Google, Together AI)
// Configuration is loaded from config.js

class Chatbot {
    constructor() {
        // Load configuration from config.js
        this.provider = AIConfig.provider || 'groq';
        const config = AIConfig[this.provider];
        
        if (!config) {
            console.error(`Provider "${this.provider}" not found in config. Using demo mode.`);
            this.provider = null;
        }
        
        // API key is only loaded from config.js (no UI input)
        this.apiKey = config?.apiKey || '';
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendButton');
        this.chatMessages = document.getElementById('chatMessages');
        this.loading = document.getElementById('loading');
        
        // Load API settings from config
        if (config) {
            this.model = config.model;
            this.baseUrl = config.baseUrl;
            this.temperature = config.temperature || 0.7;
            this.maxTokens = config.max_tokens || config.maxOutputTokens || 1024;
        }
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.sendButton.addEventListener('click', () => this.handleSendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSendMessage();
            }
        });
    }

    async handleSendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        this.userInput.value = '';
        this.setLoading(true);

        try {
            const response = await this.getAIResponse(message);
            this.addMessage(response, 'bot');
        } catch (error) {
            console.error('Error:', error);
            const providerName = this.provider ? this.provider.toUpperCase() : 'AI';
            this.addMessage(
                `I apologize, but I encountered an error. Please check your API key or try again later. ` +
                `Current provider: ${providerName}. Check config.js for API key setup instructions.`,
                'bot'
            );
        } finally {
            this.setLoading(false);
        }
    }

    async getAIResponse(message) {
        // If no API key or provider, use demo responses
        if (!this.apiKey || !this.provider) {
            return this.getDemoResponse(message);
        }

        try {
            let response;
            
            // Route to appropriate API based on provider
            switch (this.provider) {
                case 'groq':
                case 'openai':
                case 'together':
                    response = await this.callOpenAICompatibleAPI(message);
                    break;
                case 'anthropic':
                    response = await this.callAnthropicAPI(message);
                    break;
                case 'google':
                    response = await this.callGoogleAPI(message);
                    break;
                default:
                    return this.getDemoResponse(message);
            }
            
            return response;
        } catch (error) {
            // If API fails, fall back to demo mode
            console.error('API Error:', error);
            return this.getDemoResponse(message);
        }
    }
    
    async callOpenAICompatibleAPI(message) {
        // Works with Groq, OpenAI, and Together AI (OpenAI-compatible)
        const endpoint = this.provider === 'groq' 
            ? `${this.baseUrl}/chat/completions`
            : this.provider === 'together'
            ? `${this.baseUrl}/chat/completions`
            : `${this.baseUrl}/chat/completions`;
        
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: this.model,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful and friendly AI learning assistant for students. Provide clear, educational, and encouraging responses.'
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ],
                temperature: this.temperature,
                max_tokens: this.maxTokens
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0]?.message?.content?.trim() || this.getDemoResponse(message);
    }
    
    async callAnthropicAPI(message) {
        // Anthropic Claude API
        const response = await fetch(`${this.baseUrl}/messages`, {
            method: 'POST',
            headers: {
                'x-api-key': this.apiKey,
                'anthropic-version': '2023-06-01',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: this.model,
                max_tokens: this.maxTokens,
                temperature: this.temperature,
                messages: [
                    {
                        role: 'user',
                        content: message
                    }
                ]
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        return data.content[0]?.text?.trim() || this.getDemoResponse(message);
    }
    
    async callGoogleAPI(message) {
        // Google Gemini API
        const response = await fetch(
            `${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: message
                        }]
                    }],
                    generationConfig: {
                        temperature: this.temperature,
                        maxOutputTokens: this.maxTokens
                    }
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        return data.candidates[0]?.content?.parts[0]?.text?.trim() || this.getDemoResponse(message);
    }

    getDemoResponse(message) {
        // Demo responses for when API is not available
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! I'm here to help you learn. What subject would you like to study today?";
        }
        
        if (lowerMessage.includes('math') || lowerMessage.includes('mathematics')) {
            return "Mathematics is a wonderful subject! I can help you with algebra, geometry, arithmetic, and more. What specific topic would you like to learn about?";
        }
        
        if (lowerMessage.includes('science')) {
            return "Science is fascinating! I can help you understand physics, chemistry, biology, and more. What would you like to explore?";
        }
        
        if (lowerMessage.includes('english') || lowerMessage.includes('language')) {
            return "I'd be happy to help you with English! We can work on grammar, vocabulary, reading comprehension, or writing. What do you need help with?";
        }
        
        if (lowerMessage.includes('history')) {
            return "History helps us understand our past! I can help you learn about different historical periods, events, and figures. What interests you?";
        }
        
        if (lowerMessage.includes('help')) {
            return "I'm here to help you learn! You can ask me questions about any subject, and I'll do my best to explain it clearly. Try asking about math, science, English, or history!";
        }
        
        if (lowerMessage.includes('thank')) {
            return "You're welcome! I'm glad I could help. Feel free to ask me anything else you'd like to learn!";
        }
        
        // Default response
        const providerInfo = this.getProviderInfo();
        return `That's an interesting question about "${message}". To get the best AI-powered answers, please add your ${providerInfo.name} API key in config.js or use the UI above. ${providerInfo.link} For now, I can help you with general study tips and guidance!`;
    }
    
    getProviderInfo() {
        const info = {
            groq: {
                name: 'Groq',
                link: 'Get a free key at https://console.groq.com/keys'
            },
            openai: {
                name: 'OpenAI',
                link: 'Get a key at https://platform.openai.com/api-keys'
            },
            anthropic: {
                name: 'Anthropic',
                link: 'Get a key at https://console.anthropic.com/'
            },
            google: {
                name: 'Google Gemini',
                link: 'Get a free key at https://makersuite.google.com/app/apikey'
            },
            together: {
                name: 'Together AI',
                link: 'Get a key at https://api.together.xyz/'
            }
        };
        return info[this.provider] || { name: 'AI', link: 'Check config.js for setup instructions' };
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'user' ? '👤' : '🤖';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        content.appendChild(paragraph);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showBotMessage(text) {
        this.addMessage(text, 'bot');
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    setLoading(isLoading) {
        this.loading.style.display = isLoading ? 'block' : 'none';
        this.sendButton.disabled = isLoading;
        this.userInput.disabled = isLoading;
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});

