from os.path import abspath, join, dirname
from json import loads


class Consts:
    def __init__(self):
        self.salaries_types= [0, 1, 2, 3, 4, 5]

        self.job_types= [0, 1, 2, 3]

        self.covers_supported_extenstions: list = [
            'png', 'jpg', 'jpeg', 'gif', 'jfjf', 'webp'
        ]
        self.audios_supported_extenstions: list= ['mp3', 'aac']
        self.videos_supported_extenstions: list= ['mp4', 'mpg', 'mpeg', 'flv', 'm2v']
        self.cvs_supported_extenstions: list = [
            'pdf'
        ]
        self.admin_accesses= {
            "0": "Layout",
            "1": "CRM",
            "2": "Categories",
            "3": "Careers",
            "4": "Ads Spaces",
            "5": "Writers",
            "6": "Admins",
            "7": "Courses",
            "8": "Agenda",
        }

        self.header_fixed_tabs= [
            {
                "id": 'a05685021712b94519ea3dade83cf7323cd9419b362af0cb',
                "mode": 'link',
                "text": 'home',
                "redirect": '/'
            },
            {
                "id": 'a05685021712b94519ea3dade83cf7323cd9419b362af1cb',
                "mode": 'link',
                "text": 'aboutUs',
                "redirect": '/about/'
            },
            {
                "id": 'a05685021712b94519ea3dade83cf7323cd9419b362af6cb',
                "mode": 'link',
                "text": 'agenda',
                "redirect": '/agenda/'
            },
            {
                "id": 'a05685021712b94519ea3dade83cf7323cd9419b362af2cb',
                "mode": 'link',
                "text": 'articles',
                "redirect": '/articles/'
            },
            {
                "id": 'a05685021712b94519ea3dade83cf7323cd9419b362af3cb',
                "mode": 'link',
                "text": 'careers',
                "redirect": '/careers/'
            },
            {
                "id": 'a05685021712b94519ea3dade83cf7323cd9419b362af4cb',
                "mode": 'link',
                "text": 'categories',
                "redirect": '/categories/'
            },
            {
                "id": 'a05685021712b94519ea3dade83cf7323cd9419b362af5cb',
                "mode": 'link',
                "text": 'classification',
                "redirect": '/classification/'
            },
            {
                "id": 'a05685021712b94519ea3dade83cf7323cd9419b362af9cb',
                "mode": 'link',
                "text": 'courses',
                "redirect": '/courses/'
            },
        ]

        self.podcast_supported_extenstions: list = ["mp3"]
        self.video_supported_extenstions: list = ["mp4"]

        with open(abspath(join(dirname(__file__), '../jsons/routers.json'))) as f:
            data = loads(f.read())
            # Admin Routes
            self.admin_publish_form_routes = data['ADMIN_PUBLISH_ROUTE']

            # Website Routes
            self.careers_route = data['WEBSITE_CAREERS_ROUTE']
            self.jobs_route = data['WEBSITE_JOBS_ROUTE']
            self.index_route = data['WEBSITE_INDEX_ROUTE']
            self.home_route = data['WEBSITE_HOME_ROUTE']
            self.main_page_route = data['WEBSITE_MAIN_PAGE_ROUTE']
            self.main_route = data['WEBSITE_MAIN_ROUTE']
            self.articles_route = data['WEBSITE_ARTICLES_ROUTE']
            self.courses_route = data['WEBSITE_COURSES_ROUTE']
            self.course_cover_route = data['WEBSITE_COURSES_COVER_ROUTE']
            self.course_route = data['WEBSITE_COURSE_ROUTE']
            self.tools_route = data['WEBSITE_TOOLS_ROUTE']
            self.search_route = data['WEBSITE_SEARCH_ROUTE']
            self.login_route = data['WEBSITE_LOGIN_ROUTE']
            self.logout_route = data['WEBSITE_LOGOUT_ROUTE']
            self.signup_route = data['WEBSITE_SIGNUP_ROUTE']
            self.join_route = data['WEBSITE_JOIN_ROUTE']
            self.articles_covers = data['WEBSITE_ASSETS_ARTICLES_COVERS_ROUTE']
            self.article_section_covers = data['WEBSITE_ASSETS_ARTICLES_SECTIONS_COVERS_ROUTE']
            self.article_section_audios = data['WEBSITE_ASSETS_ARTICLES_SECTIONS_AUDIOS_ROUTE']
            self.article_section_videos = data['WEBSITE_ASSETS_ARTICLES_SECTIONS_VIDEOS_ROUTE']
            self.ads_covers = data['WEBSITE_ASSETS_ADS_COVERS_ROUTE']
            self.articles_podcast = data['WEBSITE_ARTICLE_PODCAST_ROUTE']
            self.categories_covers = data['WEBSITE_ASSETS_CATEGORIES_COVERS_ROUTE']
            self.categories_icons = data['WEBSITE_ASSETS_CATEGORIES_ICONS_ROUTE']
            self.categories_route = data['WEBSITE_CATEGORIES_ROUTE']
            self.single_category_route = data['WEBSITE_SINGLE_CATEGORY_ROUTE']
            self.single_classification_route = data['WEBSITE_SINGLE_CLASSIFICATION_ROUTE']
            self.writers_bg_free = data['WEBSITE_ASSETS_WRITERS_BGREE_ROUTE']
            self.writers_images = data['WEBSITE_ASSETS_WRITERS_ROUTE']
            self.writers_covers = data['WEBSITE_ASSETS_WRITERS_COVERS_ROUTE']
            self.applications_cvs = data['WEBSITE_ASSETS_JOB_APPLICATIONS_CVS_ROUTE']
            self.article_route = data['WEBSITE_ARTICLE_ROUTE']
            self.read_route = data['WEBSITE_READ_ROUTE']
            self.journal_route = data['WEBSITE_JOURNAL_ROUTE']
            self.article_readtime_route = data['WEBSITE_READTIME_ROUTE']
            self.session_handler = data['WEBSITE_SESSION_HANDLER']
            self.all_articles_route = data['WEBSITE_ARTICLEs_ROUTE']
            self.all_articles_read_route = data['WEBSITE_ARTICLES_READ_ROUTE']
            self.all_articles_journal_route = data['WEBSITE_ARTICLES_JOURNAL_ROUTE']
            self.writer_route = data['WEBSITE_WRITER_ROUTE']
            self.password_reset = data['WEBSITE_PASSWORD_RESET']
            self.agenda = data['WEBSITE_AGENDA_RESET']
            self.calender = data['WEBSITE_CALENDER_RESET']
            self.economic_calender = data['WEBSITE_ECONOMIC_CALENDER_RESET']
            self.economic_agenda = data['WEBSITE_ECONOMIC_AGENDA_RESET']
            self.about = data['WEBSITE_ABOUT']
            self.about_us = data['WEBSITE_ABOUT_US']
            self.who_are_we = data['WEBSITE_WHO_ARE_WE']

            # Admin Routers
            self.admin_login_route = data['ADMIN_LOGIN_ROUTE']
            self.admin_logout_route = data['ADMIN_LOGOUT_ROUTE']
            self.admin_layout_route = data['ADMIN_LAYOUT_ROUTE']
            self.admin_agenda_route = data['ADMIN_AGENDA_ROUTE']
            self.admin_layout_articles_ads_route = data['ADMIN_LAYOUT_ARTICLES_ADS_ROUTE']
            self.admin_careers_route = data['ADMIN_CAREERS_ROUTE']
            self.admin_categories_route = data['ADMIN_CATEGORIES_ROUTE']
            self.admin_parent_categories_route = data['ADMIN_PARENT_CATEGORIES_ROUTE']
            self.admin_main_page = data['ADMIN_MAIN_ROUTE']
            self.admins_management_page = data['ADMIN_MANAGEMENT_ROUTE']
            self.admin_ads_route = data['ADMIN_ADS_ROUTE']
            self.admin_writers_route = data['ADMIN_WRITERS_ROUTE']
            self.admin_courses_route = data['ADMIN_COURSES_ROUTE']

            # Publishing Panel Routers:
            self.publisher_login_route= data['PUBLISHER_LOGIN_ROUTE']
            self.publisher_logout_route= data['PUBLISHER_LOGOUT_ROUTE']
            self.publisher_main_page= data['PUBLISHER_HOME_ROUTE']
            self.publisher_create_page= data['PUBLISHER_CREATE_ROUTE']
            self.publisher_articles_page= data['PUBLISHER_ARTICLES_ROUTE']
            self.publisher_profile_page= data['PUBLISHER_PROFILE_ROUTE']
            self.publisher_publish_draft_page= data['PUBLISHER_PUBLISH_DRAFT_ROUTE']


            # CRM Panel Routers:
            self.crm_articles_route= data["CRM_ARTICLES_ROUTE"]