# Howzat11 - Build Your Dream XI 🏏

A game-like, immersive cricket team selection experience built with Next.js. Select your playing 11 before every match with stunning visuals, smooth animations, and intuitive UX.

![Howzat11](https://via.placeholder.com/800x400/0f172a/fbbf24?text=Howzat11+Dream+XI)

## ✨ Features

- **Game-like Player Cards**: Interactive cards with ratings, stats, and role badges
- **Formation View**: Visual cricket pitch showing your selected team positions
- **Rich Animations**: Smooth transitions powered by Framer Motion
- **Role-based Filtering**: Easily filter players by Batsmen, Bowlers, All-rounders, and Wicket-keepers
- **Team Validation**: Real-time validation of team composition rules
- **Captain Selection**: Designate Captain and Vice-Captain with visual indicators
- **Responsive Design**: Works beautifully on mobile, tablet, and desktop
- **Stadium Atmosphere**: Dark theme with stadium lighting effects

## 🎯 Team Rules

- **11 Players Total**
- **3-5 Batsmen**
- **3-5 Bowlers**
- **1-3 All-rounders**
- **1-2 Wicket-keepers**
- **Maximum 4 Overseas Players**

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and animations
│   ├── layout.tsx       # Root layout with stadium background
│   └── page.tsx         # Main team selection page
├── components/
│   ├── PlayerCard.tsx   # Game-style player card
│   ├── FormationPitch.tsx # Cricket field formation view
│   ├── MatchHeader.tsx  # Match info banner
│   ├── RoleFilter.tsx   # Role-based player filter
│   ├── SelectedTeamPanel.tsx # Selected team sidebar
│   ├── TeamValidation.tsx # Team composition validator
│   └── SuccessModal.tsx # Team confirmation modal
├── data/
│   └── players.ts       # Sample player data
└── types/
    └── index.ts         # TypeScript interfaces
```

## 🎨 Design Philosophy

- **Stadium Atmosphere**: Dark, immersive background with subtle lighting
- **Game-like Cards**: Players presented as collectible game cards
- **Visual Hierarchy**: Gold accents for important elements
- **Micro-interactions**: Hover effects, selection animations
- **Typography**: Oswald for headlines, Barlow for body, Orbitron for scores

## 📱 Responsive Behavior

- **Mobile**: Slide-out sidebar, floating action bar
- **Tablet**: Grid adjustments, touch-friendly targets
- **Desktop**: Side-by-side layout with sticky panel

## 🔧 Customization

### Adding Players

Edit `src/data/players.ts` to add more players:

```typescript
{
  id: 'unique-id',
  name: 'Player Name',
  country: 'Country',
  role: 'batsman' | 'bowler' | 'allrounder' | 'wicketkeeper',
  bowlingStyle: 'fast' | 'medium' | 'spin' | 'none',
  battingOrder: 1-11,
  rating: 0-100,
  isOverseas: true | false,
  stats: {
    matches: number,
    runs: number,
    wickets: number,
    average: number,
    strikeRate: number,
  }
}
```

### Modifying Team Rules

Edit `src/types/index.ts` to change `DEFAULT_REQUIREMENTS`.

## 📄 License

MIT License - feel free to use for your projects!

---

Made with 🏏 for cricket fans
