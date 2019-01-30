Create a React application using Redux, having two screens with proper navigation. You will be using API from the website http://swapi.co .Please go through the documentation of the swapi website and understand the API responses to choose the right set of APIs and call them with the proper arguments.

The application is supposed to have 2 screens:

Screen 1 (Login Screen)
Allow the user to login as a character from STAR WARS using the character name as the username and birth year as the password.

Example:
• Username: Luke Skywalker
• Password: 19BBY

Screen 2 (Search Screen)

Implement a type-along search which searches for planets and lists them in components that are sized relative to their population on every key press in the input field. (E.g. you can use a bigger font size for a planet with larger population, or even show a bigger container size for a planet with larger population or it’s your choice to differentiate). On clicking the item from the results of the type-along search, it should display the corresponding planet information (ex: Gravity, Population, Terrain, Orbital Period etc…).Also have the logout flow included.

Special Case:

Only the user Luke Skywalker should be able to make more than 15 searches in a minute.
