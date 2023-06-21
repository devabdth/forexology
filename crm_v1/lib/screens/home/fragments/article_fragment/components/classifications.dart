import 'package:crm_v1/widgets/bars_chart/bars_chart.dart';
import 'package:flutter/material.dart';

class ArticlesClassifications extends StatefulWidget {
  final int year, currentMonth, currentWeek;
  final Map data;
  final GlobalKey chartKey;
  const ArticlesClassifications({
    Key? key,
    required this.year,
    required this.data,
    required this.currentMonth,
    required this.currentWeek,
    required this.chartKey,
  }) : super(key: key);

  @override
  _ClassificationsState createState() => _ClassificationsState();
}

class _ClassificationsState extends State<ArticlesClassifications> {
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
                  text: "Classifications Production",
                  style: TextStyle(
                    color: theme.colorScheme.primary,
                    fontSize: size.width * 0.01,
                    fontWeight: FontWeight.w500,
                    fontFamily: "Raleway",
                  ),
                ),
                TextSpan(
                  text:
                      "\nRecords for the articles that published in each classifications (${widget.year})",
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
                  final chartData = <BarsChartData>[];
                  for (var key in widget
                      .data["${widget.year}"]["overall"]["CLASSIFICATIONS"]!
                      .keys) {
                    chartData.add(BarsChartData(
                        x: "$key 1",
                        y: widget.data["${widget.year}"]["overall"]
                            ["CLASSIFICATIONS"]![key]));
                    chartData.add(BarsChartData(
                        x: "$key 2",
                        y: widget.data["${widget.year}"]["overall"]
                            ["CLASSIFICATIONS"]![key]));
                    chartData.add(BarsChartData(
                        x: "$key 3",
                        y: widget.data["${widget.year}"]["overall"]
                            ["CLASSIFICATIONS"]![key]));
                    chartData.add(BarsChartData(
                        x: "$key 4",
                        y: widget.data["${widget.year}"]["overall"]
                            ["CLASSIFICATIONS"]![key]));
                    chartData.add(BarsChartData(
                        x: "$key 5",
                        y: widget.data["${widget.year}"]["overall"]
                            ["CLASSIFICATIONS"]![key]));
                    chartData.add(BarsChartData(
                        x: "$key 6",
                        y: widget.data["${widget.year}"]["overall"]
                            ["CLASSIFICATIONS"]![key]));
                    chartData.add(BarsChartData(
                        x: "$key 7",
                        y: widget.data["${widget.year}"]["overall"]
                            ["CLASSIFICATIONS"]![key]));
                    chartData.add(BarsChartData(
                        x: "$key 8",
                        y: widget.data["${widget.year}"]["overall"]
                            ["CLASSIFICATIONS"]![key]));
                  }
                  return BarsChart(
                    widget.chartKey,
                    chartData: chartData,
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
