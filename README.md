# Web3 DEX Frontend

![Web3 DEX](https://img.shields.io/badge/Web3-DEX-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=flat-square)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square)
[![Bun](https://img.shields.io/badge/Bun-1.2+-yellow?style=flat-square)](https://bun.sh)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A beautiful, production-ready Web3 decentralized exchange (DEX) frontend built with modern technologies. This forkable template provides a complete trading platform with advanced features, stunning UI, and enterprise-grade error handling.

## 🌟 Features

### 🏠 **Core Platform**
- **Lightning Fast Trading Interface** - Optimized for speed and performance
- **Real-time Price Charts** - Interactive charts with multiple timeframes
- **Multi-chain Support** - Ethereum, Polygon, Arbitrum, Optimism, BSC
- **Cross-device Responsive** - Perfect on desktop, tablet, and mobile

### 💱 **Trading Features**
- **Spot Trading** - Buy/sell cryptocurrencies instantly
- **Advanced Order Types** - Market, limit, and stop orders
- **Price Alerts** - Custom notifications for price movements
- **Trading History** - Complete transaction records

### 🏦 **DeFi Integration**
- **Liquidity Pools** - Add/remove liquidity with yield farming
- **Staking Rewards** - Earn rewards by staking tokens
- **Governance Voting** - Participate in protocol decisions
- **Yield Farming** - Maximize returns with automated strategies

### 🎨 **NFT Marketplace**
- **NFT Trading** - Buy/sell non-fungible tokens
- **Collection Browsing** - Explore curated NFT collections
- **Rarity Tools** - Advanced filtering and sorting
- **Creator Royalties** - Support for artist compensation

### 🔒 **Security & Privacy**
- **No External Dependencies** - Works with browser wallets directly
- **Enterprise Error Handling** - Comprehensive error boundaries
- **Network Resilience** - Graceful handling of connection issues
- **Privacy-Focused** - Minimal data collection and tracking

## 🚀 Quick Start

### Prerequisites

- **Bun** 1.2 or newer ([Installation Guide](https://bun.sh/docs/installation))
- **Node.js** 18+ (optional, for compatibility)
- **Git** for cloning the repository

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/moww20/web-app-frontend.git
cd web-app-frontend
```

2. **Install dependencies:**
```bash
bun install
```

3. **Start development server:**
```bash
bun run dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
web-app-frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── components/         # Reusable UI components
│   │   ├── providers/          # Web3 & React providers
│   │   ├── dashboard/          # Dashboard page
│   │   ├── nft/               # NFT marketplace
│   │   ├── pools/             # Liquidity pools
│   │   ├── trade/             # Trading interface
│   │   └── vote/              # Governance voting
│   ├── globals.css            # Global styles & Tailwind
│   └── middleware.ts          # Next.js middleware
├── public/                    # Static assets
├── scripts/                   # Build & development scripts
├── .github/                   # GitHub Actions & workflows
└── package.json              # Dependencies & scripts
```

## 🛠️ Technology Stack

### **Frontend Framework**
- **Next.js 15.4.6** - React framework with App Router
- **React 19.1.0** - Modern React with concurrent features
- **TypeScript** - Type-safe development

### **Web3 Integration**
- **Wagmi** - React hooks for Ethereum
- **Viem** - Low-level Ethereum interaction
- **Browser Wallets** - MetaMask, Coinbase Wallet, etc.

### **UI/UX**
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Modern icon library
- **Glassmorphism** - Modern design aesthetic

### **Performance**
- **Turbopack** - Next.js fast bundler
- **Bun** - Fast JavaScript runtime
- **Code Splitting** - Optimized bundle sizes

### **Quality Assurance**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy from .env.example
cp .env.example .env.local
```

**Required Variables:**
```bash
# Optional: Base URL for SSR (defaults to localhost)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

**Optional Variables (for NFT features):**
```bash
NEXT_PUBLIC_NFT_GENESIS_ADDRESS=0x...
NEXT_PUBLIC_NFT_FOUNDERS_ADDRESS=0x...
NEXT_PUBLIC_NFT_TESTERS_ADDRESS=0x...
```

## 📜 Available Scripts

```bash
# Development
bun run dev          # Start development server with Turbopack
bun run build        # Create production build
bun run start        # Start production server
bun run lint         # Run ESLint

# Code Quality
bun run type-check   # TypeScript type checking
bun run format       # Code formatting with Prettier
```

## 🎨 Customization

### **Branding**
Update the brand name in these files:
- `src/app/components/Navbar.js`
- `src/app/components/SplashPage.js`
- `src/app/layout.js` (metadata)

### **Theming**
Modify CSS variables in `src/app/globals.css`:
```css
:root {
  --color-primary: #your-color;
  --color-accent: #your-accent;
  --color-background: #your-bg;
}
```

### **Chains & Networks**
Add or modify supported networks in `src/app/providers/WagmiProviderClient.js`

### **Features**
Enable/disable features by commenting out routes in `src/app/layout.js`

## 🚀 Deployment

### **Vercel (Recommended)**
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically with zero configuration

### **Netlify**
1. Build the project: `bun run build`
2. Upload the `.next` folder to Netlify
3. Configure build settings

### **Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🐛 Troubleshooting

### **Build Issues**
- Ensure you're using Bun 1.2+
- Delete `node_modules` and run `bun install`
- Clear Next.js cache: `rm -rf .next`

### **Wallet Connection Issues**
- Check browser console for errors
- Ensure MetaMask or compatible wallet is installed
- Try refreshing the page

### **Network Errors**
- Check internet connection
- Try different network (Ethereum Mainnet vs Testnet)
- Clear browser cache

### **Performance Issues**
- Enable browser hardware acceleration
- Update to latest browser version
- Check network tab for slow requests

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes:**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### **Development Guidelines**
- Use TypeScript for new components
- Follow ESLint rules
- Write meaningful commit messages
- Test on multiple devices/browsers
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - The React framework
- [Wagmi](https://wagmi.sh) - Web3 React hooks
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Framer Motion](https://framer.com/motion) - Animation library

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/moww20/web-app-frontend/issues)
- **Discussions**: [GitHub Discussions](https://github.com/moww20/web-app-frontend/discussions)
- **Documentation**: [Web3 DEX Docs](https://docs.web3dex.dev)

---

**Made with ❤️ for the Web3 community**

Ready to build your own DEX? Fork this repository and customize it for your needs!
