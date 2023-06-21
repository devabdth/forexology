import 'package:crm_v1/widgets/line_chart/line_chart.dart';
import 'package:flutter/material.dart';

class Views extends StatelessWidget {
  final GlobalKey weeksKey, monthsKey;
  final Map data;
  final int year, currentMonth, currentWeek;
  const Views({
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
                  text: "Views / Month",
                  style: TextStyle(
                    color: theme.colorScheme.primary,
                    fontSize: size.width * 0.01,
                    fontWeight: FontWeight.w500,
                    fontFamily: "Raleway",
                  ),
                ),
                TextSpan(
                  text: "\nRecords for comments in each month of year ($year)",
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
                    "Views": [],
                  };

                  for (var i = 1; i <= currentMonth; i++) {
                    chartData["Views"]!.add(LineChartData(
                        i.toDouble(),
                        data["$year"]["months"]["$i"]["TOTAL_VIEWS"].toDouble(),
                        ((i / currentMonth) * 100).toDouble()));
                  }
                  return LineDefault(
                    monthsKey,
                    enableLegend: false,
                    chartTitle: "",
                    titles: const ["Views"],
                    chartData: chartData,
                    xInterval: 1,
                    xAxisTitle: "Month",
                    yAxisTitle: "Views",
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
                  text: "Views / Week",
                  style: TextStyle(
                    color: theme.colorScheme.primary,
                    fontSize: size.width * 0.01,
                    fontWeight: FontWeight.w500,
                    fontFamily: "Raleway",
                  ),
                ),
                TextSpan(
                  text: "\nRecords for comments in each week of year ($year)",
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
                    "Views": [],
                  };

                  for (var i = 1; i <= currentWeek; i++) {
                    chartData["Views"]!.add(LineChartData(
                        i.toDouble(),
                        data["$year"]["weeks"]["$i"]["TOTAL_VIEWS"].toDouble(),
                        ((i / currentMonth) * 100).toDouble()));
                  }
                  return LineDefault(
                    weeksKey,
                    enableLegend: false,
                    chartTitle: "",
                    titles: const ["Views"],
                    chartData: chartData,
                    xInterval: 1,
                    xAxisTitle: "Week",
                    yAxisTitle: "Views",
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
