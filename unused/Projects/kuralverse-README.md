# KuralVerse – Daily Tirukkural Experience 📖

A production-ready Flutter mobile application based on the classical Tamil book **Tirukkural**. Explore all 1330 Kurals through an elegant, animated spin selector — and share your discoveries with beautiful branded images.

## ✨ Features

- **4-Digit Spin Selector** – Animated slot-machine-style number generator with non-repeating random logic
- **Kural Detail** – Full Tamil text, English meaning, and explanation with elegant typography
- **Smart History** – Track every Kural you've explored, filter by date or number
- **Profile** – Personalize with your name, photo, and contact info
- **Social Sharing** – Generate beautifully branded images to share on WhatsApp, Instagram, Facebook, etc.
- **Dark Mode** – System, Light, or Dark theme with Material 3 design
- **Font Customization** – Choose from 5 font families and adjust size
- **Language Toggle** – Tamil / English display support
- **Offline-First** – All data stored locally with Hive

## 🏗️ Architecture

```
lib/
├── main.dart              # Entry point
├── app.dart               # Root MaterialApp
├── core/                  # Shared infrastructure
│   ├── constants/         # App constants & strings
│   ├── theme/             # Material 3 theme & colors
│   ├── router/            # GoRouter configuration
│   └── utils/             # Helpers (date formatting, etc.)
├── data/                  # Data layer
│   ├── models/            # Data models (Kural, History, Profile)
│   ├── datasources/       # Hive storage, JSON loader
│   └── repositories/      # Repository abstractions
└── features/              # Feature modules
    ├── home/              # Spin selector screen
    ├── kural_detail/      # Kural display + sharing
    ├── history/           # History list + filters
    ├── profile/           # User profile management
    └── settings/          # Theme, font, language settings
```

## 🚀 Getting Started

### Prerequisites
- Flutter SDK 3.10+
- Dart 3.0+
- Android Studio / VS Code

### Setup
```bash
# Clone and navigate
cd kuralverse

# Install dependencies
flutter pub get

# Run the app
flutter run
```

### Build
```bash
# Android APK
flutter build apk

# iOS
flutter build ios
```

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `flutter_riverpod` | State management |
| `hive_flutter` | Local storage |
| `go_router` | Navigation |
| `share_plus` | Social sharing |
| `image_picker` | Camera/gallery photos |
| `screenshot` | Widget-to-image capture |
| `google_fonts` | Typography |
| `intl` | Date formatting |
| `path_provider` | File system paths |

## 🎨 Design

- **Palette**: White + Maroon (#800020) + Gold accent
- **Style**: Material 3, card-based layouts, rounded corners, soft shadows
- **Animations**: Smooth spin selector, animated transitions, micro-interactions

## 🔮 Future Roadmap

- [ ] Daily notification feature
- [ ] Premium subscription (IAP)
- [ ] AI-based explanation feature
- [ ] Home/lock screen widgets
- [ ] Full 1330 Kural dataset with verified translations

## 📝 License

This project is private and not published to pub.dev.
