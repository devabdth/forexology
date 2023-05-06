from os.path import abspath, join, dirname


class Content:
    def __init__(self):
        self.global_: dict = {
            "EN": {
                "platformTitle": "FOREXology",
                "footerMsg": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lacus nibh, sagittis a ante eu, luctus fringilla est. Aliquam pulvinar justo iaculis lorem pretium elementum. In mauris quam, porttitor nec venenatis in, vulputate non arcu. Aliquam ac iaculis nisl. Morbi sit amet ante justo. Donec lectus erat, molestie at gravida in, convallis a massa. Aenean rutrum vel ligula consequat convallis. Suspendisse nec leo leo. Donec non mi nec eros consequat facilisis. In condimentum et libero ut hendrerit. Nullam scelerisque mauris ac nunc ultricies, eget tincidunt sapien ullamcorper.",
                "lightToFindUs": "Light to find Us!",
                "copyrightMsg": "All Copyrights reserved @ FOREXology, 2023",
                "search": "Search",
                "trendingNow": "Trending Now",
                "dontHaveAccount": "Don't have an account? Join us now!",
                "alreadyHaveAccount": "Have an account? Login now!",
                "email": "Email",
                "password": "Password",
                "homeEntryMsg": "Best of the week",
                "mostRecent": "Most Recent",
                "allArticles": "All Articles",
                "random": "Random",
                "all": "All",
                "ourLatestArticles": "Our Latest Articles",
                "ourArticles": "Our Articles",
                "featured": "Featured",
                "trending": "Trending",
                "ourBestWriters": "Our best <br><span>Writers</span>",
                "incaseYouMissed": "In Case You Missed!",
                "incaseYouMissedMsg": "In case you missed these articles, Check them out now!",
                "randomArticles": "Random Articles!",
                "randomArticlesMsg": "Based on your pervius choises, We've picked these articles for you!",
                "wannaJoinUs": "Curious about<br><span>Joining Us</span>",
                "applications": "Applications",
                "le": "L.E.",
                "classification": "Classification",
                "classifications": "Classifications",
                "category": "Category",
                "categories": "Categories",
                "writer": "Writer",
                "writers": "Writers",
                "articles": "Articles",
                "writtenBy": "Written By",
                "unavailable": "Unavailable",
                "listenMsg": "Listen to the article!",
                "unavailableMsg": "The article audio not available!",
                "shareMsg": "Share this article!",
                "rateMsg": "Rate this article!",
                "commentMsg": "Leave a comment!",
                "whatsYouWantToRead": "You want to read what?",
                "whatsYouWantToReadMsg": "Choose what do you want to read!",
                "filter": "Filter",
                "filterMsg": "Get the exact articles you're searching for!",
                "articleTitle": "Article Title",
                "discoverCategories": "Discover our <span class=\"underline\">Categories</span>",
                "discoverCategoriesMsg": "We've classified our articles to make it easy for you to find what you are searching for!",
                "featuredCategories": "Featured Categories",
                "featuredCategoriesMsg": "We've chosen these categories for you!",
                "allCategories": "All Categories",
                "allCategoriesMsg": "Check out all categories we have!",
            },
            "AR": {}
        }

        self.tabs: dict = {
            "EN": {
                "home": "Home",
                "courses": "Courses",
                "articles": "Articles",
                "tools": "Tools",
                "categories": "Categories",
                "audioArticles": "Audio Articles",
            },
            "AR": {}
        }

        self.actions: dict = {
            "EN": {
                "login": "Login",
                "signup": "Sign Up",
                "seeMore": "See more",
                "rememberMe": "Remember me",
                "forgetPassword": "Forget Password?",
                "seeAllArticles": "See all articles",
                "seeMyArticles": "See My Articles",
                "seeAllJobs": "See All Jobs",
                "apply": "Apply",
                "applyNow": "Apply Now",
                "listen": "Listen",
                "share": "Share",
                "rate": "Rate",
                "comment": "Comment",
                "shareLinkVia": "Share article via...",
                "shareLink": "Share article's link!",
                "clear": "Clear"
            },
            "AR": {}
        }

        self.placeholders: dict = {
            "EN": {
                "search": "Search by name, keywords, etc...",
                "emailUsernameFieldPlaceholder": "Email Address or Username",
                "emailFieldPlaceholder": "Email Address",
                "nameFieldPlaceholder": "Name",
                "passwordFieldPlaceholder": "Enter your Password!",
                "repasswordFieldPlaceholder": "Re-enter your Password!",
            }
        }

        self.salary_types: dict = {
            "EN": {
                0: "Per Month",
                1: "Per Task",
                2: "Per Milestone",
                3: "Per Project",
                4: "Long-time Contract",
                5: "Short-time Contract",
            }
        }
