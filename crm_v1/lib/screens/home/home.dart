import 'package:flutter/material.dart';
import './fragments/article_fragment/article_fragment.dart';
import './fragments/writers_fragment.dart';
import './fragments/users_fragment.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final _controller = PageController();
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final size = MediaQuery.of(context).size;

    return Scaffold(
      body: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          // Fragments Controllers
          Container(
            width: size.width * 0.15,
            height: size.height,
            color: theme.primaryColor,
          ),
          // Fragments
          SizedBox(
            width: size.width * 0.85,
            height: size.height,
            child: PageView(
              controller: _controller,
              children: const [
                ArticlesFragment(),
                UsersFragment(),
                WritersFragment(),
              ],
            ),
          )
        ],
      ),
    );
  }
}
