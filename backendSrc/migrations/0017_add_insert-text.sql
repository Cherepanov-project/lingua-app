-- Migration number: 0017 	 2025-12-01T10:19:19.825Z
CREATE TABLE insert_text(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    level TEXT NOT NULL,
    sentence TEXT NOT NULL,
    missing_words JSON NOT NULL
);

INSERT INTO insert_text (level, sentence, missing_words) VALUES

('A1',
'Yesterday I ____ to the supermarket because I needed to buy some food for the week. It was a warm and sunny day, so I ____ there slowly, enjoying the weather. When I arrived, I ____ a long list of things to get, including milk, bread, apples, and pasta. After I picked everything I needed, I ____ at the checkout counter, paid for my groceries, and walked home feeling happy and relaxed.',
'["went","walked","had","stopped"]'),

('A2',
'Every Saturday morning, Emma ____ up early because she likes to finish all her house chores before noon. After she ____ breakfast, she usually cleans the kitchen, waters the plants, and organizes her desk. Around noon, she ____ her favorite café where she spends some time reading or working on her laptop. Later in the afternoon, she ____ a walk in the park and ____ quality time with her friends or family.',
'["gets","eats","visits","takes","spends"]'),

('B1',
'Last summer our family decided to take a long road trip across the country. We ____ traveling for almost two weeks and visited many beautiful places. On the third day, we ____ a small mountain village where people lived a very peaceful life. We talked to some of the locals and even ____ traditional homemade food. Later, as we continued our journey, we ____ beautiful forests and lakes that looked like they were from a postcard. It was one of the best vacations we ____ together.',
'["were","found","tried","saw","had"]'),

('B2',
'Before the annual meeting started, the management team ____ several important tasks to ensure everything went smoothly. First, they ____ a short briefing to review the agenda and discuss potential issues. Then they ____ that some presentation slides needed final adjustments, so a few team members quickly revised them. Meanwhile, the technical staff ____ the audio and video equipment to avoid any interruptions. Once the guests ____ to arrive, the organizers ____ their positions and welcomed everyone professionally.',
'["completed","held","noticed","tested","began","took"]'),

('C1',
'Although the research project ____ multiple challenges in its early phases, the team managed to maintain steady progress. At first, they ____ that some initial assumptions were inaccurate, which forced them to redesign several parts of their methodology. During data collection, they carefully ____ all results to ensure accuracy and reliability. After weeks of analysis, they ____ a comprehensive report that explained their findings in detail. Finally, when the committee ____ their presentation, they ____ constructive feedback that helped refine the final version of the study.',
'["faced","realized","verified","prepared","reviewed","received"]');