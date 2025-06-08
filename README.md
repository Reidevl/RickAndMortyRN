# Rick and Morty App

A React Native application built with Expo that follows Clean Architecture principles to consume the Rick and Morty GraphQL API.

## Project Structure

```
app/                     # Expo Router directory (handles routing)
├── (tabs)/              # Tab navigation
│   ├── characters/      # Characters tab
│   │   ├── [id].tsx     # Character detail screen
│   │   └── index.tsx    # Characters list screen
│   └── episodes/        # Episodes tab
│       ├── [id].tsx     # Episode detail screen
│       └── index.tsx    # Episodes list screen
├── _layout.tsx          # Root layout
└── +not-found.tsx       # 404 screen

src/                     # Application source code
├── core/                # Core business logic (Clean Architecture)
│   ├── domain/          # Domain layer
│   │   ├── entities/    # Business entities (Character, Episode, etc.)
│   │   ├── repositories/   # Repository interfaces
│   │   └── use-cases/      # Business use cases
│   │
│   ├── data/          # Data layer
│   │   ├── graphql/        # GraphQL queries, mutations, and types
│   │   ├── repositories/   # Repository implementations
│   │   └── sources/        # Data sources (API clients)
│   │
│   └── presentation/       # Presentation layer
│       ├── components/     # Reusable UI components
│       ├── hooks/          # Custom hooks
│       └── view-models/    # View models for screens
│
├── shared/                 # Shared utilities and configurations
│   ├── constants/         # App constants
│   ├── i18n/              # Internationalization
│   ├── theme/             # UI theme configuration
│   └── utils/             # Utility functions
│
└── tests/            # Test files
    └── unit/         # Unit tests\
```

## Architecture Overview

### Expo Router Structure
- `app/` directory handles all routing using file-based routing
- `(tabs)/` directory manages tab navigation
- Dynamic routes using `[param].tsx` files
- Special files like `_layout.tsx` for layouts and `+not-found.tsx` for 404s

### Domain Layer
- Contains business entities (Character, Episode)
- Defines repository interfaces
- Implements use cases (GetCharacters, GetCharacterDetails, etc.)
- Independent of any framework or external concerns

### Data Layer
- Implements repository interfaces
- Handles GraphQL API integration
- Manages data caching and persistence
- Contains data models and DTOs

### Presentation Layer
- React Native components and screens
- View models for state management
- Integration with Expo Router
- UI/UX implementation

### Shared Layer
- Common utilities and configurations
- Internationalization
- Theme management
- Custom hooks

## Features

1. Character List (app/(tabs)/characters/index.tsx)
   - Paginated list of characters
   - Character details (photo, name, species)
   - Filters (name, species, status)

2. Character Detail (app/(tabs)/characters/[id].tsx)
   - Comprehensive character information
   - Episode appearances
   - Location details

3. Episode List (app/(tabs)/episodes/index.tsx)
   - List of episodes with details
   - Episode information
   - Character appearances

## Technical Stack

- React Native (Expo)
- Expo Router (File-based routing)
- Apollo Client (GraphQL)
- Jest & Testing Library
- TypeScript
- i18n-js (Internationalization)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run tests:
   ```bash
   npm test
   ```

## Testing Strategy

- Unit Tests: Core business logic and use cases
- Component Tests: UI components and screens
- Integration Tests: Repository implementations
- E2E Tests: Critical user flows