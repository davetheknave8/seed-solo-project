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
            console.log(response.rows);
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
            console.log(response.rows);
            res.send(response.rows);
        })
        .catch(error => {
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
            console.log(response.rows)
            res.send(response.rows[response.rows.length-1])
        })

})

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

router.post('/recent', (req, res) => {
    console.log(req.body);
    const recent = req.body;
    const sqlText = `INSERT INTO recent_tree(user_id, tree_id)
        VALUES($1, $2);`;
    const values = [recent.user_id, recent.tree_id];
    pool.query(sqlText, values)
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('error adding recent to database', error);
        })
})

module.exports = router;