(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/items/items.component.html',
  bindings: {
    items: '<'
  }
});

})();
