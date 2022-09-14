// === R A D ===
// This is not part of the HOW, but it needs to prepare the orgs :-)
// === R A D ===

List<Account> accounts = [SELECT Id, (SELECT ID FROM Contacts) FROM Account];
List<Event> events = new List<Event>();
delete [SELECT Id FROM Event];
for (Account account : accounts) {
  // 5 months
  DateTime dttm = datetime.now()
    .addDays(-Integer.valueOf((30 * 5) * Math.random()));
  Event ev = new Event();
  if (account.Contacts.size() > 0) {
    ev.WhoId = account.Contacts[0].Id;
  }
  ev.WhatId = account.Id;
  ev.Subject = 'TEST';
  ev.ActivityDate = dttm.date();
  ev.StartDateTime = dttm;
  ev.EndDateTime = dttm;
  ev.ActivityDateTime = dttm;
  ev.EventSubtype = 'Event';
  ev.ShowAs = 'Busy';
  events.add(ev);
}
insert events;
