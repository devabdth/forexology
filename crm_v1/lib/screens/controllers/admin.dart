import 'dart:convert';

import 'package:crm_v1/globals/links.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class AdminProvider extends ChangeNotifier {
  Future<bool> login(
      {required String username, required String password}) async {
    try {
      final res = await http.patch(Uri.parse(APILinks.login),
          body: json.encode({"username": username, password: password}));

      return res.statusCode == 200;
    } catch (e) {
      print(e);
      return false;
    }
  }
}
