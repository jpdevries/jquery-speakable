(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery#speakable', {
    // This will run before each test in this module.
    setup: function() {
      this.speakables = $('.speakable');
    }
  });
  
  test('is welcoming', function() {
    expect(1);
    
    strictEqual(this.speakables.first().text(), 'Hello World', 'Should be welcoming');
  });
  
  module('jQuery.speakable');
}(jQuery));
