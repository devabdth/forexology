import 'package:flutter/material.dart';
import 'package:get/get.dart';

class SnippetCard extends StatelessWidget {
  String title;
  String value;
  String? valueUnit;
  Color color;

  SnippetCard({
    Key? key,
    required this.title,
    required this.value,
    required this.color,
    this.valueUnit,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return Container(
      width: size.width * 0.185,
      height: size.width * 0.075,
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Stack(
        children: [
          Positioned(
            bottom: 0,
            right: 0,
            child: Container(
              width: size.width * 0.185,
              height: size.width * 0.075,
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  gradient: const LinearGradient(
                    stops: [0, 1],
                    colors: [Colors.black54, Colors.transparent],
                    begin: Alignment.bottomRight,
                    end: Alignment.center,
                  )),
            ),
          ),
          Positioned(
            top: size.width * 0.005,
            left: size.width * 0.01,
            child: Text(
              title,
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.w500,
                fontSize: size.width * 0.01,
                fontFamily: 'Raleway',
              ),
            ),
          ),
          Positioned(
            bottom: size.width * 0.005,
            right: size.width * 0.01,
            child: RichText(
              textAlign: TextAlign.end,
              text: TextSpan(
                children: <InlineSpan>[
                  TextSpan(
                    text: value,
                    style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w700,
                      fontSize: size.width * 0.015,
                      fontFamily: 'Poppins',
                    ),
                  ),
                  if (valueUnit != null) ...[
                    TextSpan(
                      text: "\n$valueUnit",
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w300,
                        fontSize: size.width * 0.0075,
                        fontFamily: 'Poppins',
                      ),
                    )
                  ]
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
