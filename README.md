# todoist-tests

WHAT IS IT?
-----------

todoist-tests project is an automation framework for testing acceptance TC of Todoist web page
using Axios, Mocha and WebdriverIO technologies.

FEATURES TESTED
---------------

The following main features are implemented in this framework.

Acceptance tests.

    -Login
    -Projects
    -Tasks

REQUIREMENTS AND SET CONFIGURATIONS
-----------------------------------

The required configuration for this framework is the following:

    -WebStorm IDE.
    -Download npm 8.x or later: https://nodejs.org/en/download/
    -Clone/download the project from GitHub repository: https://github.com/AT-06/todoist-tests.git

Once those requirements are done, follow these steps:

    -Open the project downloaded with the WebStorm IDE.
    -Open the properties.json file.

Set the required parameters:

    {
      "acc1_email": "demoEmail1",
      "acc1_password": "demoPassword1",
      "acc2_email": "demoEmail2",
      "acc2_password": "demoPassword2",
      "api_URL": "https://beta.todoist.com/API/v8",
      "api_Token1": "Bearer demoToken1",
      "api_Token2": "Bearer demoToken2",



      "sauceUserName": "sauceLabsUser",
      "sauceKEY": "sauceLabsToken",

      "browserName": "sauceLabsBrowser",
      "platform": "OSName",
      "version": "browserVersion"
    }


After executing those steps the frame should be executed.

To execute by command line you can use the following:

        CLI:

        npm install
        npm run test //(dockerChrome, dockerFirefox, sauceLabs)

        ```
CONTACTS
--------

    If you want to be informed about new code releases, bug fixes, security fixes, general news and information about
    todoist-tests project check to the GitHub repository https://github.com/AT-06/todoist-tests

CONTRIBUTORS
------------

Current contributors:

    -Daniel Caballero Rimassa (danielditer) - [a link](https://github.com/danielditer)
    -Ariel Gonzales Vargas  (pipo411) - [a link](https://github.com/pipo411)
    -Carlos Gonzales (carledriss) - [a link](https://github.com/carledriss)
    -Christian Galarza Crespo (Chritian92) - [a link](https://github.com/Chritian92)
    -Escarleth Ledezma Quiroga (EscarlethFatima) - [a link](https://github.com/EscarlethFatima)
    -Jimmy Romero Sejas (JimmyRomero) - [a link](https://github.com/JimmyRomero)
    -Manuel Valdez Valda (manu863018) - [a link](https://github.com/manu863018)
    -Omar Limbert Huanca Sanchez (omar-limbert) - [a link](https://github.com/omar-limbert)
    -Maria Canqui Macias (mery) - [a link](https://github.com/PanDeBatalla94)
