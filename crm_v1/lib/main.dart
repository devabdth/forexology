import 'package:crm_v1/screens/home/home.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:provider/provider.dart';

import 'prefs/consts.dart';

void main() {
  runApp(const FOREXologyCRM());
}

class FOREXologyCRM extends StatelessWidget {
  const FOREXologyCRM({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [ChangeNotifierProvider(create: (_) => ChangeNotifier())],
      child: GetMaterialApp(
        debugShowCheckedModeBanner: false,
        home: const HomePage(),
        theme: Consts.theme,
      ),
    );
  }
}
