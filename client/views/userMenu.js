Template.userMenu.helpers({
  notificationCount: function() {
    var cursor = Herald.getNotifications({medium: 'matchMessage'});
    var count = cursor && cursor.count ? cursor.count() : 0;
    return {count: count};
  }
});
