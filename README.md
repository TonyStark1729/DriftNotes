# DriftNotes - Virtual Beach Message Experience

DriftNotes is a beautiful 3D beach environment where users can share anonymous messages through virtual bottles floating in the ocean. Created by Rajdeep Singh, this project combines modern web technologies to create an immersive and interactive experience.

## Features

- Immersive 3D beach environment created with Three.js
- Anonymous message submission system
- Interactive message bottles that can be clicked to view contents
- Real-time updates for new messages
- Responsive design that works on all devices
- Custom shaders for realistic water animation
- Beautiful glass bottle effects with dynamic lighting

## Tech Stack

- React + TypeScript + Vite
- Three.js with @react-three/fiber and @react-three/drei
- Firebase Firestore for database
- Tailwind CSS for styling
- Framer Motion for animations
- Zustand for state management

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Update the Firebase configuration in `src/services/firebaseService.ts` with your own Firebase project details
4. Run the development server with `npm run dev`

## Firebase Setup

1. Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Firestore database
3. Apply the security rules from `firestore.rules`
4. Update the Firebase configuration in the application

## Deployment

This project is set up for deployment via GitHub Actions to Firebase Hosting:

1. Set up the GitHub repository
2. Add your Firebase secrets to GitHub repository secrets
3. Update the projectId in `.github/workflows/deploy.yml`
4. Push to the `main` branch to trigger deployment

## Contributing

While this is a personal project by Rajdeep Singh, suggestions and feedback are welcome. Please feel free to open an issue or submit a pull request.

## License

MIT

## Author

Created by Rajdeep Singh (2025)

## Acknowledgments

Special thanks to the Three.js and React communities for their excellent documentation and resources that helped make this project possible.