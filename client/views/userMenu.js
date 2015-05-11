Template.userMenu.helpers({
  notificationCount: function() {
    var cursor = Herald.getNotifications({medium: 'onsite'});
    var count = cursor ? cursor.count() : 0;
    return {count: count};
  }
});
