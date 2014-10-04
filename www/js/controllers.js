angular.module('controllers', [])

.controller('InviteCtrl', function($scope, $cordovaContacts, $timeout, $state, $ionicPlatform, invited) {
        $scope.status_contacts = "Loading Contacts...";
        $scope.contacts = null;
        $scope.invitedContacts = [];
        $scope.data = {};
        $scope.flattenAndFilterContacts = function(contacts) {
            var filteredContacts = _.filter(contacts, function(contact){return contact.phoneNumbers && contact.phoneNumbers.length >0});
            var newContacts = [];
            _.each(filteredContacts, function(contact) {
                var filteredNumbers = _.filter(contact.phoneNumbers, function(num) {return num.value});
                if (filteredNumbers.length == 1) {
                    contact.phoneNumber = filteredNumbers[0];
                    newContacts.push(contact);
                } else {
                    _.each(filteredNumbers, function (num) {
                        var newContact = _.clone(contact);
                        num.displayType = num.type;
                        newContact.phoneNumber = num;
                        newContacts.push(newContact);
                    });
                }
            });
            return newContacts;
        }
        $scope.loadContacts = function() {
            $scope.status_contacts = 'Starting load';
            var options = {
                filter: '',
                multiple: true,
                desiredFields: [],
                fields: ['*']
            }
            $cordovaContacts.find(options).then(function(contacts){
                $scope.contacts = $scope.flattenAndFilterContacts(contacts);
                $scope.status_contacts = null;
            },function(err){
                $scope.status_contacts = ('Error: ' + JSON.stringify(err));
            });
        }
        $ionicPlatform.ready(function() { $scope.loadContacts();});
        $scope.addInvite = function(contact) {
            $scope.invitedContacts.push(contact);
            $scope.data.searchString = '';
            if ($scope.invitedContacts.length ==2) {
                invited.setContacts($scope.invitedContacts);
                $state.go('compose');
            }
        }
        $scope.removeInvite = function(contact) {
            $scope.data.searchString = '';
            $scope.invitedContacts = _.without($scope.invitedContacts, contact);
        }
})

.controller('ComposeCtrl', function($scope, $state, $cordovaSms, invited) {
    $scope.sendSms = function(index) {
        $scope.sending_status = 'Sending message to '+$scope.invitedContacts[index].name.formatted;

        var messageInfo = {
            phoneNumber: $scope.invitedContacts[index].phoneNumber.value,
            textMessage: $scope.message1
        };

        $cordovaSms.send(messageInfo).then(function(message) {
            if (index == 0) {
                $scope.sendSms(index+1);
            } else {
                $scope.sending_status = 'Sent messages to '+$scope.invitedContacts[0].name.formatted +
                    ' and ' + $scope.invitedContacts[1].name.formatted;
            }
        }, function(error) {
            $scope.sending_status = "error: " + JSON.stringify(error);
        });
    }
    if (!invited.getContacts() || invited.getContacts().length < 2) {
        $state.go('invite');
    }
    $scope.invitedContacts = invited.getContacts();
    $scope.message1 = 'Hey wanna grab drinks with me at the Lone Palm. Monday? 8pm? Reply here: http://blaa';
    $scope.message2 = $scope.message1;
    $scope.sending_status = null;
})
