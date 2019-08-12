const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware')

/**
 * GET route template
 */
router.get('/tree', rejectUnauthenticated, (req, res) => {
    const userId = req.user.id;
    sqlText = `SELECT * FROM tree
	    JOIN user_tree ON tree.id = user_tree.tree_id
	    JOIN "user" ON user_tree.user_id = "user".id
	    WHERE "user".id = $1;`
    pool.query(sqlText, [userId])
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(500);
        })
});

router.get('/lesson', rejectUnauthenticated, (req, res) => {
    const userId = req.user.id;
    sqlText = `SELECT "user".id as user_id, tree.subject as tree, subcategory."name" as subcategory, lesson.id as lesson_id, lesson."name" as lesson, lesson.completed FROM "user" 	
                    JOIN user_tree ON "user".id = user_tree.user_id
                    JOIN tree ON user_tree.tree_id = tree.id
                    JOIN tree_subcategory ON tree.id = tree_subcategory.tree_id
                    JOIN subcategory ON tree_subcategory.subcategory_id = subcategory.id
                    JOIN subcategory_lesson ON subcategory.id = subcategory_lesson.subcategory_id
                    JOIN lesson ON subcategory_lesson.lesson_id = lesson.id
                    WHERE "user".id = $1
                    GROUP BY "user".id, lesson."name", lesson.id, tree.subject, subcategory."name", lesson.completed
                    ORDER BY lesson.id;`
    pool.query(sqlText, [userId])
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(500);
        })
})

router.get('/status', rejectUnauthenticated, (req, res) => {
    const userId = req.user.id;
    const sqlText = `SELECT "user".id as user_id, lesson_status.tree_id, lesson_status.lesson_id FROM "user"
	                    JOIN lesson_status ON "user".id = lesson_status.user_id
                        WHERE "user".id = $1;`;
    pool.query(sqlText, [userId])
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            res.sendStatus(500);
            console.log('error getting lesson status', error);
        })
})

router.get('/recent', rejectUnauthenticated, (req, res) => {
    const userId = req.user.id;
    const sqlText = `SELECT tree_id, tree.subject FROM recent_tree
	JOIN tree ON recent_tree.tree_id = tree.id
    WHERE user_id = $1
    ORDER BY recent_tree.id ASC;`;
    pool.query(sqlText, [userId])
        .then(response => {
            res.send(response.rows[response.rows.length-1])
        })
        .catch(error => {
            console.log('error getting recent tree', error);
            res.sendStatus(500);
        })

})

router.get('/current', rejectUnauthenticated, (req, res) => {
    console.log(req.query.id);
    const treeId = req.query.id;
    const sqlText = `SELECT t.id as tree_id, t.subject,
	CASE WHEN count(s) = 0 THEN ARRAY[]::jsonb[]
	ELSE array_agg(s.sub_name) END as subcategory
	FROM tree t
	LEFT JOIN tree_subcategory ON t.id = tree_subcategory.tree_id
	LEFt JOIN(SELECT s1.id, jsonb_build_object('id', s1.id, 'name', s1.name, 'lessons', (CASE WHEN count(l) = 0 THEN ARRAY[]::record[]
	ELSE array_agg(l) END)) as sub_name
	FROM subcategory s1
	LEFT JOIN subcategory_lesson ON s1.id = subcategory_lesson.subcategory_id
	LEFT JOIN (SELECT l1.id, jsonb_build_object('id', l1.id, 'name', l1.name) as lesson_name  FROM lesson l1) as l ON subcategory_lesson.lesson_id = l.id
	GROUP BY s1.id
	ORDER BY s1.id)
	as s ON tree_subcategory.subcategory_id = s.id
	WHERE t.id = $1
	GROUP BY t.id
	ORDER BY t.id;
`;
    const values = [treeId];
    pool.query(sqlText, values)
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            res.sendStatus(500);
            console.log('error getting current tree', error);
        })
})

router.get('/current_lesson', (req, res) => {
    const lessonId = req.query.id;
    console.log(lessonId)
    const sqlText = `SELECT * FROM lesson WHERE id=$1;`;
    pool.query(sqlText, [lessonId])
        .then(response => {
            res.send(response.rows)
        })
        .catch(error => {
            res.sendStatus(500);
            console.log('error getting current lesson', error)
        })
})

router.get('/search', (req, res) => {
    const userQuery = `%${req.query.query}%`;
    const sqlText = `SELECT * FROM tree WHERE tree.subject LIKE $1`;
    pool.query(sqlText, [userQuery])
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            res.sendStatus(500);
            console.log('error getting search', error);
        })
})

router.get('/objective', (req, res) => {
    console.log('in objective', req.query.lesson_id);
    const lessonId = req.query.lesson_id;
    const sqlText = `SELECT lesson.id as lesson_id, lesson."name", objectives.id as objectives_id, objectives."name" FROM objectives
	                    JOIN lesson ON objectives.lesson_id=lesson.id
                        WHERE lesson.id=$1;`
    pool.query(sqlText, [lessonId])
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            res.sendStatus(500);
            console.log('error getting objectives', error);
        })

})

router.get('/objective/finished', (req, res) => {
    console.log(req.query);
    const userId = req.query.user_id;
    const lessonId = req.query.lesson_id;
    const sqlText = `SELECT "user".id as user_id, objectives.id as objective_id, objectives."name", objectives.lesson_id FROM "user"
                        JOIN objective_status ON "user".id=objective_status.user_id
                        JOIN objectives ON objective_status.objective_id=objectives.id
                        JOIN lesson on objectives.lesson_id = lesson.id
                        WHERE objectives.lesson_id = $1 AND user_id=$2;`;
    const values = [lessonId, userId];
    pool.query(sqlText, values)
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            res.sendStatus(500);
            console.log('error getting finished objectives', error);
        })
})
/**
 * POST route template
 */
router.post('/user_tree', (req, res) => {
    console.log(req.body);
    const userId = req.body.user_id;
    const treeId = req.body.tree_id;
    const sqlText = `INSERT INTO user_tree(user_id, tree_id)
                        VALUES($1, $2);`
    const values = [userId, treeId];
    pool.query(sqlText, values)
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            res.sendStatus(500);
            console.log('error posting new user_tree', error);
        })
});

router.post('/recent', (req, res) => {
    const recent = req.body;
    const sqlText = `INSERT INTO recent_tree(user_id, tree_id)
        VALUES($1, $2);`;
    const values = [recent.user_id, recent.tree_id];
    pool.query(sqlText, values)
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            res.sendStatus(500);
            console.log('error adding recent to database', error);
        })
})

router.post('/objective', (req, res) => {
    console.log(req.body);
    const lessonId = req.body.lesson_id;
    const userId = req.body.user_id;
    const objectiveId = req.body.objective_id;
    const sqlText = `INSERT INTO objective_status(objective_id, user_id, lesson_id)
                        VALUES($1, $2, $3);`;
    const values = [objectiveId, userId, lessonId];
    pool.query(sqlText, values)
        .then(response => {
            res.sendStatus(200)
        })
        .catch(error => {
            res.sendStatus(500);
        })
})

router.post('/complete_lesson', (req, res) => {
    console.log(req.body)
    const lessonId = req.body.lesson_id;
    const treeId = req.body.tree_id;
    const userId = req.user.id;
    const sqlText = `INSERT INTO lesson_status(lesson_id, user_id, tree_id)
                        VALUES($1, $2, $3);`;
    const values = [lessonId, userId, treeId];
    pool.query(sqlText, values)
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('error adding completed lesson', error);
            res.sendStatus(500);
        })
})

//Delete Routes

router.delete('/objective', (req, res) => {
    console.log('in delete objective', req.query);
    const userId = req.query.user_id;
    const objectiveId = req.query.objective_id;
    const sqlText = `DELETE FROM objective_status WHERE user_id = $1 AND objective_id = $2;`;
    const values = [userId, objectiveId];
    pool.query(sqlText, values)
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('error deleting objective status', error);
            res.sendStatus(500);
        })
})

module.exports = router;