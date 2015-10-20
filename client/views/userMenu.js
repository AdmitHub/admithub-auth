Template.userMenu.helpers({
  notificationCount: function() {
    var cursor = Herald.collection.find({"media.matchMessage.send": true});
    var count = cursor && cursor.count ? cursor.count() : 0;
    return {count: count};
  }
});
