import 'package:crm_v1/widgets/line_chart/line_chart.dart';
import 'package:flutter/material.dart';

class Ratings extends StatelessWidget {
  final GlobalKey weeksKey, monthsKey;
  final Map data;
  final int year, currentMonth, currentWeek;
  const Ratings({
    Key? key,
    required this.year,
    required this.currentMonth,
    required this.currentWeek,
    required this.weeksKey,
    required this.monthsKey,
    required this.data,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final size = MediaQuery.of(context).size;
    return Row(
      children: [
        Expanded(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              RichText(
                  text: TextSpan(children: <InlineSpan>[
                TextSpan(
                  text: "Rating Approach / Week",
                  style: TextStyle(
                    color: theme.colorScheme.primary,
                    fontSize: size.width * 0.01,
                    fontWeight: FontWeight.w500,
                    fontFamily: "Raleway",
                  ),
                ),
                TextSpan(
                  text:
                      "\nRecords for Users attempted to rate an article in each week of year ($year)",
                  style: TextStyle(
                    color: theme.colorScheme.onPrimary,
                    fontSize: size.width * 0.0075,
                    fontWeight: FontWeight.w300,
                    fontFamily: "Poppins",
                  ),
                ),
              ])),
              SizedBox(height: size.width * 0.005),
              Container(
                decoration: BoxDecoration(
                  color: theme.colorScheme.onBackground,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Builder(builder: (context) {
                  final Map<String, List<LineChartData>> chartData =
                      <String, List<LineChartData>>{
                    "Rating Approaches": [],
                  };

                  for (var i = 1; i <= currentMonth; i++) {
                    chartData["Rating Approaches"]!.add(LineChartData(
                        i.toDouble(),
                        data["$year"]["months"]["$i"]
                                ["TOTAL_RATINGS_APPROACHES"]
                            .toDouble(),
                        ((i / currentMonth) * 100).toDouble()));
                  }
                  return LineDefault(
                    monthsKey,
                    enableLegend: false,
                    chartTitle: "",
                    titles: const ["Rating Approaches"],
                    chartData: chartData,
                    xInterval: 1,
                    xAxisTitle: "Month",
                    yAxisTitle: "User",
                    yInterval: 100,
                  );
                }),
              ),
            ],
          ),
        ),
        SizedBox(width: size.width * 0.005),
        Expanded(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              RichText(
                  text: TextSpan(children: <InlineSpan>[
                TextSpan(
                  text: "Rating Approach / Week",
                  style: TextStyle(
                    color: theme.colorScheme.primary,
                    fontSize: size.width * 0.01,
                    fontWeight: FontWeight.w500,
                    fontFamily: "Raleway",
                  ),
                ),
                TextSpan(
                  text:
                      "\nRecords for Users attempted to rate an article in each week of year ($year)",
                  style: TextStyle(
                    color: theme.colorScheme.onPrimary,
                    fontSize: size.width * 0.0075,
                    fontWeight: FontWeight.w300,
                    fontFamily: "Poppins",
                  ),
                ),
              ])),
              SizedBox(height: size.width * 0.005),
              Container(
                decoration: BoxDecoration(
                  color: theme.colorScheme.onBackground,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Builder(builder: (context) {
                  final Map<String, List<LineChartData>> chartData =
                      <String, List<LineChartData>>{
                    "Rating Approaches": [],
                  };

                  for (var i = 1; i <= currentWeek; i++) {
                    chartData["Rating Approaches"]!.add(LineChartData(
                        i.toDouble(),
                        data["$year"]["weeks"]["$i"]["TOTAL_RATINGS_APPROACHES"]
                            .toDouble(),
                        ((i / currentMonth) * 100).toDouble()));
                  }
                  return LineDefault(
                    weeksKey,
                    enableLegend: false,
                    chartTitle: "",
                    titles: const ["Rating Approaches"],
                    chartData: chartData,
                    xInterval: 1,
                    xAxisTitle: "Week",
                    yAxisTitle: "User",
                    yInterval: 100,
                  );
                }),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
