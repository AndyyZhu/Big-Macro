from bs4 import BeautifulSoup
import csv

with open("harveys_nutrition.html", 'r', encoding='utf-8') as html_file:
    html_content = html_file.read()

# Parse the HTML content
soup = BeautifulSoup(html_content, 'html.parser')

# Create a CSV file and write header
with open('harveys_scraped.csv', 'w', newline='', encoding='utf-8') as csv_file:
    csv_writer = csv.writer(csv_file)
    csv_writer.writerow(['Menu Item', 'Serving Size', 'Calories', 'Cholesterol', 'Fat', 'Trans Fat', 'Saturated Fat',
                         'Sodium', 'Carbohydrates', 'Fiber', 'Sugars', 'Protein', 'Calcium', 'Potassium', 'Iron'])

    # Find all menu items
    menu_items = soup.find_all('div', class_='nutrition-product-content')

    # Extract and write nutritional facts for each menu item
    for item in menu_items:
        menu_item_name = item.find_previous('div', class_='nutrition-product-heading').text.strip()

        nutrition_info = item.find_all('li')
        nutrient_data = {info.span.previous_sibling.strip(): info.span.text.strip().rstrip('</span>') for info in nutrition_info}
        
        # Write the data to the CSV file
        csv_writer.writerow([menu_item_name] + [nutrient_data.get(nutrient, '') for nutrient in
                                                ['Serving Size', 'Calories', 'Cholesterol', 'Fat', 'Trans Fat',
                                                 'Saturated Fat', 'Sodium', 'Carbohydrates', 'Fiber', 'Sugars',
                                                 'Protein', 'Calcium', 'Potassium', 'Iron']])
