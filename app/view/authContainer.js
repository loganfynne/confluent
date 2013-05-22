/*
 * File: app/view/authContainer.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.2.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Booking.view.authContainer', {
    extend: 'Ext.Container',

    config: {
        html: '<iframe id="authFrame" src="authiframe.html" width="100%" height="100%" frameborder="0"></iframe>',
        itemId: 'authContainer',
        listeners: [
            {
                fn: 'onContainerPainted',
                event: 'painted'
            }
        ]
    },

    onContainerPainted: function(element, eOpts) {
        var frame = window.frames[0];

        try {
            frame.document.getElementById('tokenValue').addEventListener("dataLoadedCustom", this.hasLoaded);
        } catch(e) {
            this.hasLoaded();
        }
    },

    hasLoaded: function() {
        var authContainer = Ext.ComponentQuery.query('#authContainer')[0],
            frame = window.frames[0],
            tokenData,
            keys;

        try {
            tokenData = frame.document.getElementById('tokenValue').innerHTML;
            keys = Object.keys(tokenData);
        } catch(e) {
            Booking.app.authToken = tokenData;
            authContainer.generateItems();
        }
    },

    generateItems: function() {
        var myContainer = Ext.create('Booking.view.MyContainer1'),
            token = Booking.app.authToken,
            clientId = '464168127252.apps.googleusercontent.com',
            apiKey = 'AIzaSyAy7JAsd5JlzjTR_fkkarby9N1c3YkhY6o',
            scopes = 'https://www.googleapis.com/auth/calendar',
            addContainer = "",
            items = [],
            calendarId;

        var encoded = Ext.encode(myContainer.items[0]);
        console.log(encoded);

        gapi.client.setApiKey(apiKey);
        gapi.auth.setToken(token);

        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, function(authResult) {
        if (authResult) {
            gapi.client.load('calendar', 'v3', function() {
                var request = gapi.client.calendar.calendarList.list();
                request.execute(function(outer) {
                    for (var i = 0; i < outer.items.length; i++) {
                        calendarId = outer.items[i].id;
                        items.push(addContainer);
                        console.log(calendarId);
                    }
                    mainCarousel.setItems(items);
                    Ext.ComponentQuery.query('#authContainer')[0].destroy();
                    Ext.Viewport.setActiveItem('mainCarousel');
                });
            });
        }
    });
    }

});