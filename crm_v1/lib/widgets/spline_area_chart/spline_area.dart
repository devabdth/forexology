/// Package import
import 'package:flutter/material.dart';

/// Chart import
import 'package:syncfusion_flutter_charts/charts.dart';

/// Local import

/// Renders the spline area chart sample.
class SplineArea extends StatefulWidget {
  final List<String> titles;
  final Map<String, List<SplineChartData>> chartData;
  final String? xAxisTitle, yAxisTitle;
  final double? xInterval, yInterval;

  /// Creates the spline area chart sample.
  const SplineArea(Key key,
      {required this.titles,
      required this.chartData,
      this.xAxisTitle,
      this.yAxisTitle,
      this.xInterval,
      this.yInterval})
      : super(key: key);

  @override
  _SplineAreaState createState() => _SplineAreaState();
}

/// State class of the spline area chart.
class _SplineAreaState extends State<SplineArea> {
  @override
  Widget build(BuildContext context) {
    return SfCartesianChart(
      legend: Legend(isVisible: true, opacity: 0.7),
      title: ChartTitle(text: ''),
      plotAreaBorderWidth: 0,
      primaryXAxis: NumericAxis(
          title: AxisTitle(text: widget.xAxisTitle),
          interval: widget.xInterval ?? 1,
          majorGridLines: const MajorGridLines(width: 0),
          edgeLabelPlacement: EdgeLabelPlacement.shift),
      primaryYAxis: NumericAxis(
          title: AxisTitle(text: widget.yAxisTitle),
          interval: widget.yInterval ?? 1,
          majorGridLines: const MajorGridLines(width: 0),
          edgeLabelPlacement: EdgeLabelPlacement.shift),
      series: _getSplieAreaSeries(
          chartData: widget.chartData, titles: widget.titles),
      tooltipBehavior: TooltipBehavior(enable: true),
    );
  }

  /// Returns the list of chart series
  /// which need to render on the spline area chart.
  List<ChartSeries<SplineChartData, double>> _getSplieAreaSeries(
      {required Map<String, List<SplineChartData>> chartData,
      required List<String> titles}) {
    return List<ChartSeries<SplineChartData, double>>.generate(
        titles.length,
        (i) => SplineAreaSeries<SplineChartData, double>(
              dataSource: chartData[titles[i]]!,
              color: const Color.fromRGBO(75, 135, 185, 0.6),
              borderColor: const Color.fromRGBO(75, 135, 185, 1),
              borderWidth: 2,
              name: titles[i],
              xValueMapper: (SplineChartData sales, _) => sales.month,
              yValueMapper: (SplineChartData sales, _) => sales.y1,
            ));
  }

  @override
  void dispose() {
    widget.chartData.clear();
    super.dispose();
  }
}

/// Private class for storing the spline area chart datapoints.
class SplineChartData {
  SplineChartData(this.month, this.y1, this.y2);
  final double month;
  final double y1;
  final double y2;
}
