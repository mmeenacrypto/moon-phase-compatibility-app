# Moon Phase Compatibility App

## Overview

A cosmic compatibility application that calculates romantic compatibility between two people based on their birth dates or celebrity matches using moon phases, zodiac signs, and astrological elements. Users can input their own birth dates or compare themselves with celebrities, receiving detailed compatibility analysis with shareable results.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Framework**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom cosmic theme variables
- **State Management**: React Query (TanStack Query) for server state
- **Build Tool**: Vite with custom configuration for mono-repo structure

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints with JSON responses
- **Development**: Hot module replacement via Vite middleware integration

### Data Storage Solutions
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured via Drizzle config)
- **Connection**: Neon Database serverless driver
- **Migrations**: Drizzle Kit for schema management
- **Development Storage**: In-memory storage implementation for rapid development

## Key Components

### Database Schema (`shared/schema.ts`)
- **Users Table**: Basic user authentication (id, username, password)
- **Compatibility Results Table**: Stores calculation results with share URLs
- **Validation**: Zod schemas for type-safe data validation

### Compatibility Engine (`client/src/lib/compatibilityEngine.ts`)
- **Phase Compatibility**: Calculates lunar phase harmony between dates
- **Element Compatibility**: Analyzes astrological element relationships
- **Zodiac Compatibility**: Evaluates sun sign compatibility
- **Scoring Algorithm**: Produces 0-100 compatibility scores with soulmate detection

### Moon Calculator (`client/src/lib/moonCalculator.ts`)
- **Lunar Cycle Calculation**: Determines moon phase from birth date
- **Zodiac Sign Detection**: Calculates sun sign from birth date
- **Astronomical Data**: Uses simplified lunar cycle calculations (29.53 days)

### Celebrity Database (`client/src/data/celebrities.ts`)
- **Celebrity Profiles**: Pre-populated celebrity data with birth dates
- **Image Integration**: Unsplash placeholder images for visual appeal
- **Search Functionality**: Slug-based celebrity lookup system

### UI Components
- **CelebritySearch**: Autocomplete search for celebrity selection
- **PersonProfile**: Display component for individual compatibility profiles
- **Responsive Design**: Mobile-first approach with cosmic-themed styling

## Data Flow

1. **User Input**: Users select between date-date, date-celebrity, or celebrity-celebrity comparisons
2. **Validation**: Frontend validates input using Zod schemas
3. **API Request**: POST to `/api/compatibility` with validated data
4. **Processing**: Server calculates moon phases, zodiac signs, and compatibility scores
5. **Storage**: Results saved to database with unique share URL
6. **Response**: Compatibility data returned with navigation to results page
7. **Results Display**: Detailed compatibility analysis with sharing capabilities

## External Dependencies

### Core Dependencies
- **Database**: `@neondatabase/serverless` for PostgreSQL connection
- **ORM**: `drizzle-orm` and `drizzle-zod` for database operations
- **UI**: Complete Radix UI component suite for accessible components
- **Routing**: `wouter` for lightweight client-side routing
- **State**: `@tanstack/react-query` for server state management

### Development Dependencies
- **Build**: Vite with React plugin and TypeScript support
- **Styling**: Tailwind CSS with PostCSS processing
- **Development**: TSX for TypeScript execution and hot reloading

### Replit Integration
- **Error Handling**: Replit runtime error modal for development
- **Cartographer**: Replit code mapping for enhanced debugging
- **Environment**: PostgreSQL 16 module for database provisioning

## Deployment Strategy

### Development Mode
- **Command**: `npm run dev` - Runs TSX server with hot reloading
- **Port**: 5000 (configured in `.replit`)
- **Vite Integration**: Development middleware for frontend assets
- **Database**: Environment-based DATABASE_URL configuration

### Production Build
- **Frontend**: `vite build` outputs to `dist/public`
- **Backend**: `esbuild` bundles server with external packages
- **Deployment**: Replit autoscale deployment target
- **Environment**: Production NODE_ENV with optimized builds

### Database Management
- **Schema Push**: `npm run db:push` for development schema updates
- **Migrations**: Drizzle migrations stored in `/migrations` directory
- **Connection**: Environment variable DATABASE_URL required

## Changelog

```
Changelog:
- June 27, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```