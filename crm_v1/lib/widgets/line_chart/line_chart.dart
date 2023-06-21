/// Package import
import 'package:flutter/material.dart';

/// Chart import
import 'package:syncfusion_flutter_charts/charts.dart';

/// Local import

///Renders default line series chart
class LineDefault extends StatefulWidget {
  final String chartTitle;
  final List<String> titles;
  final Map<String, List<LineChartData>> chartData;
  final double? xInterval, yInterval;
  final String? xAxisTitle, yAxisTitle;
  final bool enableLegend;

  ///Creates default line series chart
  LineDefault(
    Key key, {
    required this.chartTitle,
    required this.titles,
    required this.chartData,
    this.xInterval,
    this.yInterval,
    this.xAxisTitle,
    this.yAxisTitle,
    this.enableLegend = true,
  }) : super(key: key);

  @override
  _LineDefaultState createState() => _LineDefaultState();
}

class _LineDefaultState extends State<LineDefault> {
  _LineDefaultState();

  @override
  Widget build(BuildContext context) {
    return SfCartesianChart(
      plotAreaBorderWidth: 0,
      title: ChartTitle(text: widget.chartTitle),
      legend: !widget.enableLegend
          ? null
          : Legend(isVisible: true, overflowMode: LegendItemOverflowMode.wrap),
      primaryXAxis: NumericAxis(
          title: AxisTitle(text: widget.xAxisTitle),
          edgeLabelPlacement: EdgeLabelPlacement.shift,
          interval: widget.xInterval ?? 1,
          majorGridLines: const MajorGridLines(width: 0)),
      primaryYAxis: NumericAxis(
          title: AxisTitle(text: widget.yAxisTitle),
          edgeLabelPlacement: EdgeLabelPlacement.shift,
          interval: widget.yInterval ?? 100,
          majorGridLines: const MajorGridLines(width: 0)),
      series: _getDefaultLineSeries(widget.titles, widget.chartData),
      tooltipBehavior: TooltipBehavior(enable: true),
    );
  }

  /// The method returns line series to chart.
  List<LineSeries<LineChartData, num>> _getDefaultLineSeries(
      List<String> titles, Map<String, List<LineChartData>> chartData) {
    return List<LineSeries<LineChartData, num>>.generate(
      titles.length,
      (i) => LineSeries<LineChartData, num>(
          animationDuration: 2500,
          dataSource: chartData[titles[i]]!,
          xValueMapper: (LineChartData sales, _) => sales.x,
          yValueMapper: (LineChartData sales, _) => sales.y,
          width: 2,
          name: titles[i],
          markerSettings: const MarkerSettings(isVisible: true)),
    ).toList();
  }

  @override
  void dispose() {
    widget.chartData.clear();
    super.dispose();
  }
}

class LineChartData {
  LineChartData(this.x, this.y, this.y2);
  final double x;
  final double y;
  final double y2;
}
