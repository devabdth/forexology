import 'package:crm_v1/widgets/spline_area_chart/spline_area.dart';
import 'package:flutter/material.dart';

class ReadTimeMonth extends StatelessWidget {
  final GlobalKey chartKey;
  final Map data;
  final int year, currentMonth, currentWeek;
  const ReadTimeMonth({
    Key? key,
    required this.year,
    required this.currentMonth,
    required this.currentWeek,
    required this.chartKey,
    required this.data,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final size = MediaQuery.of(context).size;
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        RichText(
            text: TextSpan(children: <InlineSpan>[
          TextSpan(
            text: "Read Time / Month",
            style: TextStyle(
              color: theme.colorScheme.primary,
              fontSize: size.width * 0.01,
              fontWeight: FontWeight.w500,
              fontFamily: "Raleway",
            ),
          ),
          TextSpan(
            text:
                "\nRecords for read time that the articles achieved in each month of year ($year)",
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
            final Map<String, List<SplineChartData>> chartData =
                <String, List<SplineChartData>>{
              "Read Time": [],
            };

            for (var i = 1; i <= currentMonth; i++) {
              chartData["Read Time"]!.add(SplineChartData(
                  i.toDouble(),
                  data["$year"]["months"]["$i"]["TOTAL_READTIME"].toDouble(),
                  ((i / currentMonth) * 100).toDouble()));
            }
            return SplineArea(
              chartKey,
              chartData: chartData,
              titles: const ["Read Time"],
              xAxisTitle: "Month",
              yAxisTitle: "Minutes",
              xInterval: 1,
              yInterval: 1000,
            );
          }),
        ),
      ],
    );
  }
}
