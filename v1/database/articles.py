from os.path import dirname, abspath, join, exists
from datetime import datetime
from models.article import Article
from models.thread import Thread
from models.article_section import ArticleSection
import secrets
from plugins.consts import Consts

class ArticlesDatabaseHelper:
    def __init__(self):
        self.consts: Consts= Consts()
        self.trending_articles: list = [
            Article({
                "id": "a05685021712b94519ea3dade83cf7323cd9419b362af0cb",
                "title": {
                    "EN": "Will the US Federal Reserve surprise the markets and raise interest? The expected scenario!",
                    "AR": "هل يفاجأ الفيدرالي الأمريكي الأسواق ويرفع الفائدة؟ السيناريو المتوقع!",
                },
                "short_brief": {
                    "AR": "سوف تتابع أسواق العملات وبخاصة متداولي الدولار باهتمام كبير صدور قرارات الفيدرالي الأمريكي المرتقبة بشأن السياسة النقدية، والتي سيعقبها المؤتمر الصحفي لمحافظ البنك،..",
                    "EN": "Currency markets, especially dollar traders, will follow with great interest the issuance of the upcoming US Federal Reserve decisions regarding monetary policy, which will be followed by the press conference of the bank’s governor,..",
                },
                "cover_attached_msg": {
                    "EN": "",
                    "AR": ""
                },
                "parent_category": "1788ef9f6b6e66bf16f1513c",
                "category": "c748d040ace4a78cf751f93d",
                "sections": [
                    {
                    "title": {
                        "EN": "Will the US Federal Reserve surprise the markets and raise interest? The expected scenario!",
                        "AR": "هل يفاجأ الفيدرالي الأمريكي الأسواق ويرفع الفائدة؟ السيناريو المتوقع!",
                    },
                    "subtitle": {
                        "EN": "Article Subtitle",
                        "AR": "عنوان فرعي للمقال"
                    },
                    "bio": {
                        "AR": "سوف تتابع أسواق العملات وبخاصة متداولي الدولار باهتمام كبير صدور قرارات الفيدرالي الأمريكي المرتقبة بشأن السياسة النقدية، والتي سيعقبها المؤتمر الصحفي لمحافظ البنك،..",
                        "EN": "Currency markets, especially dollar traders, will follow with great interest the issuance of the upcoming US Federal Reserve decisions regarding monetary policy, which will be followed by the press conference of the bank’s governor,..",
                    },
                    "id": str(secrets.token_hex(12)),
                    "attachement_msg": {
                        "EN": "This is an Image",
                        "AR": "This is an Image",
                    },
                    "attachment_type": "IMAGE",
                    "action_text": {},
                    "action_link": "",
                    "attached_ad_id": "a05685021712b94519ea3dade83cf7323cd9419b362af5cb",
                    "audio_stop": ii * 0.5,
                    } for ii in range(10)
                ],
                "ratings": [3, 2.5, 1.5, 5, 5, 1.5, 2, 0, 1, 5, 4, 3],
                "comments": [],
                "thread": "",
                "published_in": str(datetime.now()),
                "published_by": ["49ead2d979eaa7cfd90672aa"],
                "attached_ad": "a05685021712b94519ea3dade83cf7323cd9419b362af5cb",
                "saves": 124,
                "views": 124,
                "mode": 1,
                "tags": ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"],
                "record_available": True,
                "read_time": {
                    f"a05685021712b94519ea3dade83cf7323cd9419b362af0cb_ARTICLE_SECTION_{ii}": 16 for ii in range(10)
                }

            }),
            Article({
                "id": "a05685021712b94519ea3dade83cf7323cd9419b362af1cb",
                "title": {
                    "EN": "Does the Fed volcano explode in the face of gold?",
                    "AR": "هل ينفجر بركان الفيدرالي في وجه الذهب؟",
                },
                "short_brief": {
                    "AR": "التحليل الفني اليومي للعملات والسلع والمؤشرات 14/6/2023 تفاصيل فيديو التحليل الفني",
                    "EN": "Does the Fed volcano explode in the face of gold?",
                },
                "cover_attached_msg": {
                    "EN": "",
                    "AR": ""
                },
                "parent_category": "1788ef9f6b6e66bf16f1513c",
                "category": "c748d040ace4a78cf751f93d",
                "sections": [
                    {
                    "title": {
                    "EN": "Does the Fed volcano explode in the face of gold?",
                    "AR": "هل ينفجر بركان الفيدرالي في وجه الذهب؟",
                    },
                    "subtitle": {
                        "EN": "Article Subtitle",
                        "AR": "عنوان فرعي للمقال"
                    },
                    "bio": {
                        "AR": "التحليل الفني اليومي للعملات والسلع والمؤشرات 14/6/2023 تفاصيل فيديو التحليل الفني",
                        "EN": "Does the Fed volcano explode in the face of gold?",
                    },
                    "id": str(secrets.token_hex(12)),
                    "attachement_msg": {
                        "EN": "This is an Image",
                        "AR": "This is an Image",
                    },
                    "attachment_type": "IMAGE",
                    "action_text": {},
                    "action_link": "",
                    "attached_ad_id": "a05685021712b94519ea3dade83cf7323cd9419b362af5cb",
                    "audio_stop": ii * 0.5,
                    } for ii in range(10)
                ],
                "ratings": [3, 2.5, 1.5, 5, 5, 1.5, 2, 0, 1, 5, 4, 3],
                "comments": [],
                "thread": "",
                "published_in": str(datetime.now()),
                "published_by": ["49ead2d979eaa7cfd90672aa"],
                "attached_ad": "a05685021712b94519ea3dade83cf7323cd9419b362af5cb",
                "saves": 124,
                "views": 1245,
                "mode": 1,
                "tags": ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"],
                "record_available": True,
                "read_time": {
                    f"a05685021712b94519ea3dade83cf7323cd9419b362af1cb_ARTICLE_SECTION_{ii}": 16 for ii in range(10)
                }

            }),
            Article({
                "id": "a05685021712b94519ea3dade83cf7323cd9419b362af2cb",
                "title": {
                    "EN": "Yellen talks about Western sanctions, relations with China, and the dollar's global dominance",
                    "AR": "يلين تتحدث عن العقوبات الغربية والعلاقات مع الصين وهيمنة الدولار العالمية",
                },
                "short_brief": {
                    "AR": "قالت وزير الخزانة الأمريكية جانيت يلين أمس الثلاثاء أثناء الإدلاء بشهادتها أمام الكونجرس، ببعض النقاط الهامة فيما يتعلق بالعقوبات المفروضة على روسيا والعلاقات الأمريكية",
                    "EN": "Yesterday, while testifying before Congress, US Treasury Secretary Janet Yellen said some important points regarding sanctions against Russia and US relations.",
                },
                "cover_attached_msg": {
                    "EN": "",
                    "AR": ""
                },
                "parent_category": "1788ef9f6b6e66bf16f1513c",
                "category": "c748d040ace4a78cf751f93d",
                "sections": [
                    {
                    "title": {
                        "EN": "Yellen talks about Western sanctions, relations with China, and the dollar's global dominance",
                        "AR": "يلين تتحدث عن العقوبات الغربية والعلاقات مع الصين وهيمنة الدولار العالمية",
                    },
                    "subtitle": {
                        "EN": "Article Subtitle",
                        "AR": "عنوان فرعي للمقال"
                    },
                    "bio": {
                        "AR": "قالت وزير الخزانة الأمريكية جانيت يلين أمس الثلاثاء أثناء الإدلاء بشهادتها أمام الكونجرس، ببعض النقاط الهامة فيما يتعلق بالعقوبات المفروضة على روسيا والعلاقات الأمريكية",
                        "EN": "Yesterday, while testifying before Congress, US Treasury Secretary Janet Yellen said some important points regarding sanctions against Russia and US relations.",
                    },
                    "id": str(secrets.token_hex(12)),
                    "attachement_msg": {
                        "EN": "This is an Image",
                        "AR": "This is an Image",
                    },
                    "attachment_type": "IMAGE",
                    "action_text": {},
                    "action_link": "",
                    "attached_ad_id": "a05685021712b94519ea3dade83cf7323cd9419b362af5cb",
                    "audio_stop": ii * 0.5,
                    } for ii in range(10)
                ],
                "ratings": [3, 2.5, 1.5, 5, 5, 1.5, 2, 0, 1, 5, 4, 3],
                "comments": [],
                "thread": "",
                "published_in": str(datetime.now()),
                "published_by": ["49ead2d979eaa7cfd90672aa"],
                "attached_ad": "a05685021712b94519ea3dade83cf7323cd9419b362af5cb",
                "saves": 124,
                "views": 242,
                "mode": 1,
                "tags": ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"],
                "record_available": True,
                "read_time": {
                    f"a05685021712b94519ea3dade83cf7323cd9419b362af2cb_ARTICLE_SECTION_{ii}": 16 for ii in range(10)
                }

            }),
            Article({
                "id": "a05685021712b94519ea3dade83cf7323cd9419b362af3cb",
                "title": {
                    "EN": "Urgent - the release of growth data in Britain",
                    "AR": "عاجل - صدور بيانات النمو في بريطانيا",
                },
                "short_brief": {
                    "AR": "أظهرت البيانات الصادرة صباح يوم الأربعاء عن مكتب الإحصاءات الوطنية في بريطانيا نمو الناتج المحلي الإجمالي بنسبة 0.2% خلال أبريل الماضي على أساس شهري، بما يتماشى مع",
                    "EN": "Data released on Wednesday morning by Britain's Office for National Statistics showed that the gross domestic product (GDP) grew by 0.2% in April on a monthly basis, in line with the previous forecast.",
                },
                "cover_attached_msg": {
                    "EN": "",
                    "AR": ""
                },
                "parent_category": "1788ef9f6b6e66bf16f1513c",
                "category": "c748d040ace4a78cf751f93d",
                "sections": [
                    {
                    "title": {
                        "EN": "Urgent - the release of growth data in Britain",
                        "AR": "عاجل - صدور بيانات النمو في بريطانيا",
                    },
                    "subtitle": {
                        "EN": "Article Subtitle",
                        "AR": "عنوان فرعي للمقال"
                    },
                    "bio": {
                        "AR": "أظهرت البيانات الصادرة صباح يوم الأربعاء عن مكتب الإحصاءات الوطنية في بريطانيا نمو الناتج المحلي الإجمالي بنسبة 0.2% خلال أبريل الماضي على أساس شهري، بما يتماشى مع",
                        "EN": "Data released on Wednesday morning by Britain's Office for National Statistics showed that the gross domestic product (GDP) grew by 0.2% in April on a monthly basis, in line with the previous forecast.",
                    },
                    "id": str(secrets.token_hex(12)),
                    "attachement_msg": {
                        "EN": "This is an Image",
                        "AR": "This is an Image",
                    },
                    "attachment_type": "IMAGE",
                    "action_text": {},
                    "action_link": "",
                    "attached_ad_id": "a05685021712b94519ea3dade83cf7323cd9419b362af5cb",
                    "audio_stop": ii * 0.5,
                    } for ii in range(10)
                ],
                "ratings": [3, 2.5, 1.5, 5, 5, 1.5, 2, 0, 1, 5, 4, 3],
                "comments": [],
                "thread": "",
                "published_in": str(datetime.now()),
                "published_by": ["49ead2d979eaa7cfd90672aa"],
                "attached_ad": "a05685021712b94519ea3dade83cf7323cd9419b362af5cb",
                "saves": 124,
                "views": 4233,
                "mode": 1,
                "tags": ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"],
                "record_available": True,
                "read_time": {
                    f"a05685021712b94519ea3dade83cf7323cd9419b362af3cb_ARTICLE_SECTION_{ii}": 16 for ii in range(10)
                }

            }),
            Article({
                "id": "a05685021712b94519ea3dade83cf7323cd9419b362af4cb",
                "title": {
                    "EN": "The International Monetary Fund makes recommendations on New Zealand's fiscal and monetary policy",
                    "AR": "صندوق النقد الدولي يقدم توصياته حول السياسة المالية والنقدية في نيوزيلندا",
                },
                "short_brief": {
                    "AR": "في البيان الختامي لبعثة صندوق النقد الدولي لنيوزيلندا في عام 2023، أشار صندوق النقد الدولي إلى أن اقتصاد نيوزيلندا من المحتمل أن يشهد حالة من التباطؤ الضروري ناتج عن",
                    "EN": "In the concluding statement of the International Monetary Fund's mission to New Zealand in 2023, the IMF indicated that New Zealand's economy is likely to experience a necessary slowdown as a result of",
                },
                "cover_attached_msg": {
                    "EN": "",
                    "AR": ""
                },
                "parent_category": "1788ef9f6b6e66bf16f1513c",
                "category": "c748d040ace4a78cf751f93d",
                "sections": [
                    {
                    "title": {
                        "EN": "The International Monetary Fund makes recommendations on New Zealand's fiscal and monetary policy",
                        "AR": "صندوق النقد الدولي يقدم توصياته حول السياسة المالية والنقدية في نيوزيلندا",
                    },
                    "subtitle": {
                        "EN": "Article Subtitle",
                        "AR": "عنوان فرعي للمقال"
                    },
                    "bio": {
                        "AR": "في البيان الختامي لبعثة صندوق النقد الدولي لنيوزيلندا في عام 2023، أشار صندوق النقد الدولي إلى أن اقتصاد نيوزيلندا من المحتمل أن يشهد حالة من التباطؤ الضروري ناتج عن",
                        "EN": "In the concluding statement of the International Monetary Fund's mission to New Zealand in 2023, the IMF indicated that New Zealand's economy is likely to experience a necessary slowdown as a result of",
                    },
                    "id": str(secrets.token_hex(12)),
                    "attachement_msg": {
                        "EN": "This is an Image",
                        "AR": "This is an Image",
                    },
                    "attachment_type": "IMAGE",
                    "action_text": {},
                    "action_link": "",
                    "attached_ad_id": "a05685021712b94519ea3dade83cf7323cd9419b362af5cb",
                    "audio_stop": ii * 0.5,
                    } for ii in range(10)
                ],
                "ratings": [3, 2.5, 1.5, 5, 5, 1.5, 2, 0, 1, 5, 4, 3],
                "comments": [],
                "thread": "",
                "published_in": str(datetime.now()),
                "published_by": ["49ead2d979eaa7cfd90672aa"],
                "attached_ad": "a05685021712b94519ea3dade83cf7323cd9419b362af5cb",
                "saves": 124,
                "views": 1222,
                "mode": 1,
                "tags": ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"],
                "record_available": True,
                "read_time": {
                    f"a05685021712b94519ea3dade83cf7323cd9419b362af4cb_ARTICLE_SECTION_{ii}": 16 for ii in range(10)
                }

            }),
            Article({
                "id": "a05685021712b94519ea3dade83cf7323cd9419b362af5cb",
                "title": {
                    "EN": "The People's Bank of China sets the price of the dollar against the yuan at 7.1566",
                    "AR": "بنك الصين الشعبي يحدد سعر الدولار مقابل اليوان عند 7.1566",
                },
                "short_brief": {
                    "AR": "قرر بنك الصين الشعبي صباح اليوم الأربعاء تحديد سعر صرف اليوان مقابل الدولار الأمريكي عند مستوى 7.1566 يوان لكل دولار، ويعد هذا أدنى مستوى يتم تحديد اليوان عنده",
                    "EN": "The People's Bank of China decided this morning, Wednesday, to set the exchange rate of the yuan against the US dollar at the level of 7.1566 yuan per dollar, and this is the lowest level at which the yuan is set.",
                },
                "cover_attached_msg": {
                    "EN": "",
                    "AR": ""
                },
                "parent_category": "1788ef9f6b6e66bf16f1513c",
                "category": "c748d040ace4a78cf751f93d",
                "sections": [
                    {
                    "title": {
                        "EN": "The People's Bank of China sets the price of the dollar against the yuan at 7.1566",
                        "AR": "بنك الصين الشعبي يحدد سعر الدولار مقابل اليوان عند 7.1566",
                    },
                    "subtitle": {
                        "EN": "Article Subtitle",
                        "AR": "عنوان فرعي للمقال"
                    },
                    "bio": {
                        "AR": "قرر بنك الصين الشعبي صباح اليوم الأربعاء تحديد سعر صرف اليوان مقابل الدولار الأمريكي عند مستوى 7.1566 يوان لكل دولار، ويعد هذا أدنى مستوى يتم تحديد اليوان عنده",
                        "EN": "The People's Bank of China decided this morning, Wednesday, to set the exchange rate of the yuan against the US dollar at the level of 7.1566 yuan per dollar, and this is the lowest level at which the yuan is set.",
                    },
                    "id": str(secrets.token_hex(12)),
                    "attachement_msg": {
                        "EN": "This is an Image",
                        "AR": "This is an Image",
                    },
                    "attachment_type": "IMAGE",
                    "action_text": {},
                    "action_link": "",
                    "attached_ad_id": "a05685021712b94519ea3dade83cf7323cd9419b362af5cb",
                    "audio_stop": ii * 0.5,
                    } for ii in range(10)
                ],
                "ratings": [3, 2.5, 1.5, 5, 5, 1.5, 2, 0, 1, 5, 4, 3],
                "comments": [],
                "thread": "",
                "published_in": str(datetime.now()),
                "published_by": ["49ead2d979eaa7cfd90672aa"],
                "attached_ad": "a05685021712b94519ea3dade83cf7323cd9419b362af5cb",
                "saves": 124,
                "views": 1324,
                "mode": 1,
                "tags": ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"],
                "record_available": True,
                "read_time": {
                    f"a05685021712b94519ea3dade83cf7323cd9419b362af5cb_ARTICLE_SECTION_{ii}": 16 for ii in range(10)
                }

            }),
            Article({
                "id": "a05685021712b94519ea3dade83cf7323cd9419b362af6cb",
                "title": {
                    "EN": "The Governor of the Bank of England makes important remarks",
                    "AR": "محافظ بنك إنجلترا يدلي بتصريحات مهمة",
                },
                "short_brief": {
                    "AR": "سوف تتابع أسواق العملات وبخاصة متداولي الدولار باهتمام كبير صدور قرارات الفيدرالي الأمريكي المرتقبة بشأن السياسة النقدية، والتي سيعقبها المؤتمر الصحفي لمحافظ البنك،",
                    "EN": "Currency markets, especially dollar traders, will follow with great interest the issuance of the upcoming US Federal Reserve decisions on monetary policy, which will be followed by the press conference of the Bank’s governor,",
                },
                "cover_attached_msg": {
                    "EN": "",
                    "AR": ""
                },
                "parent_category": "1788ef9f6b6e66bf16f1513c",
                "category": "c748d040ace4a78cf751f93d",
                "sections": [
                    {
                    "title": {
                        "EN": "The Governor of the Bank of England makes important remarks",
                        "AR": "محافظ بنك إنجلترا يدلي بتصريحات مهمة",
                    },
                    "subtitle": {
                        "EN": "Article Subtitle",
                        "AR": "عنوان فرعي للمقال"
                    },
                    "bio": {
                        "AR": "أدلى محافظ بنك إنجلترا أندرو بايلي ببعض التصريحات المهمة خلال شهادته أمام مجلس اللوردات البريطاني، حول الاقتصاد والقطاع المصرفي وتطورات السياسة النقدية داخل",
                        "EN": "Bank of England Governor Andrew Bailey made some important statements during his testimony before the British House of Lords, about the economy, the banking sector and monetary policy developments in the UK.",
                    },
                    "id": str(secrets.token_hex(12)),
                    "attachement_msg": {
                        "EN": "This is an Image",
                        "AR": "This is an Image",
                    },
                    "attachment_type": "IMAGE",
                    "action_text": {},
                    "action_link": "",
                    "attached_ad_id": "a05685021712b94519ea3dade83cf7323cd9419b362af5cb",
                    "audio_stop": ii * 0.5,
                    } for ii in range(10)
                ],
                "ratings": [3, 2.5, 1.5, 5, 5, 1.5, 2, 0, 1, 5, 4, 3],
                "comments": [],
                "thread": "",
                "published_in": str(datetime.now()),
                "published_by": ["49ead2d979eaa7cfd90672aa"],
                "attached_ad": "a05685021712b94519ea3dade83cf7323cd9419b362af5cb",
                "saves": 124,
                "views": 124,
                "mode": 1,
                "tags": ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"],
                "record_available": True,
                "read_time": {
                    f"a05685021712b94519ea3dade83cf7323cd9419b362af6cb_ARTICLE_SECTION_{ii}": 16 for ii in range(10)
                }

            }),
            Article({
                "id": "a05685021712b94519ea3dade83cf7323cd9419b362af7cb",
                "title": {
                    "EN": "Natural gas futures rose during the US session",
                    "AR": "العقود الآجلة للغاز الطبيعي ارتفعت خلال دورة الولايات المتحدة",
                },
                "short_brief": {
                    "AR": "حسب بورصة نيويورك التجارية, تمت تجارة العقود الآجلة للغاز الطبيعي في يوليو على USD2.34 لكل مليون وحدة حرارية بريطانية وقت كتابة الخبر, ارتفع بنسبة 3.22%. لقد تمت",
                    "EN": "According to the New York Mercantile Exchange, natural gas futures in July were trading at USD2.34 per million British thermal units at time of writing, up 3.22%. its done",
                },
                "cover_attached_msg": {
                    "EN": "",
                    "AR": ""
                },
                "parent_category": "1788ef9f6b6e66bf16f1513c",
                "category": "c748d040ace4a78cf751f93d",
                "sections": [
                    {
                    "title": {
                        "EN": "Natural gas futures rose during the US session",
                        "AR": "العقود الآجلة للغاز الطبيعي ارتفعت خلال دورة الولايات المتحدة",
                    },
                    "subtitle": {
                        "EN": "Article Subtitle",
                        "AR": "عنوان فرعي للمقال"
                    },
                    "bio": {
                        "AR": "حسب بورصة نيويورك التجارية, تمت تجارة العقود الآجلة للغاز الطبيعي في يوليو على USD2.34 لكل مليون وحدة حرارية بريطانية وقت كتابة الخبر, ارتفع بنسبة 3.22%. لقد تمت",
                        "EN": "According to the New York Mercantile Exchange, natural gas futures in July were trading at USD2.34 per million British thermal units at time of writing, up 3.22%. its done",
                    },
                    "id": str(secrets.token_hex(12)),
                    "attachement_msg": {
                        "EN": "This is an Image",
                        "AR": "This is an Image",
                    },
                    "attachment_type": "IMAGE",
                    "action_text": {},
                    "action_link": "",
                    "attached_ad_id": "a05685021712b94519ea3dade83cf7323cd9419b362af5cb",
                    "audio_stop": ii * 0.5,
                    } for ii in range(10)
                ],
                "ratings": [3, 2.5, 1.5, 5, 5, 1.5, 2, 0, 1, 5, 4, 3],
                "comments": [],
                "thread": "",
                "published_in": str(datetime.now()),
                "published_by": ["49ead2d979eaa7cfd90672aa"],
                "attached_ad": "a05685021712b94519ea3dade83cf7323cd9419b362af5cb",
                "saves": 124,
                "views": 200,
                "mode": 1,
                "tags": ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"],
                "record_available": True,
                "read_time": {
                    f"a05685021712b94519ea3dade83cf7323cd9419b362af7cb_ARTICLE_SECTION_{ii}": 16 for ii in range(10)
                }

            }),
        ]

    def get_article_by_id(self, article_id):
        return self.trending_articles[0]

    def get_all_articles(self, filter_by: str = None, arrangment: str = 'ascending'):
        return self.trending_articles

    def multiple_articles_by_ids(self, ids: list):
        return self.trending_articles[:len(ids)]
    
    def get_article_by_writer_id(self, writer_id):
        return self.trending_articles

    def get_drafts_by_writer_id(self, writer_id):
        return self.trending_articles

    def get_articles_by_category_and_parent_category(self, category, parent_category):
        return self.trending_articles

    def get_articles_by_category(self, category_id):
        return {
            "trending": self.get_all_articles(),
            "featured": self.get_all_articles(),
            "all_articles": self.get_all_articles(),
            "mostRecent": self.get_all_articles(),
        }
        
    def update_readtime(self, section_id, article_id, duration):
        return True

    def delete_article(self, article_id):
        try:
            for article in self.trending_articles:
                if article.id == article_id:
                    del self.trending_articles[self.trending_articles.index(article)]
                    return True
            return False
        except Exception as e:
            print(e)
            return False

    def create_article(self, payload, media, publisher):
        try:
            sections= []
            images= []
            audios=[]
            videos=[]
            for section in payload['sections']:
                sec_id= str(secrets.token_hex(24))

                section_media= media[section['id']]
                section_media.filename= f'{sec_id}.{section_media.filename.split(".")[-1]}'

                if section_media.filename.split('.')[-1] in self.consts.covers_supported_extenstions:
                    images.append(section_media)

                if section_media.filename.split('.')[-1] in self.consts.audios_supported_extenstions:
                    audios.append(section_media)

                if section_media.filename.split('.')[-1] in self.consts.videos_supported_extenstions:
                    videos.append(section_media)

                section['id']= sec_id
                section['audio_stop']= float(section['audio_stop'])
                section['attached_ad_id']= ""
                sections.append(ArticleSection(section))
            
            payload['sections']= [section.to_dict() for section in sections]
            payload['attached_ad']= ""
            payload['id']= str(secrets.token_hex(12))
            payload["published_in"]= str(datetime.now())
            payload["published_by"]= [publisher]
            payload["saves"]= 0
            payload["mode"]= 1
            article= Article(payload)

            # TODO: Save Article
            self.trending_articles.append(article)
            if article != None:
                for image in images:
                    image.save(abspath(join(dirname(__file__), '../assets/articles/images/', image.filename),))
                for audio in audios:
                    audio.save(abspath(join(dirname(__file__), '../assets/articles/audios/', audio.filename),))
                for video in videos:
                    video.save(abspath(join(dirname(__file__), '../assets/articles/videos/', video.filename),))
                
                return True

            return False
        except Exception as e:
            print(e)
            return False

    def update_article(self, article_id: str, payload: dict, files: list= None):

        try:
            if 'id' in payload.keys():
                del payload['id']
            for article in self.trending_articles:
                if article.id == article_id:
                    for k in payload.keys():
                        if k == 'sections':
                            self.trending_articles[self.trending_articles.index(article)].__setattr__('sections', [ArticleSection(section) for section in payload['sections']])
                        self.trending_articles[self.trending_articles.index(article)].__setattr__(k, payload[k])
                        
                    return True
            return False
        except Exception as e:
            print(e)
            return False


    def get_section_cover(self, section_id):
        for ext in self.consts.covers_supported_extenstions:
            file_path= abspath(join(dirname(__file__), '../assets/articles/images/', f'{section_id}.{ext}'),)
            if exists(file_path):
                return file_path
        return None

    def get_section_audio(self, section_id):
        for ext in self.consts.audios_supported_extenstions:
            file_path= abspath(join(dirname(__file__), '../assets/articles/audios/', f'{section_id}.{ext}'),)
            if exists(file_path):
                return file_path
        return None

    def get_section_video(self, section_id):
        for ext in self.consts.videos_supported_extenstions:
            file_path= abspath(join(dirname(__file__), '../assets/articles/videos/', f'{section_id}.{ext}'),)
            if exists(file_path):
                return file_path
        return None
