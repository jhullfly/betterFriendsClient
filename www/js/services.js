angular.module('services', [])

.service('invited', function() {
        this.contacts = null;
        this.setContacts = function(contacts) {
            this.contacts = contacts;
        }
        this.getContacts = function() {
            return this.contacts;
        }
});
