import 'package:crm_v1/widgets/line_chart/line_chart.dart';
import 'package:flutter/material.dart';

class Comments extends StatelessWidget {
  final GlobalKey weeksKey, monthsKey;
  final Map data;
  final int year, currentMonth, currentWeek;
  const Comments({
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
                  text: "Comments / Week",
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
                    "Comments": [],
                  };

                  for (var i = 1; i <= currentMonth; i++) {
                    chartData["Comments"]!.add(LineChartData(
                        i.toDouble(),
                        data["$year"]["months"]["$i"]["TOTAL_COMMENTS"]
                            .toDouble(),
                        ((i / currentMonth) * 100).toDouble()));
                  }
                  return LineDefault(
                    monthsKey,
                    enableLegend: false,
                    chartTitle: "",
                    titles: const ["Comments"],
                    chartData: chartData,
                    xInterval: 1,
                    xAxisTitle: "Month",
                    yAxisTitle: "Comment",
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
                  text: "Comments / Month",
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
                    "Comments": [],
                  };

                  for (var i = 1; i <= currentWeek; i++) {
                    chartData["Comments"]!.add(LineChartData(
                        i.toDouble(),
                        data["$year"]["weeks"]["$i"]["TOTAL_COMMENTS"]
                            .toDouble(),
                        ((i / currentMonth) * 100).toDouble()));
                  }
                  return LineDefault(
                    weeksKey,
                    enableLegend: false,
                    chartTitle: "",
                    titles: const ["Comments"],
                    chartData: chartData,
                    xInterval: 1,
                    xAxisTitle: "Week",
                    yAxisTitle: "Comment",
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
