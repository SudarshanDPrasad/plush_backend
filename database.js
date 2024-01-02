import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config

const pool = mysql.createPool({
    host: 'mysql-21567144-userlogin.a.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_K6tzO3fGJFSSz0iKJsw',
    database: 'defaultdb',
    port: 13073,
}).promise()


// Items
export async function uploadItems(
    name, image, price, discount, weight, ingredients, howtouse, benefits, category,availability
) {
    const insert = await
        pool.query(
            'INSERT INTO plush.items (name, image, price, discountPrice, weight, ingredients, howtouse, benefits, category, availability) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? ,?)',
            [name, image, price, discount, weight, ingredients, howtouse, benefits, category,availability]
        )
}
