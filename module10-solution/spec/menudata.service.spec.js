describe('menudataservice', function () {

  var $controller;
  var signUpController;
  var menudataservice;
  var $httpBackend;
  var returnA1Object = {
    "A": {
      "category": {
        "id": 82,
        "name": "Soup",
        "short_name": "A",
        "special_instructions": ""
      },
      "menu_items": [
        {
          "description": "chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",
          "large_portion_name": "quart",
          "name": "Won Ton Soup with Chicken",
          "price_large": 5,
          "price_small": 2.55,
          "short_name": "A1",
          "small_portion_name": "pint"
        }
      ]
    }
  };

  var expectReturnA1Object = {
    "description": "chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",
    "large_portion_name": "quart",
    "name": "Won Ton Soup with Chicken",
    "price_large": 5,
    "price_small": 2.55,
    "short_name": "A1",
    "small_portion_name": "pint",
    "categoryShortName": "A"
};

  beforeEach(function () {
    module('public');

    inject(function ($injector) {
      // $controller = $injector.get('$controller');
      menudataservice = $injector.get('MenuDataService');
      $httpBackend = $injector.get('$httpBackend');
    });
  });

  it('should return current menu item', function() {
    $httpBackend.whenGET("https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json").respond(returnA1Object);
    menudataservice.getMenuItem("A1").then(function(response) {
      expect(response.data).toEqual(expectReturnA1Object);
    });
    $httpBackend.flush();
  });

});
