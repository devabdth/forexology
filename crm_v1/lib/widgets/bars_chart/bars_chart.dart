import 'package:flutter/material.dart';

/// Chart import
import 'package:syncfusion_flutter_charts/charts.dart';

/// Renders column chart with rounded corners
class BarsChart extends StatefulWidget {
  final List<BarsChartData> chartData;
  const BarsChart(
    Key key, {
    required this.chartData,
  }) : super(key: key);

  @override
  _BarsChartState createState() => _BarsChartState();
}

class _BarsChartState extends State<BarsChart> {
  _BarsChartState();
  TooltipBehavior? _tooltipBehavior;
  @override
  void initState() {
    _tooltipBehavior = TooltipBehavior(
        enable: true,
        canShowMarker: false,
        format: 'point.x : point.y Article',
        header: '');
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return SfCartesianChart(
      plotAreaBorderWidth: 0,
      title: ChartTitle(text: ''),
      primaryXAxis: CategoryAxis(
        labelStyle: const TextStyle(color: Colors.white),
        axisLine: const AxisLine(width: 0),
        labelPosition: ChartDataLabelPosition.inside,
        majorTickLines: const MajorTickLines(width: 0),
        majorGridLines: const MajorGridLines(width: 0),
      ),
      primaryYAxis: NumericAxis(isVisible: false),
      series: _getRoundedColumnSeries(),
      tooltipBehavior: _tooltipBehavior,
    );
  }

  /// Get rounded corner column series
  List<ColumnSeries<BarsChartData, String>> _getRoundedColumnSeries() {
    return <ColumnSeries<BarsChartData, String>>[
      ColumnSeries<BarsChartData, String>(
        width: 0.9,
        dataLabelSettings: const DataLabelSettings(
            isVisible: true, labelAlignment: ChartDataLabelAlignment.top),
        dataSource: widget.chartData,

        /// If we set the border radius value for column series,
        /// then the series will appear as rounder corner.
        borderRadius: BorderRadius.circular(10),
        xValueMapper: (BarsChartData sales, _) => sales.x,
        yValueMapper: (BarsChartData sales, _) => sales.y,
      ),
    ];
  }
}

class BarsChartData {
  final String x;
  final int y;

  const BarsChartData({required this.x, required this.y});
}
