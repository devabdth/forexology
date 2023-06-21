import 'package:flutter/material.dart';

class Consts {
  static final theme = ThemeData(
    primaryColor: const Color(0xFFa600de),
    colorScheme: ColorScheme(
      primary: const Color(0xFF111111),
      onPrimary: const Color(0xFF444444),
      secondary: const Color(0xFFf9f9f9),
      onSecondary: const Color(0xFFdfdfdf),
      background: const Color(0xFFf9f9f9),
      onBackground: const Color(0xFFf0f0f0),
      brightness: Brightness.light,
      error: Colors.red,
      onError: Colors.red.shade900,
      surface: Colors.transparent,
      onSurface: Colors.transparent,
    ),
  );
}
