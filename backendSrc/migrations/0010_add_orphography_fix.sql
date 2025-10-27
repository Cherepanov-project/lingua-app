-- Migration number: 0010 	 2025-10-27T14:14:04.049Z
-- Migration number: 0009 	 2025-10-27T13:42:41.275Z
CREATE TABLE orphography_table (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  word text NOT NULL,
  image text NOT NULL,
  description text NOT NULL
);
INSERT INTO orphography_table (id, word, image, description) VALUES
(0, 'island', 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXNsYW5kfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500', 'A piece of land surrounded by water'),
(1, 'knight', 'https://images.unsplash.com/photo-1699501993044-bbcddede77d0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fGtuaWdodHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500', 'A medieval soldier in armor'),
(2, 'autumn', 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXV0dW1ufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500', 'The season between summer and winter'),
(3, 'castle', 'https://images.unsplash.com/photo-1535448033526-c0e85c9e6968?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhc3RsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500', 'A large fortified building or palace'),
(4, 'muscle', 'https://images.unsplash.com/photo-1614396648745-d5de9c9e037e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fG11c2NsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500', 'Tissue in the body that produces movement'),
(5, 'bridge', 'https://images.unsplash.com/photo-1429041966141-44d228a42775?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJpZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500', 'A structure built to cross obstacles'),
(6, 'puzzle', 'https://plus.unsplash.com/premium_photo-1723662084148-2cd2357705ba?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHV6emxlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500', 'A game or problem to solve'),
(7, 'guitar', 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3VpdGFyfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500', 'A stringed musical instrument'),
(8, 'bottle', 'https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym90dGxlfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500', 'A container for liquids'),
(9, 'sandwich', 'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNhbmR3aWNofGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500', 'Food made with bread and filling'),
(10, 'toothbrush', 'https://images.unsplash.com/photo-1578689001884-55c21e109439?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRvb3RoYnJ1c2h8ZW58MHwwfDB8fHww&auto=format&fit=crop&q=60&w=500', 'A brush used for cleaning teeth');