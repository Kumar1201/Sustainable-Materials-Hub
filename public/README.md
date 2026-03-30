# Ecovera - Waste Management App

A mobile-responsive web application for waste collection and recycling, built with modern web technologies.

## Features

- Vonage SMS Authentication (OTP-based login)
- User profile management
- Waste collection scheduling
- Environmental impact tracking
- SQLite database for data persistence
- Multi-language support (English, Kannada, Hindi)
- Real-time order tracking

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Authentication**: Vonage SMS API (formerly Nexmo)
- **Deployment**: Local development server

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Vonage account with SMS enabled

### Vonage Setup

1. **Create a Vonage Account**:
   - Go to [Vonage Dashboard](https://dashboard.nexmo.com/)
   - Create a new account or use existing one

2. **Get Vonage Credentials**:
   - Go to Settings → API Settings
   - Copy API Key and API Secret

3. **Verify Your Phone Number**:
   - Add your phone number to verified numbers for testing

### Environment Setup

Create a `.env` file in the root directory with the following variables:
```env
PORT=3000

# Vonage Configuration (from Vonage Dashboard)
VONAGE_API_KEY=your-api-key
VONAGE_API_SECRET=your-api-secret
VONAGE_FROM_NUMBER=Ecovera
```

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ecovera-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Authentication Flow

1. **Login**: User enters mobile number on `login.html`
2. **OTP Request**: Vonage sends SMS OTP to the mobile number
3. **OTP Verification**: User enters OTP on `otp.html`
4. **Token Generation**: Server generates session token upon successful verification
5. **User Creation**: Server creates/updates user in SQLite database
6. **Access**: User is redirected to main app with authenticated session

## Project Structure

```
ecovera-app/
├── public/                 # Static files served to client
│   ├── index.html         # Main landing page
│   ├── login.html         # Firebase phone auth login
│   ├── otp.html          # OTP verification page
│   ├── home.html         # User dashboard
│   ├── profile.html      # User profile page
│   ├── sell-form.html    # Waste collection form
│   ├── styles.css        # Main stylesheet
│   └── user.js           # User interface utilities
├── server.js              # Express server with session token verification
├── sqlite_db.js          # SQLite database operations
├── app.js                # Client-side application logic with auth management
├── translations.js       # Multi-language support

├── TODO.md               # Development tasks and progress
└── package.json          # Dependencies and scripts
```

## API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP via Vonage SMS
- `POST /api/auth/verify-otp` - Verify OTP and generate session token

### User Management
- `GET /api/user/:mobile` - Get user profile (protected)
- `PUT /api/user/:mobile` - Update user profile (protected)

### Orders
- `POST /api/orders` - Create new waste collection order (protected)
- `GET /api/orders/:userId` - Get user's orders (protected)

### Public Data
- `GET /api/categories` - Get waste categories
- `GET /api/events` - Get environmental events

## Database Schema

The application uses SQLite with the following main tables:

- `users` - User information (mobile, name, email, address, etc.)
- `orders` - Waste collection orders with environmental impact data
- `categories` - Waste type categories (paper, metal, plastic, glass)
- `events` - Environmental events and campaigns
- `otps` - Temporary OTP storage for verification

## Security Notes

- All sensitive API endpoints are protected by session token verification
- User data is stored securely in SQLite database
- OTPs are stored temporarily and deleted after verification
- No sensitive credentials are stored in client-side code

## Development

### Testing Authentication

1. Start the server: `npm start`
2. Open `http://localhost:3000/login.html`
3. Enter a valid mobile number (with country code if needed)
4. Complete OTP verification
5. Check browser console and server logs for any errors

### Database Operations

The app automatically creates the SQLite database and tables on first run. Sample data for categories and events is also initialized.

## Troubleshooting

### Common Vonage Issues

- **Invalid credentials**: Double-check API Key and API Secret
- **Phone number not verified**: Add your phone number to verified numbers for testing
- **SMS not delivered**: Check Vonage logs in the dashboard for delivery status
- **Insufficient funds**: Add credits to your Vonage account

### Database Issues

- **Database locked**: Ensure no other processes are using the SQLite file
- **Table creation failed**: Check file permissions and SQLite installation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly (especially authentication flow)
5. Submit a pull request

## License

This project is licensed under the MIT License.
