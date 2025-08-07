# Skill-Bridge
A comprehensive platform connecting entrepreneurs with freelancers, offering learning resources, and facilitating investment opportunities.

## Features

- User Authentication (Admin/Freelancer/Entrepreneur/Investor)
- Project Posting and Matching
- Course Marketplace
- Investment Platform
- Community Collaboration
- Mentorship Programs
- Interactive Dashboards
- Integration with Mendix for specific features

## Tech Stack

- Frontend: React.js, HTML5, CSS3, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- External Integrations: Mendix

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB
- Mendix Studio Pro (for specific features)

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
cd skill-bridge
```

2. Install dependencies:
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up environment variables:
Create `.env` files in both client and server directories based on the provided `.env.example` files.

4. Start the development servers:
```bash
# Start server (from server directory)
npm run dev

# Start client (from client directory)
npm start
```

5. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

```
skill-bridge/
├── client/                 # Frontend React application
│   ├── public/            # Static files
│   └── src/              
│       ├── components/    # Reusable components
│       ├── pages/         # Page components
│       ├── context/       # React context
│       ├── hooks/         # Custom hooks
│       ├── services/      # API services
│       ├── styles/        # Global styles
│       └── utils/         # Utility functions
├── server/                # Backend Node.js application
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   └── utils/           # Utility functions
└── docs/                 # Documentation
```

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
