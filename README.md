# AI Article Summarizer

<img style="width:100%; height:auto" src="https://github.com/user-attachments/assets/39e021f2-4e86-46da-af89-3d857058cdd5" />
<img style="width:100%; height:auto" src="https://github.com/user-attachments/assets/0a143195-6061-4216-becf-955e44700fb1" />
<img style="width:100%; height:auto" src="https://github.com/user-attachments/assets/60ec43a0-7ae5-4082-b110-c067f2a5f92b" />
<img style="width:100%; height:auto" src="https://github.com/user-attachments/assets/8d54f228-726f-4b3d-a5c9-292fc1e9bdfe" />


A modern, responsive web application that uses Google Gemini AI to summarize articles and text content with multiple output styles and advanced features.

## Features

### AI-Powered Summarization
- **Google Gemini Integration**: Powered by Google's advanced AI model
- **Multiple Styles**: Short, Detailed, Bullet Points, and Casual summaries
- **URL Processing**: Automatically extracts text from web articles
- **Manual Input**: Paste text directly for summarization

### Advanced Features
- **Rephrase Options**: Formal, Casual, Tweet-style, and Detailed rephrasing
- **Keyword Extraction**: Automatically extracts key topics
- **Command Palette**: Quick actions with ⌘K / Ctrl+K
- **Recent History**: View and manage previous summaries
- **Modal Views**: Detailed summary viewing with blur backdrop
- **Copy to Clipboard**: One-click summary copying
- **API Integration**: Direct links to summary endpoints

## Tech Stack

### Frontend
- **Angular v19**: Modern Angular with signals and control flow
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe development
- **Standalone Components**: Modular architecture

### Backend
- **Node.js**: Server runtime
- **Express.js**: Web framework
- **Google Gemini API**: AI summarization
- **Cheerio**: Web scraping for URL content

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shaban-Eissa/Gemini-Summarizer
   cd Gemini-Summarizer
   ```

2. **Install dependencies**
   ```bash
   # Server dependencies
   cd server
   npm install
   
   # Client dependencies
   cd client
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Create .env file in server directory with Gemini API Key from https://aistudio.google.com/api-keys
   echo "GEMINI_API_KEY=your_api_key_here" > .env 
   ```

4. **Start the application**
   ```bash
   # Start server
   cd server
   npm start
   
   # Start client
   cd client
   ng serve
   ```

## Usage

1. **Enter Content**: Paste a URL or text directly
2. **Choose Style**: Select from Short, Detailed, Bullet Points, or Casual
3. **Generate**: Click generate to create your summary
4. **Interact**: Use rephrase options, copy, or view in API
5. **History**: Access previous summaries from the recent list

### Keyboard Shortcuts
- **⌘K / Ctrl+K**: Open command palette
- **Enter**: Execute command palette actions

## Architecture

### Component Structure
```
src/app/
├── components/
│   ├── form-card.component.ts      # Input form
│   ├── summary-card.component.ts   # Summary display
│   ├── recent-list.component.ts    # History management
│   ├── command-palette.component.ts # Quick actions
│   ├── summary-modal.component.ts   # Detailed view
│   ├── toast.component.ts          # Notifications
│   ├── header-bar.component.ts     # App header
│   └── footer-bar.component.ts     # App footer
├── services/
│   └── summary.service.ts          # API integration
└── app.component.ts                 # Main app logic
```

### API Endpoints
- `POST /api/summarize` - Generate summary
- `GET /api/history` - Get summary history
- `GET /api/summary/:id` - Get specific summary
- `POST /api/rephrase` - Rephrase text
- `POST /api/keywords` - Extract keywords

## Key Features Explained

### Modern Angular Patterns
- **Signals**: Reactive state management
- **Control Flow**: `@if`, `@for` instead of `*ngIf`, `*ngFor`
- **Input/Output**: `input()`, `output()` functions
- **Dependency Injection**: `inject()` function

## Development
### Modern Practices
- **Component Composition**: Reusable, modular components
- **Signal-based State**: Reactive programming
- **Template Syntax**: Modern Angular template features
- **Service Architecture**: Clean separation of concerns


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

**Built with ❤️ using Angular, Tailwind CSS, and Google Gemini AI**
