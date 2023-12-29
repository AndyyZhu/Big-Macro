-- Create a table for restaurant types
CREATE TABLE RestaurantTypes (
    restaurant_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create a table for food items
CREATE TABLE MenuItems (
    item_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    restaurant_id INT REFERENCES RestaurantTypes(restaurant_id)
);

-- Create a table for nutritional information
CREATE TABLE NutritionalInfo (
    info_id SERIAL PRIMARY KEY,
    item_id INT REFERENCES MenuItems(item_id),
    calories INT,
    fat_grams FLOAT,
    sodium_grams INT,
    carbohydrates_grams INT,
    fibre_grams INT,
    sugar_grams INT,
    protein_grams FLOAT
);
