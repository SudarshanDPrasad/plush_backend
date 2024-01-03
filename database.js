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
    name, image, price1, price2, price3, discount, weight1, weight2, weight3, ingredients, howtouse, benefits, category, availability
) {
    const insert = await
        pool.query(
            'INSERT INTO plush.items (name, image, price1, price2, price3, discountPrice, weight1,weight2,weight3, ingredients, howtouse, benefits, category, availability) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? ,?)',
            [name, image, price1, price2, price3, discount, weight1, weight2, weight3, ingredients, howtouse, benefits, category, availability]
        )
}

export async function getProducrs(category) {
    const query = await
        pool.query(`SELECT * FROM plush.items WHERE category like '${category}'`)
    return query[0];
}