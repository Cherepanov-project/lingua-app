-- Migration number: 0012 	 2025-11-09T02:39:18.286Z
CREATE TABLE IF NOT EXISTS grammar_exercises (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    grammar_id INTEGER NOT NULL,
    level TEXT NOT NULL, 
    sentence TEXT NOT NULL,
    missing_words JSON NOT NULL
);

INSERT INTO grammar_exercises (grammar_id, level, sentence, missing_words) VALUES
(1, 'A1', 'I ____ to the store yesterday and ____ some apples.', '["went","bought"]'),
(1, 'A2', 'She ____ not like tea but ____ coffee.', '["does","drink"]'),
(1, 'B1', 'They ____ football every Sunday and ____ basketball on Fridays.', '["play","practice"]'),
(1, 'B2', 'He ____ his homework before dinner and ____ a book afterward.', '["finishes","reads"]'),
(1, 'C1', 'We ____ new vocabulary words daily and ____ them in sentences.', '["learn","use"]'),

(2, 'A1', 'I ____ a book yesterday and ____ it to my friend.', '["read","gave"]'),
(2, 'A2', 'She ____ to Paris last summer and ____ many photos.', '["went","took"]'),
(2, 'B1', 'They ____ a movie last night and ____ pizza for dinner.', '["watched","ate"]'),
(2, 'B2', 'He ____ very happy after the exam and ____ a celebration.', '["was","had"]'),
(2, 'C1', 'We ____ an interesting article and ____ notes for class discussion.', '["found","took"]'),

(3, 'A1', 'I ____ call you tomorrow and ____ a message.', '["will","send"]'),
(3, 'A2', 'She ____ visit her grandmother and ____ a gift.', '["will","bring"]'),
(3, 'B1', 'They ____ travel to Italy and ____ photos of the trip.', '["will","take"]'),
(3, 'B2', 'He ____ finish the project and ____ a report.', '["will","write"]'),
(3, 'C1', 'We ____ discuss the plan and ____ the minutes to the team.', '["will","send"]'),

(4, 'A1', 'I ____ watching TV and ____ my homework.', '["am","doing"]'),
(4, 'A2', 'She ____ reading a book and ____ tea.', '["is","drinking"]'),
(4, 'B1', 'They ____ playing football and ____ on the swings.', '["are","resting"]'),
(4, 'B2', 'He ____ preparing a presentation and ____ notes.', '["is","taking"]'),
(4, 'C1', 'We ____ studying English and ____ new vocabulary.', '["are","learning"]'),

(5, 'A1', 'I ____ watching TV when you ____.', '["was","called"]'),
(5, 'A2', 'She ____ reading when the phone ____.', '["was","rang"]'),
(5, 'B1', 'They ____ playing football while it ____ raining.', '["were","was"]'),
(5, 'B2', 'He ____ preparing dinner when I ____.', '["was","arrived"]'),
(5, 'C1', 'We ____ discussing the plan when the manager ____.', '["were","entered"]'),

(6, 'A1', 'I ____ be at home and ____ a book at 6 pm.', '["will","read"]'),
(6, 'A2', 'She ____ be studying and ____ notes next Monday.', '["will","taking"]'),
(6, 'B1', 'They ____ be traveling and ____ photos for the album.', '["will","taking"]'),
(6, 'B2', 'He ____ be working and ____ emails all day tomorrow.', '["will","sending"]'),
(6, 'C1', 'We ____ be discussing and ____ the new proposal during the meeting.', '["will","reviewing"]'),

(7, 'A1', 'I ____ visited London and ____ a postcard.', '["have","sent"]'),
(7, 'A2', 'She ____ finished her homework and ____ a break.', '["has","taken"]'),
(7, 'B1', 'They ____ watched that movie and ____ the sequel.', '["have","seen"]'),
(7, 'B2', 'He ____ read several books and ____ reviews.', '["has","written"]'),
(7, 'C1', 'We ____ completed the project and ____ the results to the client.', '["have","sent"]'),

(8, 'A1', 'I ____ eaten before you ____.', '["had","arrived"]'),
(8, 'A2', 'She ____ finished the report before the meeting ____.', '["had","started"]'),
(8, 'B1', 'They ____ left the office when I ____.', '["had","arrived"]'),
(8, 'B2', 'He ____ studied English before he ____ to London.', '["had","moved"]'),
(8, 'C1', 'We ____ completed the analysis before the meeting ____.', '["had","started"]'),

(9, 'A1', 'I ____ finish the work and ____ a rest by 6 pm.', '["will","take"]'),
(9, 'A2', 'She ____ have left and ____ a taxi by the time we arrive.', '["will","take"]'),
(9, 'B1', 'They ____ have completed the project and ____ the presentation by Friday.', '["will","send"]'),
(9, 'B2', 'He ____ have written the report and ____ a summary before the meeting.', '["will","prepare"]'),
(9, 'C1', 'We ____ have prepared everything and ____ it to the manager by the deadline.', '["will","send"]'),

(10, 'A1', 'I ____ been learning English and ____ basic phrases.', '["have","studied"]'),
(10, 'A2', 'She ____ been working and ____ a report.', '["has","written"]'),
(10, 'B1', 'They ____ been studying and ____ exercises for two hours.', '["have","done"]'),
(10, 'B2', 'He ____ been reading and ____ notes for a week.', '["has","taken"]'),
(10, 'C1', 'We ____ been preparing and ____ presentations for several months.', '["have","made"]'),

(11, 'A1', 'I ____ been waiting and ____ the time.', '["had","watched"]'),
(11, 'A2', 'She ____ been working and ____ the morning.', '["had","spent"]'),
(11, 'B1', 'They ____ been playing football and ____ two hours.', '["had","played"]'),
(11, 'B2', 'He ____ been studying and ____ all day yesterday.', '["had","worked"]'),
(11, 'C1', 'We ____ been discussing and ____ the project for several weeks.', '["had","planned"]'),

(12, 'A1', 'I ____ be studying and ____ my notes by 6 pm tomorrow.', '["will","review"]'),
(12, 'A2', 'She ____ be working and ____ reports next Monday.', '["will","prepare"]'),
(12, 'B1', 'They ____ be traveling and ____ pictures for the holidays.', '["will","take"]'),
(12, 'B2', 'He ____ be preparing and ____ exercises all day tomorrow.', '["will","do"]'),
(12, 'C1', 'We ____ be discussing and ____ the proposal during the meeting.', '["will","review"]');
