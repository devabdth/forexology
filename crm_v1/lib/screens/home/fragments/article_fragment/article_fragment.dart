import 'package:crm_v1/globals/requests.dart';
import 'package:crm_v1/screens/home/fragments/article_fragment/components/categories.dart';
import 'package:crm_v1/screens/home/fragments/article_fragment/components/classifications.dart';
import 'package:crm_v1/screens/home/fragments/article_fragment/components/comments.dart';
import 'package:crm_v1/screens/home/fragments/article_fragment/components/rating.dart';
import 'package:crm_v1/screens/home/fragments/article_fragment/components/read_time_month.dart';
import 'package:crm_v1/screens/home/fragments/article_fragment/components/read_time_weeks.dart';
import 'package:crm_v1/screens/home/fragments/article_fragment/components/saves.dart';
import 'package:crm_v1/screens/home/fragments/article_fragment/components/views.dart';
import 'package:crm_v1/widgets/snippet_card/snippet_card.dart';
import 'package:flutter/material.dart';

class ArticlesFragment extends StatefulWidget {
  const ArticlesFragment({Key? key}) : super(key: key);

  @override
  State<ArticlesFragment> createState() => _ArticlesFragmentState();
}

class _ArticlesFragmentState extends State<ArticlesFragment> {
  final GlobalKey monthsReadTimeKey = GlobalKey();
  final GlobalKey weeksReadTimeKey = GlobalKey();
  final GlobalKey articleCategoriesKey = GlobalKey();
  final GlobalKey articleClassificationKey = GlobalKey();
  final GlobalKey weekViewsKey = GlobalKey();
  final GlobalKey monthViewsKey = GlobalKey();
  final GlobalKey weekSavesKey = GlobalKey();
  final GlobalKey monthSavesKey = GlobalKey();
  final GlobalKey monthCommentsKey = GlobalKey();
  final GlobalKey weekCommentsKey = GlobalKey();
  final GlobalKey weekRatingApproachesKey = GlobalKey();
  final GlobalKey monthRatingApproachesKey = GlobalKey();
  late int year, currentMonth, currentWeek;
  @override
  void initState() {
    year = 2023;
    currentMonth = DateTime.now().month;
    final start = DateTime.utc(DateTime.now().year, 1, 1);
    final today = DateTime.now();
    currentWeek = (today.difference(start).inDays / 7).ceil();

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final size = MediaQuery.of(context).size;

    return Scaffold(
      backgroundColor: theme.colorScheme.background,
      body: FutureBuilder<Map>(
          future: AppRequests.getArticlesAnalysis(),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Scaffold(
                body: Center(child: Text('Loading...')),
              );
            }

            if (snapshot.connectionState == ConnectionState.done &&
                !snapshot.hasData) {
              return const Scaffold(
                body: Center(child: Text('Failed to  fetch Data!')),
              );
            }

            if ((snapshot.data ?? {}).containsKey("Error")) {
              return Scaffold(
                body: Center(child: Text(snapshot.data?["Error"])),
              );
            }
            final data = snapshot.data!;
            return SingleChildScrollView(
              physics: const BouncingScrollPhysics(),
              child: Padding(
                padding: EdgeInsets.symmetric(
                  horizontal: size.width * 0.02,
                  vertical: size.width * 0.01,
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Padding(
                      padding:
                          EdgeInsets.symmetric(vertical: size.width * 0.0125),
                      child: SizedBox(
                        width: double.infinity,
                        child: Text(
                          "Overview",
                          style: TextStyle(
                            color: theme.primaryColor,
                            fontWeight: FontWeight.w700,
                            fontSize: size.width * 0.02,
                          ),
                          textAlign: TextAlign.start,
                        ),
                      ),
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        SnippetCard(
                          title: "Total Views",
                          value: "${data["$year"]["overall"]["TOTAL_VIEWS"]}",
                          color: Colors.blueAccent.shade700,
                          valueUnit: "Views",
                        ),
                        SnippetCard(
                          title: "Average Views",
                          value: "${data["$year"]["overall"]["AVG_VIEWS"]}",
                          color: Colors.blueAccent.shade700,
                          valueUnit: "Views / Article",
                        ),
                        SnippetCard(
                          title: "Total Saves",
                          value: "${data["$year"]["overall"]["TOTAL_SAVES"]}",
                          color: Colors.redAccent.shade700,
                          valueUnit: "Saves",
                        ),
                        SnippetCard(
                          title: "Average Saves",
                          value: "${data["$year"]["overall"]["AVG_SAVES"]}",
                          color: Colors.redAccent.shade700,
                          valueUnit: "Saves / Article",
                        ),
                      ],
                    ),
                    SizedBox(height: size.width * 0.0125),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        SnippetCard(
                          title: "Total Comments",
                          value:
                              "${data["$year"]["overall"]["TOTAL_COMMENTS"]}",
                          color: Colors.green.shade900,
                          valueUnit: "Comments",
                        ),
                        SnippetCard(
                          title: "Average Comments",
                          value: "${data["$year"]["overall"]["AVG_COMMENTS"]}",
                          color: Colors.green.shade900,
                          valueUnit: "Comments / Article",
                        ),
                        SnippetCard(
                          title: "Total Ratings Approaches",
                          value:
                              "${data["$year"]["overall"]["TOTAL_RATINGS_APPROACHES"]}",
                          color: Colors.indigo.shade900,
                          valueUnit: "Rating Approaches",
                        ),
                        SnippetCard(
                          title: "Average Rate",
                          value: "${data["$year"]["overall"]["AVG_RATE"]}",
                          color: Colors.indigo.shade700,
                          valueUnit: "Star / Article",
                        ),
                      ],
                    ),
                    SizedBox(height: size.width * 0.0125),
                    const Divider(
                        height: 0.15, thickness: 0.5, color: Colors.black26),
                    SizedBox(height: size.width * 0.0125),
                    Padding(
                      padding:
                          EdgeInsets.symmetric(vertical: size.width * 0.0125),
                      child: SizedBox(
                        width: double.infinity,
                        child: Text(
                          "Read Time",
                          style: TextStyle(
                            color: theme.primaryColor,
                            fontWeight: FontWeight.w700,
                            fontSize: size.width * 0.02,
                          ),
                          textAlign: TextAlign.start,
                        ),
                      ),
                    ),
                    ReadTimeMonth(
                      year: year,
                      currentMonth: currentMonth,
                      currentWeek: currentWeek,
                      chartKey: monthsReadTimeKey,
                      data: data,
                    ),
                    SizedBox(height: size.width * 0.0125),
                    ReadTimeWeek(
                      year: year,
                      currentMonth: currentMonth,
                      currentWeek: currentWeek,
                      chartKey: weeksReadTimeKey,
                      data: data,
                    ),
                    SizedBox(height: size.width * 0.0125),
                    const Divider(
                        height: 0.15, thickness: 0.5, color: Colors.black26),
                    SizedBox(height: size.width * 0.0125),
                    Padding(
                      padding:
                          EdgeInsets.symmetric(vertical: size.width * 0.0125),
                      child: SizedBox(
                        width: double.infinity,
                        child: Text(
                          "Views",
                          style: TextStyle(
                            color: theme.primaryColor,
                            fontWeight: FontWeight.w700,
                            fontSize: size.width * 0.02,
                          ),
                          textAlign: TextAlign.start,
                        ),
                      ),
                    ),
                    Views(
                      year: year,
                      currentMonth: currentMonth,
                      currentWeek: currentWeek,
                      weeksKey: weekViewsKey,
                      monthsKey: monthViewsKey,
                      data: data,
                    ),
                    SizedBox(height: size.width * 0.0125),
                    const Divider(
                        height: 0.15, thickness: 0.5, color: Colors.black26),
                    SizedBox(height: size.width * 0.0125),
                    Padding(
                      padding:
                          EdgeInsets.symmetric(vertical: size.width * 0.0125),
                      child: SizedBox(
                        width: double.infinity,
                        child: Text(
                          "Saves",
                          style: TextStyle(
                            color: theme.primaryColor,
                            fontWeight: FontWeight.w700,
                            fontSize: size.width * 0.02,
                          ),
                          textAlign: TextAlign.start,
                        ),
                      ),
                    ),
                    Saves(
                      year: year,
                      currentMonth: currentMonth,
                      currentWeek: currentWeek,
                      weeksKey: weekSavesKey,
                      monthsKey: monthSavesKey,
                      data: data,
                    ),
                    SizedBox(height: size.width * 0.0125),
                    const Divider(
                        height: 0.15, thickness: 0.5, color: Colors.black26),
                    SizedBox(height: size.width * 0.0125),
                    Padding(
                      padding:
                          EdgeInsets.symmetric(vertical: size.width * 0.0125),
                      child: SizedBox(
                        width: double.infinity,
                        child: Text(
                          "Comments",
                          style: TextStyle(
                            color: theme.primaryColor,
                            fontWeight: FontWeight.w700,
                            fontSize: size.width * 0.02,
                          ),
                          textAlign: TextAlign.start,
                        ),
                      ),
                    ),
                    Comments(
                      year: year,
                      currentMonth: currentMonth,
                      currentWeek: currentWeek,
                      weeksKey: weekCommentsKey,
                      monthsKey: monthCommentsKey,
                      data: data,
                    ),
                    SizedBox(height: size.width * 0.0125),
                    const Divider(
                        height: 0.15, thickness: 0.5, color: Colors.black26),
                    SizedBox(height: size.width * 0.0125),
                    Padding(
                      padding:
                          EdgeInsets.symmetric(vertical: size.width * 0.0125),
                      child: SizedBox(
                        width: double.infinity,
                        child: Text(
                          "Rating",
                          style: TextStyle(
                            color: theme.primaryColor,
                            fontWeight: FontWeight.w700,
                            fontSize: size.width * 0.02,
                          ),
                          textAlign: TextAlign.start,
                        ),
                      ),
                    ),
                    Ratings(
                      year: year,
                      currentMonth: currentMonth,
                      currentWeek: currentWeek,
                      weeksKey: weekRatingApproachesKey,
                      monthsKey: monthRatingApproachesKey,
                      data: data,
                    ),
                    SizedBox(height: size.width * 0.0125),
                    const Divider(
                        height: 0.15, thickness: 0.5, color: Colors.black26),
                    SizedBox(height: size.width * 0.0125),
                    Padding(
                      padding:
                          EdgeInsets.symmetric(vertical: size.width * 0.0125),
                      child: SizedBox(
                        width: double.infinity,
                        child: Text(
                          "Categories & Classification",
                          style: TextStyle(
                            color: theme.primaryColor,
                            fontWeight: FontWeight.w700,
                            fontSize: size.width * 0.025,
                          ),
                          textAlign: TextAlign.start,
                        ),
                      ),
                    ),
                    ArticlesCategories(
                      year: year,
                      currentMonth: currentMonth,
                      currentWeek: currentWeek,
                      chartKey: articleCategoriesKey,
                      data: data,
                    ),
                    SizedBox(height: size.width * 0.0125),
                    ArticlesClassifications(
                      year: year,
                      currentMonth: currentMonth,
                      currentWeek: currentWeek,
                      chartKey: articleClassificationKey,
                      data: data,
                    ),
                  ],
                ),
              ),
            );
          }),
    );
  }
}
