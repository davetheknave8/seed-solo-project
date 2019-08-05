
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "admin" INT DEFAULT 1
);


CREATE TABLE "tree" (
	"id" SERIAL PRIMARY KEY,
	"subject" VARCHAR(100)
	);

CREATE TABLE "user_tree" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"tree_id" INT REFERENCES "tree"
	);
	
CREATE TABLE "subcategory" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(100),
	"completed" BOOLEAN
	);
	
CREATE TABLE "tree_subcategory"(
	"id" SERIAL PRIMARY KEY,
	"tree_id" INT REFERENCES "tree",
	"subcategory_id" INT REFERENCES "subcategory"
	);
	
CREATE TABLE "lesson"(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(100),
	"type" VARCHAR(100),
	"image" VARCHAR(400),
	"video" VARCHAR(500),
	"body" VARCHAR(10000),
	"questions" VARCHAR(5000),
	"completed" VARCHAR(20)
	);
	
CREATE TABLE "subcategory_lesson"(
	"id" SERIAL PRIMARY KEY,
	"subcategory_id" INT REFERENCES "subcategory",
	"lesson_id" INT REFERENCES "lesson"
	);
	
CREATE TABLE "requests"(
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"accepted" BOOLEAN,
	"tree_name" VARCHAR(100),
	"status" VARCHAR(100)
	);
	
UPDATE "user" SET admin=3 WHERE id=1;

INSERT INTO "lesson"("name", "type", "video", "body", "questions", "completed")
	VALUES('testTwo', 'standard', 'https://youtu.be/tb302rX3Bd8', 'Test Body Two', 'Test question Two', 'False');
	
INSERT INTO "lesson"("name", "type", "video", "body", "questions", "completed")
	VALUES('testThree', 'standard', 'https://youtu.be/iKU7B39ccfI', 'Test Body Three', 'Test question Three', 'False'),
	('testFour', 'standard', 'https://youtu.be/A2fhqVMSVog', 'Test Body Four', 'Test question Four', 'False'),
	('testFive', 'standard', 'https://youtu.be/J1zq2BNkkGY', 'Test Body Five', 'Test question Five', 'False'),
	('testSix', 'standard', 'https://youtu.be/LcneqZbvPRE', 'Test Body Six', 'Test question Six', 'False'),
	('testSeven', 'standard', 'https://youtu.be/4qsiVuDnh50', 'Test Body Seven', 'Test question Seven', 'False'),
	('testEight', 'standard', 'https://youtu.be/Z7Sn0fSfZF8', 'Test Body Eight', 'Test question Eight', 'False'),
	('testNine', 'standard', 'https://youtu.be/iW1dkyrRagw', 'Test Body Nine', 'Test question Nine', 'False'),
	('testTen', 'standard', 'https://youtu.be/4Jx_cMVAtK4', 'Test Body Ten', 'Test question Ten', 'False');
	
INSERT INTO subcategory_lesson (subcategory_id, lesson_id)
	VALUES(1, 2),
	(1, 3);
	
INSERT INTO subcategory ("name", "completed")
	VALUES('test category 2', 'False'),
	('test category 3', 'False');
	
INSERT INTO subcategory_lesson (subcategory_id, lesson_id)
	VALUES(2, 4),
	(2, 5),
	(2, 6),
	(3, 7),
	(3, 8),
	(3, 9),
	(3, 10);
	
INSERT INTO tree_subcategory(tree_id, subcategory_id)
	VALUES(1, 2),
	(1, 3);
