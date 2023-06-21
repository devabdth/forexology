import 'dart:convert';

import 'package:crm_v1/globals/links.dart';
import 'package:get_storage/get_storage.dart';
import 'package:http/http.dart' as http;

class AppRequests {
  static Future<Map> getArticlesAnalysis() async {
    try {
      String basicAuth =
          'Basic ${base64.encode(utf8.encode('${GetStorage().read("CURRENT_ADMIN_ID") ?? "amrMostafa"}:${GetStorage().read("CURRENT_ADMIN_PASSWORD") ?? "123456789"}'))}';
      print(APILinks.articlesAnalysis);
      final res = await http.get(
        Uri.parse(APILinks.articlesAnalysis),
        headers: <String, String>{'authorization': basicAuth},
      );

      if (res.statusCode == 200) {
        return Future.value(json.decode(res.body));
      }

      return Future.value({"Error": res.statusCode});
    } catch (e) {
      print(e);
      return Future.value({"Error": e.toString()});
    }
  }
}
