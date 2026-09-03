# Random Joke Generator

A fun and interactive random joke generator that fetches jokes from the **JokeAPI**. Customize your experience with category and type filters, and keep track of your favorite jokes with the built-in history feature.

## 🎉 Features

- **Random Joke Generator**: Get jokes with a single click
- **Multiple Categories**: 
  - General
  - Knock-Knock
  - Programming
  - Miscellaneous
  - Any (random category)
- **Joke Types**:
  - Single-line jokes
  - Two-part jokes (setup + punchline)
- **Safe Mode**: Filter out explicit content
- **Punchline Reveal**: Two-part jokes let you reveal the punchline when ready
- **Copy Joke**: Share jokes by copying them to your clipboard
- **Share Feature**: Native sharing support for social media
- **Joke History**: Automatically saves your last 20 jokes
- **Beautiful UI**: Modern, responsive design with smooth animations
- **No API Key Required**: Uses free JokeAPI (no authentication needed)

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sikseveneraat/random-joke-generator.git
cd random-joke-generator
```

2. Open `index.html` in your browser:
```bash
# Simply open the file
open index.html

# Or use a local server
python -m http.server 8000
# Then visit http://localhost:8000
```

That's it! No setup or API keys required.

## 🎮 How to Use

### Get a Joke
1. Click "Get Your First Joke 🎉" button
2. Or click "Next Joke 😆" to get another joke

### Filter Jokes
- **Category**: Select from General, Knock-Knock, Programming, or Miscellaneous
- **Type**: Choose Single-line or Two-part jokes
- **Safe Mode**: Enable to filter explicit content

### Two-Part Jokes
- The setup is displayed first
- Click "Reveal Punchline" to see the punchline

### Share Your Jokes
- **Copy**: Copy the joke text to your clipboard with "Copy Joke 📋"
- **Share**: Use the native share feature (desktop: copies; mobile: opens share menu)

### View History
- Automatically saved under "Joke History"
- Click any joke in history to view it again
- Click "Clear" to remove all history

## 📱 Responsive Design

- **Desktop**: Full-featured experience
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Touch-friendly interface with optimized buttons

## 🛠️ Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with flexbox, grid, and animations
- **JavaScript (ES6)**: Async/await, fetch API, localStorage
- **JokeAPI**: Free API for random jokes (https://jokeapi.dev)

## 🔗 API Information

### JokeAPI
- **Base URL**: `https://v2.jokeapi.dev/joke`
- **No Authentication**: Free to use, no API key required
- **Rate Limit**: Generous rate limits for personal use
- **Documentation**: [JokeAPI Docs](https://jokeapi.dev)

### API Endpoints Used

```javascript
// Get any random joke
GET /joke/any

// Get joke by category
GET /joke/{category}?type={type}&safe-mode=true

// Parameters:
// - category: general, knock-knock, programming, misc, or any
// - type: single or twopart
// - safe-mode: true or false
```

## 💾 Data Persistence

- **Joke History**: Saved to browser's `localStorage`
- **Storage**: Last 20 jokes are retained
- **Clear**: Click "Clear" button or manually clear browser data

## 🎨 Customization

### Change Color Scheme
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6c5ce7;
    --secondary-color: #00b894;
    --accent-color: #fdcb6e;
    --danger-color: #e17055;
    /* ... more variables ... */
}
```

### Modify History Limit
Change the slice value in `script.js`:
```javascript
jokeHistory = jokeHistory.slice(0, 20); // Change 20 to your preferred limit
```

## 🚨 Error Handling

- **Network Errors**: Graceful error messages
- **No Matching Jokes**: Clear feedback when no jokes match filters
- **Copy Failures**: Fallback notification
- **Geolocation**: Not used, works everywhere

## ✨ User Experience

### Animations
- Smooth transitions between jokes
- Loading spinner while fetching
- Slide animations for new content
- Hover effects on interactive elements

### Accessibility
- Semantic HTML structure
- Clear button labels with emojis
- Keyboard navigation support
- High contrast text
- Focus indicators on buttons

## 📊 Joke Statistics

JokeAPI provides various statistics:
- **Total Jokes**: Thousands of jokes available
- **Categories**: 5 main categories
- **Types**: Single-line and two-part jokes
- **Update Frequency**: Regular updates with new jokes

## 🎯 Example Jokes

### Single-line Example
```
Why don't scientists trust atoms?
Because they make up everything!
```

### Two-part Example
```
Setup: How many programmers does it take to change a light bulb?
Punchline: None, that's a hardware problem!
```

## 📦 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔐 Privacy

- No personal data collected
- No tracking or analytics
- All data stored locally in your browser
- No server-side storage
- Jokes fetched from public JokeAPI

## 🐛 Troubleshooting

### "No jokes found matching your filters"
- Try a different category
- Disable safe mode
- Choose a different type

### Jokes not loading
- Check internet connection
- Verify JokeAPI is accessible
- Clear browser cache
- Try a different browser

### History not saving
- Check if localStorage is enabled
- Ensure browser allows local storage
- Check available disk space

## 🚀 Future Enhancements

- [ ] Favorite jokes bookmarking
- [ ] Export jokes as text/PDF
- [ ] Dark mode toggle
- [ ] Custom joke categories
- [ ] Joke search functionality
- [ ] Rating system
- [ ] Multiple language support
- [ ] Offline mode with cached jokes
- [ ] Joke submissions
- [ ] Social media integration

## 📄 License

MIT License - feel free to use and modify!

## 🙏 Credits

- **JokeAPI**: [jokeapi.dev](https://jokeapi.dev) - Free joke API
- **Icons**: Emojis throughout the interface

## 🤝 Contributing

Contributions are welcome!
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have suggestions:
1. Open an issue on GitHub
2. Check existing issues for solutions
3. Provide details about your environment

---

**Get laughing! 😂** 

Visit the [repository](https://github.com/sikseveneraat/random-joke-generator) and start generating jokes!
