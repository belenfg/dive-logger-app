# Dive Logger App

A simple cross-platform (iOS & Android) dive logging application built with **React Native** and **Firebase**. Users can:

- Register/login (email/password).  
- Store and update personal dive data (total dives, certifications, insurance).  
- Log new dives with date, site, and materials used.  
- View and update a list of past dives.

## Table of Contents

1. [Prerequisites](#prerequisites)  
2. [Installation](#installation)  
3. [Running the App](#running-the-app)  
4. [Testing](#testing)  
5. [Project Structure](#project-structure)  
6. [Further Development](#further-development)  

---

## Prerequisites

- **Node.js** (v14 or newer recommended)  
- **npm** or **yarn** package manager  
- **Expo CLI** (optional but recommended; you can also run the app with the bare React Native CLI)  

### Optional Global Install (Expo)

```bash
npm install --global expo-cli
```

---

## Installation

1. **Install dependencies**:  
   ```bash
   # Using npm
   npm install
   
   # Using yarn
   yarn
   ```

2. **Configure Firebase**:  
   - Create a [Firebase project](https://console.firebase.google.com/) and enable:
     - Authentication (email/password)
     - Firestore database
   - Obtain your web config from Firebase console and update `firebaseConfig.js` accordingly.

---

## Running the App

### Run on iOS/Android (via Expo)

```bash
# Start Metro Bundler
npx expo start
```

- **iOS Simulator**: Press `i` in the terminal  
- **Android Emulator**: Press `a` in the terminal  
- **Physical Device**: Scan the QR code via the Expo Go app

### Bare React Native CLI (Alternative)

If you’ve ejected or initialized with React Native CLI:

```bash
npx react-native run-android
# or
npx react-native run-ios
```

---

## Testing

We use **Jest** and **@testing-library/react-native** for unit and component tests.

1. **Install Dev Dependencies** (if not already present):
   ```bash
   npm install --save-dev jest @testing-library/react-native @testing-library/jest-native
   ```

2. **Configure Jest** in your `package.json` (or create a `jest.config.js` file). For simplicity, add something like:
   ```json
   {
     "jest": {
       "preset": "jest-expo",
       "testPathIgnorePatterns": [
         "/node_modules/",
         "/android/",
         "/ios/"
       ]
     }
   }
   ```

3. **Run Tests**:
   ```bash
   npm test
   # or
   yarn test
   ```

### Example Test

Below is a sample test file to verify rendering and basic interactions in a component. Create a file named `DiveFormScreen.test.js` inside a `__tests__` folder (e.g., `screens/__tests__/DiveFormScreen.test.js`).

```jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DiveFormScreen from '../DiveFormScreen';

describe('DiveFormScreen', () => {
  it('renders form fields correctly and updates them', () => {
    const { getByPlaceholderText, getByText } = render(<DiveFormScreen />);

    const diveSiteInput = getByPlaceholderText('Dive Site');
    fireEvent.changeText(diveSiteInput, 'Coral Reef Site');
    expect(diveSiteInput.props.value).toBe('Coral Reef Site');

    const dateInput = getByPlaceholderText('Date (YYYY-MM-DD)');
    fireEvent.changeText(dateInput, '2025-01-01');
    expect(dateInput.props.value).toBe('2025-01-01');

    // For demonstration, check that the button appears
    const saveButton = getByText('Save Dive');
    expect(saveButton).toBeTruthy();
  });
});
```

---

## Project Structure

```
dive-logger-app/
├── App.js
├── package.json
├── firebaseConfig.js
├── screens/
│   ├── LoginScreen.js
│   ├── RegisterScreen.js
│   ├── HomeScreen.js
│   ├── DiveFormScreen.js
│   ├── ProfileScreen.js
│   └── __tests__/
│       └── DiveFormScreen.test.js
├── components/
│   ├── InputField.js
│   └── Button.js
└── README.md
```

- **`App.js`**: Entry point, configures navigation (React Navigation).  
- **`firebaseConfig.js`**: Firebase initialization (Authentication, Firestore).  
- **`screens/`**: Each screen for a major feature (Login, Register, Dive Logs, Profile, etc.).  
- **`components/`**: Reusable UI elements (InputField, Button).  
- **`__tests__/`**: Contains Jest test files.

---

## Further Development

- **Firestore Security**: Update your Firestore Rules to ensure users can only access their own data.  
- **Offline Support**: Use React Native’s offline storage or Firestore’s offline capabilities.  
- **Advanced Features**: Additional fields for dive depth, temperature, buddy info, plus charting and analytics.  
- **Deployment**: Use `expo build` or EAS (Expo Application Services) to build stand-alone binaries (APK, AAB, IPA).

---

**Enjoy diving into development!** If you have any questions or need support, feel free to reach out or create issues in this repository.

