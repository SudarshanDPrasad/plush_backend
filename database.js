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
    name, image, price1, price2, price3, discount, weight1, weight2, weight3, ingredients, howtouse, benefits, category, availability ,bestSeller
) {
    const insert = await
        pool.query(
            'INSERT INTO plush.items (name, image, price1, price2, price3, discountPrice, weight1,weight2,weight3, ingredients, howtouse, benefits, category, availability,bestSeller) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? ,?,?,?,?,?,?)',
            [name, image, price1, price2, price3, discount, weight1, weight2, weight3, ingredients, howtouse, benefits, category, availability,bestSeller]
        )
}

export async function getProducrs(category) {
    const query = await
        pool.query(`SELECT * FROM plush.items WHERE category like '${category}'`)
    return query[0];
}

export async function editProduct(id, name, image, price1, price2, price3, discount, weight1, weight2, weight3, ingredients, howtouse, benefits, category, availability, bestSeller
) {
    const query = await
        pool.query(`UPDATE plush.items SET name = '${name}', image = '${image}', price1 = '${price1}', price2 = '${price2}', price3 = '${price3}', discountPrice = '${discount}', weight1 = '${weight1}', weight2 = '${weight2}', weight3 = '${weight3}', ingredients = '${ingredients}', howtouse = '${howtouse}', benefits = '${benefits}', category = '${category}', availability = '${availability}' , bestSeller = '${bestSeller}' WHERE id = '${id}'`)
    return query[0];
}

export async function customerOrders(
    name,address,orders,phoneNumber,totalAmount
){
    const query = await
        pool.query(
            'INSERT INTO plush.orders(name,address,orders,phoneNumber,totalAmount) VALUES (?, ?, ?, ?, ?)',
            [name,address,orders,phoneNumber,totalAmount]
        )
}

export async function getOrders() {
    const query = await
        pool.query(`SELECT * FROM plush.orders`)
    return query[0];
}

export async function searchProduct(product) {
    const query = await
        pool.query(`SELECT * FROM plush.items WHERE name like '%${product}%'`)
    return query[0];
}

export async function uploafFeedBack(name,feedback,stars){
    const query = await
        pool.query(`INSERT INTO plush.feedback (name, feedback, stars) VALUES (?, ?, ?)`,[name,feedback,stars])
    return query[0];
}

export async function getFeedBack(){
    const query = await
        pool.query(`SELECT * FROM plush.feedback`)
    return query[0];
}