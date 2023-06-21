class APILinks {
  static const globalLink = String.fromEnvironment("API_GLOBAL_LINK",
      defaultValue: "http://127.0.0.1:3030");
  // static const globalLink = "http://127.0.0.1:3030";

  static const articlesAnalysis = "$globalLink/webapp/crm/articles/";
  static const login = "$globalLink/webapp/adminstration/login/";
}
