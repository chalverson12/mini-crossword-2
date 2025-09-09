# 🧩 Mini Crossword Puzzle Game

A fun and interactive mini crossword puzzle game built with vanilla HTML, CSS, and JavaScript. Perfect for quick brain teasers and word puzzle enthusiasts!

## 🌟 Features

- **Interactive Grid**: Click on any numbered cell to start solving
- **Smart Navigation**: Use arrow keys or Tab to move between cells
- **Multiple Puzzles**: Randomly generated puzzles from a curated collection
- **Real-time Feedback**: Check your answers and see immediate results
- **Timer**: Track how long it takes to solve each puzzle
- **Responsive Design**: Works great on desktop and mobile devices
- **Beautiful UI**: Modern, gradient-based design with smooth animations

## 🎮 How to Play

1. **Start**: Click on any numbered cell in the crossword grid
2. **Navigate**: 
   - Use arrow keys to move between cells
   - Press Tab to switch between Across and Down directions
   - Click on clues to jump to the corresponding word
3. **Input**: Type letters directly into the highlighted cells
4. **Check**: Use the "Check Answers" button to see your progress
5. **Help**: Use "Reveal Answers" if you get stuck
6. **New Game**: Click "New Game" to load a fresh puzzle

## 🚀 Live Demo

The game is automatically deployed to GitHub Pages. Once you push this repository to GitHub, it will be available at:
`https://[your-username].github.io/[repository-name]`

## 🛠️ Setup and Deployment

### Local Development
1. Clone this repository
2. Open `index.html` in your web browser
3. Start solving puzzles!

### GitHub Pages Deployment
This project is configured for automatic deployment to GitHub Pages:

1. Push this repository to GitHub
2. Go to your repository settings
3. Navigate to "Pages" section
4. Set source to "GitHub Actions"
5. The site will be automatically deployed on every push to main/master branch

## 📁 Project Structure

```
mini-crossword-puzzle/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # Game logic and interactivity
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions deployment config
└── README.md           # This file
```

## 🎯 Game Features in Detail

### Puzzle System
- **Grid-based Layout**: Clean 5x5 and 6x6 crossword grids
- **Multiple Puzzles**: Currently includes 2 sample puzzles with more easily addable
- **Smart Word Detection**: Automatically detects which word you're working on
- **Bidirectional Support**: Seamlessly switch between Across and Down clues

### User Interface
- **Visual Feedback**: Cells highlight when selected or part of current word
- **Answer Checking**: Correct answers show in green, incorrect in red
- **Status Updates**: Real-time feedback on your progress
- **Celebration Effects**: Fun animations when you complete a puzzle

### Controls
- **Mouse**: Click cells and clues for navigation
- **Keyboard**: Full keyboard support for power users
  - Arrow keys for directional movement
  - Tab to switch word directions
  - Backspace for deletion and backward movement
  - Automatic advancement when typing

## 🔧 Customization

### Adding New Puzzles
To add new crossword puzzles, edit the `puzzles` array in `script.js`:

```javascript
{
    size: { rows: 5, cols: 5 },
    grid: [
        // Your grid layout with letters and '#' for black squares
    ],
    numbers: [
        // Number positions for clue references
    ],
    clues: {
        across: [
            { number: 1, clue: "Your clue", answer: "ANSWER", startRow: 0, startCol: 0 }
        ],
        down: [
            // Down clues
        ]
    }
}
```

### Styling
Customize the appearance by modifying `styles.css`:
- Change colors in the CSS custom properties
- Adjust grid sizes and spacing
- Modify animations and transitions

## 🌐 Browser Support

This game works in all modern browsers including:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 📱 Mobile Support

The game is fully responsive and includes:
- Touch-friendly interface
- Optimized layouts for small screens
- Mobile-specific styling adjustments

## 🤝 Contributing

Feel free to contribute by:
1. Adding new puzzle data
2. Improving the UI/UX
3. Adding new features (hints, difficulty levels, etc.)
4. Fixing bugs or improving performance

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Acknowledgments

- Built with vanilla JavaScript for maximum compatibility
- Inspired by classic crossword puzzles
- Uses modern CSS features for a polished look

---

Enjoy solving puzzles! 🧩✨